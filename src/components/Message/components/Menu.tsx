import {
	ArrowUturnRightIcon,
	ChevronDownIcon,
	TrashIcon,
} from '@heroicons/react/24/outline'
import { ActionIcon, Menu as MMenu } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useUser } from '@utils/useUser'
import { useMemo } from 'react'
import DeleteModal from './DeleteModal'

interface IProps {
	userId: string
	messageId: string
}

export default function Menu({ userId, messageId }: IProps) {
	const user = useUser()
	const isCurrentUser = useMemo(() => user.id === userId, [user.id, userId])

	const [isDeleteModalOpen, deleteModalHandlers] = useDisclosure(false)

	return (
		<>
			<MMenu position="bottom-end">
				<MMenu.Target>
					<ActionIcon size="xs">
						<ChevronDownIcon />
					</ActionIcon>
				</MMenu.Target>
				<MMenu.Dropdown>
					<MMenu.Item icon={<ArrowUturnRightIcon height={14} />}>
						Reply
					</MMenu.Item>
					{isCurrentUser ? (
						<MMenu.Item
							onClick={deleteModalHandlers.open}
							icon={<TrashIcon height={14} />}
							color="red"
						>
							Delete
						</MMenu.Item>
					) : null}
				</MMenu.Dropdown>
			</MMenu>
			<DeleteModal
				isOpen={isDeleteModalOpen}
				onClose={deleteModalHandlers.close}
				messageId={messageId}
			/>
		</>
	)
}
