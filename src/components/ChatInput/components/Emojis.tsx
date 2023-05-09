import { FaceSmileIcon } from '@heroicons/react/24/outline'
import { ActionIcon, Popover, SimpleGrid } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

const emojis = [
	{
		title: 'grinning face',
		emoji: '😀',
	},
	{
		title: 'grinning face with big eyes',
		emoji: '😃',
	},
	{
		title: 'grinning face with smiling eyes',
		emoji: '😄',
	},
	{
		title: 'beaming face with smiling eyes',
		emoji: '😁',
	},
	{
		title: 'grinning squinting face',
		emoji: '😆',
	},
	{
		title: 'grinning face with sweat',
		emoji: '😅',
	},
	{
		title: 'rolling on the floor laughing',
		emoji: '🤣',
	},
	{
		title: 'face with tears of joy',
		emoji: '😂',
	},
	{
		title: 'slightly smiling face',
		emoji: '🙂',
	},
	{
		title: 'upside-down face',
		emoji: '🙃',
	},
	{
		title: 'winking face',
		emoji: '😉',
	},
	{
		title: 'smiling face with smiling eyes',
		emoji: '😊',
	},
	{
		title: 'smiling face with halo',
		emoji: '😇',
	},
	{
		title: 'face with monocle',
		emoji: '🧐',
	},
	{
		title: 'slightly frowning face',
		emoji: '🙁',
	},
]

interface IProps {
	onEmojiClick: (emoji: string) => void
}

export default function Emojis({ onEmojiClick }: IProps) {
	const [isOpen, popoverHandlers] = useDisclosure(false)

	return (
		<Popover opened={isOpen} onClose={popoverHandlers.close}>
			<Popover.Target>
				<ActionIcon
					size="lg"
					variant="light"
					color="indigo.4"
					onClick={popoverHandlers.open}
				>
					<FaceSmileIcon height={18} />
				</ActionIcon>
			</Popover.Target>
			<Popover.Dropdown>
				<SimpleGrid cols={5}>
					{emojis.map(emoji => (
						<ActionIcon
							onClick={() => {
								onEmojiClick(emoji.emoji)
								popoverHandlers.close()
							}}
							key={emoji.title}
						>
							<span role="img" aria-label={emoji.title}>
								{emoji.emoji}
							</span>
						</ActionIcon>
					))}
				</SimpleGrid>
			</Popover.Dropdown>
		</Popover>
	)
}
