import ChatInput from '@components/ChatInput'
import Message from '@components/Message'
import { Divider, ScrollArea, Stack, Text, createStyles } from '@mantine/core'
import { useScrollIntoView } from '@mantine/hooks'
import { IChat, IMessage, IMessageToReplyClient } from '@types'
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'

const messageObserver = {
	subs: [] as Array<(message: IMessage) => void>,
	subscribe: function(sub: (message: IMessage) => void) {
		this.subs.push(sub)

		return () => {
			this.subs = this.subs.filter(item => item !== sub)
		}
	},
	addMessage: function(message: IMessage) {
		this.subs.forEach(sub => sub(message))
	},
}

const useStyles = createStyles(theme => ({
	wrapper: {
		height: `calc(100vh - 60px - 2rem)`,
		background: theme.colors.gray[0],
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
	},
	scrollArea: {
		flexGrow: 1,
		'> div > div': {
			height: '100%',
		},
	},
}))

export default function Chat() {
	const { chatId } = useParams<{ chatId: string }>()
	const { messages: loaderMessages } = useLoaderData() as {
		chat: IChat
		messages: IMessage[]
	}
	const [messages, setMessages] = useState<IMessage[]>(loaderMessages)
	const { classes } = useStyles()
	const [messageToReply, setMessageToReply] =
		useState<IMessageToReplyClient | null>(null)

	const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
		duration: 0,
	})

	const messagesByDate = useMemo(() => {
		const messagesByDate = new Map<string, IMessage[]>()
		messages
			.sort(
				(a, b) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			)
			.forEach(message => {
				const date = new Date(message.createdAt).toLocaleDateString(
					undefined,
					{
						month: 'long',
						day: 'numeric',
					}
				)
				const isToday =
					date ===
					new Date().toLocaleDateString(undefined, {
						month: 'long',
						day: 'numeric',
					})
				const messages = messagesByDate.get(isToday ? 'Today' : date) || []
				messagesByDate.set(isToday ? 'Today' : date, [...messages, message])
			})
		return messagesByDate
	}, [messages])

	const addMessage = useCallback(
		(message: IMessage) => messageObserver.addMessage(message),
		[]
	)

	useEffect(() => {
		scrollIntoView({
			alignment: 'end',
		})
	}, [scrollIntoView, chatId, loaderMessages, messagesByDate])

	useEffect(() => {
		setMessages(loaderMessages)
	}, [loaderMessages])

	useEffect(() => {
		const bc = new BroadcastChannel(chatId as string)
		const unsub = messageObserver.subscribe(data => {
			bc.postMessage(data)
		})

		bc.onmessage = (event: MessageEvent<IMessage>) => {
			setMessages(prev => [...prev, event.data])
		}

		return () => {
			bc.close()
			unsub()
		}
	}, [chatId])

	return (
		<div className={classes.wrapper}>
			<ScrollArea
				className={classes.scrollArea}
				viewportRef={scrollableRef}
				styles={() => ({
					scrollbar: {
						zIndex: 2,
					},
				})}
			>
				<Stack justify="flex-end" h="100%" align="start">
					{[...messagesByDate].map(([date, messages], i) => {
						return (
							<Fragment key={i}>
								<Divider
									label={date}
									labelPosition="center"
									sx={theme => ({
										position: 'sticky',
										top: 0,
										color: theme.colors.gray[5],
										backgroundColor: theme.colors.gray[0],
										zIndex: 1,
										width: '100%',
									})}
								/>
								{messages.map(message => (
									<Message
										key={message.id}
										message={message}
										onReply={() => {
											setMessageToReply({
												id: message.id,
												text: message.text,
												user: { username: message.user.username },
												media: message.media,
											})
										}}
									/>
								))}
							</Fragment>
						)
					})}

					{messages.length === 0 ? <Text>No messages</Text> : null}
					{/* @ts-expect-error ref */}
					<div ref={targetRef}></div>
				</Stack>
			</ScrollArea>
			<ChatInput
				messageToReply={messageToReply}
				onClearMessageToReply={() => setMessageToReply(null)}
				addMessageCallback={addMessage}
			/>
		</div>
	)
}
