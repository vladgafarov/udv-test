import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router-dom'
import { getChatById } from './chatsDB'
import { createMessage, getMessagesFromChat } from './messagesDB'

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
