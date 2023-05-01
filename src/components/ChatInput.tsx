import { PaperAirplaneIcon } from '@heroicons/react/20/solid'
import { ActionIcon, Input, TextInput, createStyles } from '@mantine/core'
import { useUser } from '@utils/useUser'
import { useEffect, useState } from 'react'
import { useFetcher, useParams } from 'react-router-dom'

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
	const user = useUser()
	const fetcher = useFetcher()
	const [message, setMessage] = useState<string>('')

	useEffect(() => {
		if (fetcher.state === 'idle') {
			setMessage('')
		}
	}, [fetcher.state])

	return (
		<fetcher.Form method="post">
			<Input type="hidden" name="chatId" defaultValue={chatId} />
			<Input type="hidden" name="userId" defaultValue={user.id} />
			<Input type="hidden" name="username" defaultValue={user.username} />
			<div className={classes.root}>
				<TextInput
					value={message}
					onChange={e => setMessage(e.currentTarget.value)}
					name="message"
					className={classes.input}
					autoComplete={'off'}
				/>
				<ActionIcon
					type="submit"
					variant="filled"
					size="lg"
					color="indigo.4"
					loading={fetcher.state === 'submitting'}
					disabled={!message}
				>
					<PaperAirplaneIcon height={18} />
				</ActionIcon>
			</div>
		</fetcher.Form>
	)
}
