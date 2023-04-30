import { Button, Flex, Modal, TextInput } from '@mantine/core'
import {
	ActionFunctionArgs,
	Form,
	redirect,
	useNavigate,
} from 'react-router-dom'
import { createChat } from '../../api/chatsDB'

export async function action({ request }: ActionFunctionArgs) {
	const formData = Object.fromEntries(await request.formData()) as {
		title: string
	}

	if (!formData.title) throw new Error('no chat title')

	const chatId = await createChat(formData.title)

	return redirect(`/chats/${chatId}`)
}

export default function NewChat() {
	const navigate = useNavigate()

	return (
		<Modal opened={true} onClose={() => navigate(-1)} title="Create chat">
			<Form method="post">
				<TextInput
					name="title"
					label="Title"
					required
					withAsterisk={false}
				/>

				<Flex justify={'end'} mt="md">
					<Button type="submit">Create</Button>
				</Flex>
			</Form>
		</Modal>
	)
}
