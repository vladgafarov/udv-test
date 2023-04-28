import { ScrollArea, Stack, createStyles } from '@mantine/core'
import { useParams } from 'react-router-dom'
import Message from '../components/Message'

const useStyles = createStyles(theme => ({
	wrapper: {
		height: 'calc(100vh - 60px - 2rem)',
		background: theme.colors.gray[0],
		overflow: 'hidden',
	},
}))

export default function Chat() {
	const { chatId } = useParams<{ chatId: string }>()
	const { classes } = useStyles()

	return (
		<div className={classes.wrapper}>
			<ScrollArea h={'100%'}>
				<Stack>
					{Array.from({ length: 20 }).map((_, i) => (
						<Message key={i} text={chatId} />
					))}
				</Stack>
			</ScrollArea>
		</div>
	)
}
