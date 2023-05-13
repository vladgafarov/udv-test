import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	redirect,
} from 'react-router-dom'
import { deleteChat, getChatById } from './chatsDB'
import { createMessage, deleteMessage, getMessagesFromChat } from './messagesDB'
import { ICreateMessageDto } from '@types'

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
	const formData = Object.fromEntries(
		await request.formData()
	) as unknown as ICreateMessageDto

	if (
		(!formData.text && !formData.media) ||
		!formData.chatId ||
		!formData.userId ||
		!formData.username
	)
		throw new Error('cannot create message')

	const newMessage = await createMessage({
		text: formData.text,
		chatId: formData.chatId,
		userId: formData.userId,
		username: formData.username,
		media: formData.media ?? undefined,
		replyToMessageId: formData.replyToMessageId,
	})

	return { message: newMessage }
}

export async function deleteMessageAction({ request }: ActionFunctionArgs) {
	const formData = Object.fromEntries(await request.formData()) as {
		messageId: string
	}
	if (!formData.messageId) throw new Error('no message id')

	await deleteMessage(formData.messageId)

	return { ok: true }
}

export async function deleteChatAction({ params }: ActionFunctionArgs) {
	if (!params.chatId) throw new Error('no chat id')

	await deleteChat(params.chatId)

	return redirect('/')
}
