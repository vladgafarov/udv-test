import { Button, Flex, ScrollArea, Stack, TextInput } from '@mantine/core'
import ChatLink from './ChatLink'
import {
	MagnifyingGlassCircleIcon,
	MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

export default function Navbar() {
	return (
		<Flex direction={'column'} h="100%">
			<Flex gap="sm">
				<TextInput icon={<MagnifyingGlassIcon height={16} />} />
				<Button color="indigo.4">New</Button>
			</Flex>

			<Stack
				spacing={'0'}
				mt="md"
				sx={() => ({
					overflow: 'hidden',
					flexGrow: 1,
				})}
			>
				<ScrollArea h={'100%'}>
					{Array.from({ length: 50 }, (_, i) => (
						<ChatLink key={i} href={`/chats/${i}`} title={String(i)} />
					))}
				</ScrollArea>
			</Stack>
		</Flex>
	)
}
