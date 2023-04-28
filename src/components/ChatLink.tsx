import { Box, createStyles, getStylesRef } from '@mantine/core'
import { Link, NavLink } from 'react-router-dom'

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
	},
	active: {
		ref: getStylesRef('active'),
		backgroundColor: theme.colors.indigo[4],
		border: `1.5px solid ${theme.colors.indigo[4]}`,
		color: 'white',
	},
}))

interface IProps {
	href: string
	title: string
}

export default function ChatLink({ href, title }: IProps) {
	const { classes, cx } = useStyles()

	return (
		<NavLink
			to={href}
			className={({ isActive }) =>
				isActive ? cx(classes.root, classes.active) : classes.root
			}
		>
			{title}
		</NavLink>
	)
}
