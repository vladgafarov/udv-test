import ImageViewerModal from '@components/ImageViewerModal'
import { PaperAirplaneIcon } from '@heroicons/react/20/solid'
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {
	ActionIcon,
	Button,
	FileButton,
	Input,
	TextInput,
	createStyles,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useUser } from '@utils/useUser'
import { useEffect, useRef, useState } from 'react'
import { useFetcher, useParams } from 'react-router-dom'

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

export default function ChatInput() {
	const { classes } = useStyles()
	const { chatId } = useParams()
	const user = useUser()
	const fetcher = useFetcher()
	const [message, setMessage] = useState<string>('')
	const [file, setFile] = useState<File | null>(null)
	const [media, setMedia] = useState<string>('')
	const resetRef = useRef<() => void>(null)
	const [isImageViewerOpen, imageViewerModalHandlers] = useDisclosure(false)

	function clearFile() {
		setFile(null)
		resetRef.current?.()
	}

	useEffect(() => {
		if (fetcher.state === 'idle') {
			setMessage('')
			clearFile()
		}
	}, [fetcher.state])

	useEffect(() => {
		if (file) {
			getBase64(file).then(setMedia)
		}
	}, [file])

	return (
		<div className={classes.root}>
			{file ? (
				<Button
					rightIcon={
						<ActionIcon size="sm" onClick={clearFile}>
							<XMarkIcon height={16} />
						</ActionIcon>
					}
					variant="subtle"
					onClick={() => {
						file && imageViewerModalHandlers.open()
					}}
				>
					{file.name}
				</Button>
			) : null}
			<fetcher.Form method="post">
				<Input type="hidden" name="chatId" defaultValue={chatId} />
				<Input type="hidden" name="userId" defaultValue={user.id} />
				<Input type="hidden" name="username" defaultValue={user.username} />
				<Input type="hidden" name="media" value={media} />
				<div className={classes.controls}>
					<TextInput
						value={message}
						onChange={e => setMessage(e.currentTarget.value)}
						name="message"
						className={classes.input}
						autoComplete={'off'}
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
				imageUrl={file ? URL.createObjectURL(file) : null}
			/>
		</div>
	)
}
