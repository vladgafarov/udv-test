import { Box, Flex, Text, createStyles } from '@mantine/core'
import { IMessage } from '@types'
import { useUser } from '@utils/useUser'
import { useMemo } from 'react'
import Menu from './Menu'

const useStyles = createStyles((theme, { current }: { current: boolean }) => ({
	root: {
		backgroundColor: current ? theme.colors.indigo[1] : theme.colors.gray[2],
		borderRadius: theme.radius.sm,
		maxWidth: 'min-content',
		minWidth: '160px',
		paddingBlock: theme.spacing.xs,
		paddingInline: theme.spacing.sm,
	},
}))

interface IProps {
	message: IMessage
}

export default function Message({ message }: IProps) {
	const user = useUser()
	const isCurrentUser = useMemo(
		() => user.id === message.user_id,
		[message.user_id, user.id]
	)
	const { classes } = useStyles({ current: isCurrentUser })

	return (
		<Box className={classes.root}>
			<Flex justify={'space-between'} align="center" gap="xl">
				<Text size="sm" weight={600}>
					{message.user.username}
				</Text>
				<Menu userId={message.user_id} messageId={message.id} />
			</Flex>

			<Text py="xs">{message.text}</Text>

			<Text color="dimmed" size={'xs'} align="end">
				{new Date(message.createdAt).toLocaleTimeString('ru-RU', {
					hour: '2-digit',
					minute: '2-digit',
					second: undefined,
				})}
			</Text>
		</Box>
	)
}
