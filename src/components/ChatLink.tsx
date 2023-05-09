import { TrashIcon } from '@heroicons/react/24/outline'
import {
	ActionIcon,
	Button,
	Flex,
	Popover,
	Text,
	createStyles,
	getStylesRef,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { NavLink, useFetcher, useFormAction, useParams } from 'react-router-dom'

const useStyles = createStyles(theme => ({
	root: {
		border: `1.5px solid transparent`,
		borderRadius: theme.radius.md,
		display: 'block',
		color: theme.colors.dark[5],
		fontSize: theme.fontSizes.md,
		textDecoration: 'none',
		paddingBlock: theme.spacing.xs,
		paddingInline: theme.spacing.sm,
		transition: '.25s ease-in-out',
		[`&:not(.${getStylesRef('active')}):hover`]: {
			backgroundColor: theme.colors.gray[2],
		},
		['.delete']: {
			transition: '0s',
			opacity: 0,
		},
	},
	active: {
		ref: getStylesRef('active'),
		backgroundColor: theme.colors.indigo[4],
		border: `1.5px solid ${theme.colors.indigo[4]}`,
		color: 'white',
		['.delete']: {
			opacity: 1,
		},
	},
}))

interface IProps {
	href: string
	title: string
}

export default function ChatLink({ href, title }: IProps) {
	const { classes, cx } = useStyles()
	const [isDeleteOpen, deletePopoverHandlers] = useDisclosure()
	const { chatId } = useParams()
	const action = useFormAction(`/chats/${chatId}/delete-chat`)
	const fetcher = useFetcher()

	function deleteChat() {
		fetcher.submit(
			{},
			{
				method: 'post',
				action,
			}
		)
	}

	return (
		<NavLink
			to={href}
			className={({ isActive }) =>
				isActive ? cx(classes.root, classes.active) : classes.root
			}
		>
			<Flex align="center" justify={'space-between'}>
				{title}
				<Popover
					opened={isDeleteOpen}
					onClose={deletePopoverHandlers.close}
				>
					<Popover.Target>
						<ActionIcon
							onClick={deletePopoverHandlers.open}
							className="delete"
							variant="filled"
							color="indigo.4"
							sx={() => ({
								color: 'white',
							})}
						>
							<TrashIcon height={16} />
						</ActionIcon>
					</Popover.Target>
					<Popover.Dropdown>
						<Text color="dimmed">Delete?</Text>
						<Flex gap="sm">
							<Button
								color="red"
								onClick={deleteChat}
								loading={fetcher.state === 'submitting'}
							>
								Yes
							</Button>
							<Button onClick={deletePopoverHandlers.close}>No</Button>
						</Flex>
					</Popover.Dropdown>
				</Popover>
			</Flex>
		</NavLink>
	)
}
