import {
	AppShell,
	Header as AppShellHeader,
	Navbar as AppShellNavbar,
	Button,
	Flex,
	Input,
	TextInput,
	Title,
	createStyles,
} from '@mantine/core'
import { useEffect, useState } from 'react'
import {
	ActionFunctionArgs,
	Form,
	Outlet,
	json,
	redirect,
	useActionData,
} from 'react-router-dom'
import { addUser, getUserById, getUserByUsername } from '../api/usersDB'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import { IUser } from '../types'
import { createChat, getAllChats } from '../api/chatsDB'

const useStyles = createStyles(theme => ({
	wrapper: {
		backgroundColor: theme.colors.gray[0],
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
	},
	block: {
		backgroundColor: 'white',
		paddingBlock: theme.spacing.md,
		paddingInline: theme.spacing.xl,
		width: 'max(400px, 40%)',
		borderRadius: theme.radius.md,
		boxShadow: theme.shadows.md,
	},
}))

export async function loader() {
	const chats = await getAllChats()

	return json({ chats })
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = Object.fromEntries(await request.formData()) as {
		intent: 'addUser' | 'createChat'
		username?: string
		title?: string
	}

	if (formData.intent === 'addUser') {
		if (!formData.username) throw new Error('no username')

		const user = await getUserByUsername(formData.username)
		if (user) {
			return json({ user })
		}

		const newUserId = await addUser(formData.username)
		const newUser = await getUserById(newUserId)

		if (!newUser) throw new Error('cannot get new user')

		return json({ user: newUser })
	}

	if (formData.intent === 'createChat') {
		if (!formData.title) throw new Error('no chat title')

		const chatId = await createChat(formData.title)

		return redirect(`/chats/${chatId}`)
	}
}

export default function Root() {
	const { classes } = useStyles()
	const actionData = useActionData() as { user: IUser } | undefined
	const [user, setUser] = useState<IUser>()

	useEffect(() => {
		if (actionData?.user) {
			setUser(actionData.user)
		}
	}, [actionData])

	if (!user) {
		return (
			<div className={classes.wrapper}>
				<div className={classes.block}>
					<Title order={2}>Super chat</Title>

					<Form method="post">
						<TextInput
							name="username"
							label="Enter username"
							my="md"
							required
							withAsterisk={false}
						/>
						<Input type="hidden" name="intent" defaultValue={'addUser'} />
						<Flex justify={'end'}>
							<Button type="submit">Continue</Button>
						</Flex>
					</Form>
				</div>
			</div>
		)
	}

	return (
		<AppShell
			navbar={
				<AppShellNavbar
					width={{ base: 300 }}
					p="xs"
					sx={() => ({
						height: 'calc(100% - 60px)',
					})}
				>
					<Navbar />
				</AppShellNavbar>
			}
			header={
				<AppShellHeader height={60} p="xs">
					<Header user={user} logout={() => setUser(undefined)} />
				</AppShellHeader>
			}
			styles={theme => ({
				main: {
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}
		>
			<Outlet context={{ user }} />
		</AppShell>
	)
}
