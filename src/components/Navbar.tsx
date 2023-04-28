import { Stack } from '@mantine/core'
import ChatLink from './ChatLink'

export default function Navbar() {
	return (
		<Stack spacing={'0'}>
			{Array.from({ length: 50 }, (_, i) => (
				<ChatLink key={i} href={`/chats/${i}`} title={String(i)} />
			))}
		</Stack>
	)
}