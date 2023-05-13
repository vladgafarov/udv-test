import { Box, Flex, Image, Text, createStyles } from '@mantine/core'
import { IMessage } from '@types'
import { useUser } from '@utils/useUser'
import { useMemo, useState } from 'react'
import Menu from './Menu'
import ImageViewerModal from '@components/ImageViewerModal'
import { useDisclosure } from '@mantine/hooks'
import ReplyBlock from './ReplyBlock'

const useStyles = createStyles((theme, { current }: { current: boolean }) => ({
	root: {
		backgroundColor: current ? theme.colors.indigo[1] : theme.colors.gray[2],
		borderRadius: theme.radius.sm,
		minWidth: '160px',
		paddingBlock: theme.spacing.xs,
		paddingInline: theme.spacing.sm,
	},
}))

interface IProps {
	message: IMessage
	onReply: () => void
	onMessageDeleteCallback: (messageId: string) => void
}

export default function Message({
	message,
	onReply,
	onMessageDeleteCallback,
}: IProps) {
	const [isImageViewerModalOpen, handleImageViewerModal] = useDisclosure(false)
	const user = useUser()
	const isCurrentUser = useMemo(
		() => user.id === message.user_id,
		[message.user_id, user.id]
	)
	const [imagePreview, setImagePreview] = useState<string>(
		message?.media || ''
	)
	const { classes } = useStyles({ current: isCurrentUser })

	return (
		<Box className={classes.root}>
			<Flex justify={'space-between'} align="center" gap="xl">
				<Text size="sm" weight={600}>
					{message.user.username}
				</Text>
				<Menu
					userId={message.user_id}
					messageId={message.id}
					onReply={onReply}
					reply={message.replyTo}
					onMessageDeleteCallback={onMessageDeleteCallback}
				/>
			</Flex>

			<Text py="xs">{message.text}</Text>

			{message.media ? (
				<Image
					maw={240}
					fit="contain"
					src={message.media}
					radius={'sm'}
					onClick={handleImageViewerModal.open}
					sx={() => ({
						cursor: 'pointer',
					})}
				/>
			) : null}

			{message.replyTo ? (
				<ReplyBlock
					reply={message.replyTo}
					onImagePreview={imageUrl => {
						setImagePreview(imageUrl)
						handleImageViewerModal.open()
					}}
				/>
			) : null}

			<Text color="dimmed" size={'xs'} align="end">
				{new Date(message.createdAt).toLocaleTimeString('ru-RU', {
					hour: '2-digit',
					minute: '2-digit',
					second: undefined,
				})}
			</Text>

			<ImageViewerModal
				isOpen={isImageViewerModalOpen}
				onClose={handleImageViewerModal.close}
				imageUrl={imagePreview}
			/>
		</Box>
	)
}
