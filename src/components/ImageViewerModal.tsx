import { Modal, createStyles } from '@mantine/core'

const useStyles = createStyles(() => ({
	root: {
		img: {
			maxWidth: '100%',
			maxHeight: '100%',
		},
	},
}))

interface IProps {
	isOpen: boolean
	onClose: () => void
	imageUrl: string | null
}

export default function ImageViewerModal({
	isOpen,
	onClose,
	imageUrl,
}: IProps) {
	const { classes } = useStyles()

	if (!imageUrl) return null

	return (
		<Modal.Root
			opened={isOpen}
			onClose={onClose}
			size="lg"
			className={classes.root}
		>
			<Modal.Overlay />
			<Modal.Content>
				<Modal.CloseButton />
				<img src={imageUrl} />
			</Modal.Content>
		</Modal.Root>
	)
}
