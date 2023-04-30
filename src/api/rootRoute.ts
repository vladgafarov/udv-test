import { ActionFunctionArgs, json } from 'react-router-dom'
import { getAllChats } from './chatsDB'
import { addUser, getUserById, getUserByUsername } from './usersDB'

export async function loader() {
	const chats = await getAllChats()

	return json({ chats })
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = Object.fromEntries(await request.formData()) as {
		username: string
	}

	if (!formData.username) throw new Error('no username')

	const user = await getUserByUsername(formData.username)
	if (user) {
		return json({ user })
	}

	const newUserId = await addUser(formData.username)
	const newUser = await getUserById(newUserId)

	if (!newUser) throw new Error('cannot get new user')

	return json({ user: newUser })
}
