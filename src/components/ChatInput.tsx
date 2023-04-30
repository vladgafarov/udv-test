import { PaperAirplaneIcon } from '@heroicons/react/20/solid'
import { ActionIcon, Input, TextInput, createStyles } from '@mantine/core'
import { useFetcher, useOutletContext, useParams } from 'react-router-dom'
import { IUser } from '../types'

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
	const { chatId } = useParams()
	const { user } = useOutletContext() as { user: IUser }
	const fetcher = useFetcher()

	return (
		<fetcher.Form method="post">
			<div className={classes.root}>
				<TextInput
					name="message"
					className={classes.input}
					autoComplete={'off'}
				/>
				<Input type="hidden" name="chatId" defaultValue={chatId} />
				<Input type="hidden" name="userId" defaultValue={user.id} />
				<Input type="hidden" name="username" defaultValue={user.username} />
				<ActionIcon
					type="submit"
					variant="filled"
					size="lg"
					color="indigo.4"
					loading={fetcher.state === 'submitting'}
				>
					<PaperAirplaneIcon height={18} />
				</ActionIcon>
			</div>
		</fetcher.Form>
	)
}
