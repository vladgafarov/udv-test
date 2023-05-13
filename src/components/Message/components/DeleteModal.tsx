import { Button, Flex, Modal } from '@mantine/core'
import { useEffect } from 'react'
import { useFetcher, useFormAction } from 'react-router-dom'

interface IProps {
	isOpen: boolean
	onClose: () => void
	messageId: string
	onMessageDeleteCallback: (messageId: string) => void
}

export default function DeleteModal({
	isOpen,
	onClose,
	messageId,
	onMessageDeleteCallback,
}: IProps) {
	const fetcher = useFetcher()
	const action = useFormAction('delete-message')

	function handleDelete() {
		fetcher.submit({ messageId }, { method: 'post', action })
	}

	useEffect(() => {
		if (fetcher.data) {
			onMessageDeleteCallback(messageId)
		}
	}, [fetcher.data, messageId, onMessageDeleteCallback])

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
