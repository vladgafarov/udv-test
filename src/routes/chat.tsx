import { Divider, ScrollArea, Stack, Text, createStyles } from '@mantine/core'
import { useScrollIntoView } from '@mantine/hooks'
import { Fragment, useEffect, useMemo } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import ChatInput from '../components/ChatInput'
import Message from '../components/Message'
import { IChat, IMessage } from '../types'

const useStyles = createStyles(theme => ({
	wrapper: {
		height: `calc(100vh - 60px - 2rem)`,
		background: theme.colors.gray[0],
		overflow: 'hidden',
		position: 'relative',
	},
	scrollArea: {
		height: `calc(100% - 60px)`,
	},
}))

export default function Chat() {
	const { chatId } = useParams<{ chatId: string }>()
	const { messages } = useLoaderData() as {
		chat: IChat
		messages: IMessage[]
	}
	const { classes } = useStyles()

	const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
		duration: 0,
	})

	const messagesByDate = useMemo(() => {
		const messagesByDate = new Map<string, IMessage[]>()
		messages.forEach(message => {
			const date = new Date(message.createdAt).toLocaleDateString(
				undefined,
				{
					month: 'long',
					day: 'numeric',
				}
			)
			const messages = messagesByDate.get(date) || []
			messagesByDate.set(date, [...messages, message])
		})
		return messagesByDate
	}, [messages])

	useEffect(() => {
		scrollIntoView({
			alignment: 'end',
		})
	}, [scrollIntoView, chatId])

	return (
		<div className={classes.wrapper}>
			<ScrollArea className={classes.scrollArea} viewportRef={scrollableRef}>
				<Stack>
					{[...messagesByDate].map(([date, messages], i) => {
						return (
							<Fragment key={i}>
								<Divider
									label={date}
									labelPosition="center"
									sx={() => ({ position: 'sticky' })}
								/>
								{messages.map(message => (
									<Message key={message.id} message={message} />
								))}
							</Fragment>
						)
					})}

					{messages.length === 0 ? <Text>No messages</Text> : null}
					{/* @ts-expect-error ref */}
					<div ref={targetRef}></div>
				</Stack>
			</ScrollArea>
			<ChatInput />
		</div>
	)
}
