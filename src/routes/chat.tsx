import { ScrollArea, Stack, createStyles } from '@mantine/core'
import { useParams } from 'react-router-dom'
import Message from '../components/Message'
import ChatInput from '../components/ChatInput'

const useStyles = createStyles(theme => ({
	wrapper: {
		height: `calc(100vh - 60px - 2rem)`,
		background: theme.colors.gray[0],
		overflow: 'hidden',
		position: 'relative',
	},
	scrollArea: {
		height: `calc(100% - 60px)`,
	},
}))

export default function Chat() {
	const { chatId } = useParams<{ chatId: string }>()
	const { classes } = useStyles()

	return (
		<div className={classes.wrapper}>
			<ScrollArea className={classes.scrollArea}>
				<Stack>
					{Array.from({ length: 20 }).map((_, i) => (
						<Message key={i} text={chatId} />
					))}
				</Stack>
			</ScrollArea>
			<ChatInput />
		</div>
	)
}
