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
import { IMessage } from '@types'

interface IProps {
	userId: string
	messageId: string
	onReply: () => void
	reply: IMessage | null
	onMessageDeleteCallback: (messageId: string) => void
}

export default function Menu({
	userId,
	messageId,
	onReply,
	reply,
	onMessageDeleteCallback,
}: IProps) {
	const user = useUser()
	const isCurrentUser = useMemo(() => user.id === userId, [user.id, userId])
	const [isDeleteModalOpen, deleteModalHandlers] = useDisclosure(false)

	if (reply && !isCurrentUser) return null

	return (
		<>
			<MMenu position="bottom-end">
				<MMenu.Target>
					<ActionIcon size="xs">
						<ChevronDownIcon />
					</ActionIcon>
				</MMenu.Target>
				<MMenu.Dropdown>
					{!reply ? (
						<MMenu.Item
							icon={<ArrowUturnRightIcon height={14} />}
							onClick={onReply}
						>
							Reply
						</MMenu.Item>
					) : null}
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
				onMessageDeleteCallback={onMessageDeleteCallback}
			/>
		</>
	)
}
