import { XMarkIcon } from '@heroicons/react/24/outline'
import { ActionIcon, Box, Image, Text, Title } from '@mantine/core'
import { IMessageToReplyClient } from '@types'

interface IProps {
	messageToReply: IMessageToReplyClient
	openImagePreview: () => void
	onClear: () => void
}

export default function MessageToReply({
	messageToReply,
	openImagePreview,
	onClear,
}: IProps) {
	return (
		<Box
			sx={theme => ({
				borderLeft: `3px solid ${theme.colors.indigo[4]}`,
				paddingLeft: theme.spacing.xs,
				borderRadius: theme.radius.xs,
				marginBottom: theme.spacing.xs,
				position: 'relative',
			})}
		>
			<Title order={5}>{messageToReply.user.username}</Title>
			<Text>{messageToReply.text}</Text>
			{messageToReply.media ? (
				<Image
					onClick={openImagePreview}
					src={messageToReply.media}
					width={32}
					height={32}
					radius="sm"
					bg="gray.1"
					sx={() => ({ cursor: 'pointer' })}
				/>
			) : null}

			<ActionIcon
				sx={() => ({
					position: 'absolute',
					top: 0,
					right: 0,
				})}
				onClick={onClear}
			>
				<XMarkIcon height={16} />
			</ActionIcon>
		</Box>
	)
}
