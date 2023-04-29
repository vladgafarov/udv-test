import { ScrollArea, Stack, createStyles } from '@mantine/core'
import { useScrollIntoView } from '@mantine/hooks'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ChatInput from '../components/ChatInput'
import Message from '../components/Message'

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

	const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({
		duration: 0,
	})

	// const messagesByDate = useMemo(() => {
	// 	const messagesByDate = new Map<string, Message[]>()
	// 	messages.forEach((message) => {
	// 		const date = new Date(message.createdAt).toLocaleDateString(
	// 			undefined,
	// 			{
	// 				month: "long",
	// 				day: "numeric",
	// 			},
	// 		)
	// 		const messages = messagesByDate.get(date) || []
	// 		messagesByDate.set(date, [...messages, message])
	// 	})
	// 	return messagesByDate
	// }, [messages])

	useEffect(() => {
		scrollIntoView({
			alignment: 'end',
		})
	}, [scrollIntoView, chatId])

	return (
		<div className={classes.wrapper}>
			<ScrollArea className={classes.scrollArea} viewportRef={scrollableRef}>
				<Stack>
					{Array.from({ length: 20 }).map((_, i) => (
						<Message key={i} text={chatId} />
					))}

					{/* @ts-expect-error ref */}
					<div ref={targetRef}></div>
				</Stack>
			</ScrollArea>
			<ChatInput />
		</div>
	)
}
