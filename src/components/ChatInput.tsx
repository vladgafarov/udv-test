import { PaperAirplaneIcon } from '@heroicons/react/20/solid'
import { ActionIcon, TextInput, createStyles } from '@mantine/core'

const useStyles = createStyles(theme => ({
	root: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
		height: '60px',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.spacing.sm,
		paddingTop: theme.spacing.sm,
		backgroundColor: theme.colors.gray[0],
	},
	input: {
		flexGrow: 1,
	},
}))

export default function ChatInput() {
	const { classes } = useStyles()

	return (
		<div className={classes.root}>
			<TextInput className={classes.input} />
			<ActionIcon variant="filled" size="lg" color="indigo.4">
				<PaperAirplaneIcon height={18} />
			</ActionIcon>
		</div>
	)
}
