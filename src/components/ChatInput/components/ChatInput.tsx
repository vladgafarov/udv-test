import ImageViewerModal from '@components/ImageViewerModal'
import { PaperAirplaneIcon } from '@heroicons/react/20/solid'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {
	ActionIcon,
	Button,
	FileButton,
	Flex,
	Input,
	TextInput,
	createStyles,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IMessageToReplyClient } from '@types'
import { useUser } from '@utils/useUser'
import { useEffect, useRef, useState } from 'react'
import { useFetcher, useParams } from 'react-router-dom'
import MessageToReply from './MessageToReply'
import Emojis from './Emojis'

function getBase64(file: File) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result as string)
		reader.onerror = error => reject(error)
	})
}

const useStyles = createStyles(theme => ({
	root: {
		paddingTop: theme.spacing.sm,
		backgroundColor: theme.colors.gray[0],
	},
	controls: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: theme.spacing.sm,
	},
	input: {
		flexGrow: 1,
	},
}))

interface IProps {
	messageToReply: IMessageToReplyClient | null
	onClearMessageToReply: () => void
}

export default function ChatInput({
	messageToReply,
	onClearMessageToReply,
}: IProps) {
	const { classes } = useStyles()
	const { chatId } = useParams()
	const user = useUser()
	const fetcher = useFetcher()
	const [message, setMessage] = useState<string>('')
	const [file, setFile] = useState<File | null>(null)
	const [media, setMedia] = useState<string>('')
	const [imageForPreview, setImageForPreview] = useState<string>('')
	const resetRef = useRef<() => void>(null)
	const [isImageViewerOpen, imageViewerModalHandlers] = useDisclosure(false)

	function clearFile() {
		setFile(null)
		setMedia('')
		resetRef.current?.()
	}

	function openPinnedImage() {
		if (!file) throw new Error('no file')

		setImageForPreview(URL.createObjectURL(file))
		imageViewerModalHandlers.open()
	}

	function openImageInReply() {
		if (!messageToReply?.media) throw new Error('no media in reply')

		setImageForPreview(messageToReply.media)
		imageViewerModalHandlers.open()
	}

	useEffect(() => {
		if (fetcher.state === 'idle') {
			setMessage('')
			clearFile()
			setMedia('')
			onClearMessageToReply()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetcher.state])

	useEffect(() => {
		if (file) {
			getBase64(file).then(setMedia)
		}
	}, [file])

	return (
		<div className={classes.root}>
			{file ? (
				<Flex align={'center'}>
					<Button
						leftIcon={
							<img
								width={26}
								height={26}
								src={URL.createObjectURL(file)}
							/>
						}
						variant="subtle"
						onClick={() => {
							openPinnedImage()
						}}
					>
						{file.name}
					</Button>
					<ActionIcon size="sm" onClick={clearFile}>
						<XMarkIcon height={16} />
					</ActionIcon>
				</Flex>
			) : null}

			{messageToReply ? (
				<MessageToReply
					messageToReply={messageToReply}
					openImagePreview={openImageInReply}
					onClear={onClearMessageToReply}
				/>
			) : null}

			<fetcher.Form method="post">
				<Input type="hidden" name="chatId" defaultValue={chatId} />
				<Input type="hidden" name="userId" defaultValue={user.id} />
				<Input type="hidden" name="username" defaultValue={user.username} />
				{file ? <Input type="hidden" name="media" value={media} /> : null}
				{messageToReply ? (
					<Input
						type="hidden"
						name="replyToMessageId"
						value={messageToReply?.id}
					/>
				) : null}
				<div className={classes.controls}>
					<TextInput
						value={message}
						onChange={e => setMessage(e.currentTarget.value)}
						name="text"
						className={classes.input}
						autoComplete={'off'}
					/>
					<Emojis
						onEmojiClick={emoji => {
							setMessage(message + emoji)
						}}
					/>
					<FileButton
						resetRef={resetRef}
						onChange={setFile}
						accept="image/*"
					>
						{props => (
							<ActionIcon
								variant="light"
								color="indigo.4"
								size={'lg'}
								{...props}
							>
								<PhotoIcon height={18} />
							</ActionIcon>
						)}
					</FileButton>
					<ActionIcon
						type="submit"
						variant="filled"
						size="lg"
						color="indigo.4"
						loading={fetcher.state === 'submitting'}
						disabled={!message && !file}
					>
						<PaperAirplaneIcon height={18} />
					</ActionIcon>
				</div>
			</fetcher.Form>

			<ImageViewerModal
				isOpen={isImageViewerOpen}
				onClose={imageViewerModalHandlers.close}
				imageUrl={imageForPreview}
			/>
		</div>
	)
}
