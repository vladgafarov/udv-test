import { ScrollArea, Stack, Text, createStyles } from '@mantine/core'
import { useScrollIntoView } from '@mantine/hooks'
import { useEffect } from 'react'
import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	useLoaderData,
	useParams,
} from 'react-router-dom'
import ChatInput from '../components/ChatInput'
import Message from '../components/Message'
import { getChatById } from '../api/chatsDB'
import { IChat, IMessage } from '../types'
import { createMessage, getMessagesFromChat } from '../api/messagesDB'

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

	const messages = await getMessagesFromChat(chat.id)

	return { chat, messages }
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = Object.fromEntries(await request.formData()) as {
		message: string
		chatId: string
		userId: string
		username: string
	}

	if (
		!formData.message ||
		!formData.chatId ||
		!formData.userId ||
		!formData.username
	)
		throw new Error('cannot create message')

	await createMessage({
		text: formData.message,
		chatId: formData.chatId,
		userId: formData.userId,
		username: formData.username,
	})

	return { ok: true }
}

export default function Chat() {
	const { chatId } = useParams<{ chatId: string }>()
	const { chat, messages } = useLoaderData() as {
		chat: IChat
		messages: IMessage[]
	}
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
					{messages.map(message => (
						<Message key={message.id} message={message} />
					))}

					{messages.length === 0 ? <Text>No messages</Text> : null}
					{/* @ts-expect-error ref */}
					<div ref={targetRef}></div>
				</Stack>
			</ScrollArea>
			<ChatInput />
		</div>
	)
}
