import { Button, Flex, Modal, TextInput } from '@mantine/core'
import { Form, useNavigate } from 'react-router-dom'

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
