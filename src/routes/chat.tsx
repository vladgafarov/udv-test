import { ScrollArea, Stack, createStyles } from '@mantine/core'
import { useScrollIntoView } from '@mantine/hooks'
import { useEffect } from 'react'
import { LoaderFunctionArgs, useLoaderData, useParams } from 'react-router-dom'
import ChatInput from '../components/ChatInput'
import Message from '../components/Message'
import { getChatById } from '../api/chatsDB'
import { IChat } from '../types'

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

export async function loader({ params }: LoaderFunctionArgs) {
	const { chatId } = params

	if (!chatId) throw new Error('no chat id')

	const chat = await getChatById(chatId)
	if (!chat) {
		throw new Response('', {
			status: 404,
			statusText: 'Chat not found',
		})
	}

	return { chat }
}

export default function Chat() {
	const { chatId } = useParams<{ chatId: string }>()
	const { chat } = useLoaderData() as { chat: IChat }
	const { classes } = useStyles()

	const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
		duration: 0,
	})

	// const messagesByDate = useMemo(() => {
	// 	const messagesByDate = new Map<string, Message[]>()
	// 	messages.forEach((message) => {
	// 		const date = new Date(message.createdAt).toLocaleDateString(
	// 			undefined,
	// 			{
	// 				month: "long",
	// 				day: "numeric",
	// 			},
	// 		)
	// 		const messages = messagesByDate.get(date) || []
	// 		messagesByDate.set(date, [...messages, message])
	// 	})
	// 	return messagesByDate
	// }, [messages])

	useEffect(() => {
		scrollIntoView({
			alignment: 'end',
		})
	}, [scrollIntoView, chatId])

	return (
		<div className={classes.wrapper}>
			<ScrollArea className={classes.scrollArea} viewportRef={scrollableRef}>
				<Stack>
					{Array.from({ length: 20 }).map((_, i) => (
						<Message key={i} text={chatId} />
					))}

					{/* @ts-expect-error ref */}
					<div ref={targetRef}></div>
				</Stack>
			</ScrollArea>
			<ChatInput />
		</div>
	)
}
