import {
	AppShell,
	Header as AppShellHeader,
	Navbar as AppShellNavbar,
} from '@mantine/core'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Navbar from '../components/Navbar'

export default function Root() {
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
					<Header />
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
			<Outlet />
		</AppShell>
	)
}
