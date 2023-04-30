import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { createChat } from './chatsDB'

export async function action({ request }: ActionFunctionArgs) {
	const formData = Object.fromEntries(await request.formData()) as {
		title: string
	}

	if (!formData.title) throw new Error('no chat title')

	const chatId = await createChat(formData.title)

	return redirect(`/chats/${chatId}`)
}
