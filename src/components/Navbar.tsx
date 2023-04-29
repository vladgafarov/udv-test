import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import {
	Button,
	Flex,
	Input,
	Modal,
	ScrollArea,
	Stack,
	TextInput,
} from '@mantine/core'
import ChatLink from './ChatLink'
import { useDisclosure } from '@mantine/hooks'
import { Form, useLoaderData } from 'react-router-dom'
import { IChat } from '../types'

export default function Navbar() {
	const { chats } = useLoaderData() as { chats: IChat[] }

	const [isOpen, modalHandlers] = useDisclosure(false)

	return (
		<>
			<Flex direction={'column'} h="100%">
				<Flex gap="sm">
					<TextInput icon={<MagnifyingGlassIcon height={16} />} />
					<Button color="indigo.4" onClick={modalHandlers.open}>
						New
					</Button>
				</Flex>

				<Stack
					spacing={'0'}
					mt="md"
					sx={() => ({
						overflow: 'hidden',
						flexGrow: 1,
					})}
				>
					<ScrollArea h={'100%'}>
						{chats.map(chat => (
							<ChatLink
								key={chat.id}
								href={`/chats/${chat.id}`}
								title={chat.title}
							/>
						))}
					</ScrollArea>
				</Stack>
			</Flex>

			<Modal
				opened={isOpen}
				onClose={modalHandlers.close}
				title="Create chat"
			>
				<Form method="post">
					<TextInput
						name="title"
						label="Title"
						required
						withAsterisk={false}
					/>
					<Input type="hidden" name="intent" defaultValue="createChat" />

					<Flex justify={'end'} mt="md">
						<Button type="submit">Create</Button>
					</Flex>
				</Form>
			</Modal>
		</>
	)
}
