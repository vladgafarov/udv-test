import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { ActionIcon, Box, Flex, Text, createStyles } from '@mantine/core'
import { IMessage } from '../types'

const useStyles = createStyles((theme, { current }: { current: boolean }) => ({
	root: {
		backgroundColor: current ? theme.colors.gray[2] : theme.colors.indigo[1],
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
	const { classes } = useStyles({ current: false })

	return (
		<Box className={classes.root}>
			<Flex justify={'space-between'} align="center">
				<Text size="sm" weight={600}>
					{message.user.username}
				</Text>
				<ActionIcon size="xs">
					<ChevronDownIcon />
				</ActionIcon>
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
