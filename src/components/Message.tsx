import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { ActionIcon, Box, Flex, Text, createStyles } from '@mantine/core'

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
	text: string
}

export default function Message({ text }: IProps) {
	const { classes } = useStyles({ current: false })

	return (
		<Box className={classes.root}>
			<Flex justify={'space-between'} align="center">
				<Text size="sm" weight={600}>
					User123
				</Text>
				<ActionIcon size="xs">
					<ChevronDownIcon />
				</ActionIcon>
			</Flex>

			<Text py="xs">{text}</Text>

			<Text color="dimmed" size={'xs'} align="end">
				12:20
			</Text>
		</Box>
	)
}
