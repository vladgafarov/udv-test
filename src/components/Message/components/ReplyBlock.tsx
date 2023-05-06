import { Box, Image, Text } from '@mantine/core'
import { IMessage } from '@types'

interface IProps {
	reply: IMessage
	onImagePreview: (imageUrl: string) => void
}

export default function ReplyBlock({ reply, onImagePreview }: IProps) {
	return (
		<Box
			sx={theme => ({
				borderLeft: `3px solid ${theme.colors.indigo[4]}`,
				paddingLeft: theme.spacing.xs,
				marginBlock: theme.spacing.xs,
			})}
		>
			<Text size="sm" weight={600}>
				{reply.user.username}
			</Text>
			<Text>{reply.text}</Text>

			{reply.media ? (
				<Image
					maw={240}
					fit="contain"
					src={reply.media}
					radius={'sm'}
					onClick={() => {
						if (!reply.media) return
						onImagePreview(reply.media)
					}}
					sx={() => ({
						cursor: 'pointer',
					})}
				/>
			) : null}

			<Text color="dimmed" size={'xs'} align="end">
				{new Date(reply.createdAt).toLocaleDateString('ru-RU', {
					hour: '2-digit',
					minute: '2-digit',
					second: undefined,
				})}
			</Text>
		</Box>
	)
}
