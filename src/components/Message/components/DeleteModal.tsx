import { Button, Flex, Modal } from '@mantine/core'
import { useFetcher } from 'react-router-dom'

interface IProps {
	isOpen: boolean
	onClose: () => void
	messageId: string
}

export default function DeleteModal({ isOpen, onClose, messageId }: IProps) {
	const fetcher = useFetcher()

	function handleDelete() {
		fetcher.submit({ intent: 'deleteMessage', messageId }, { method: 'post' })
	}

	return (
		<Modal
			opened={isOpen}
			onClose={onClose}
			title="Are you sure to delete this message?"
		>
			<Flex justify={'end'} gap="md">
				<Button onClick={onClose}>Cancel</Button>
				<Button
					color="red"
					onClick={handleDelete}
					loading={fetcher.state === 'submitting'}
				>
					Delete
				</Button>
			</Flex>
		</Modal>
	)
}
