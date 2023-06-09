import { PlusIcon } from '@heroicons/react/20/solid'
import { Button, Flex, ScrollArea, Stack } from '@mantine/core'
import { IChat } from '@types'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import ChatLink from './ChatLink'

export default function Navbar() {
	const bc = useRef(new BroadcastChannel('chats'))
	const { chats: loaderChats } = useLoaderData() as {
		chats: IChat[]
	}
	const [chats, setChats] = useState<IChat[]>(loaderChats)
	const navigate = useNavigate()

	const filteredChats: IChat[] = useMemo(() => {
		return chats.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		)
	}, [chats])

	useEffect(() => {
		setChats(loaderChats)
		bc.current.postMessage(loaderChats)
	}, [loaderChats])

	useEffect(() => {
		bc.current.onmessage = event => {
			setChats(event.data)
		}
	}, [])

	return (
		<>
			<Flex direction={'column'} h="100%">
				<Flex gap="sm">
					<Button
						leftIcon={<PlusIcon height={18} />}
						color="indigo.4"
						onClick={() => navigate(`/chats/new`)}
					>
						New
					</Button>
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
						{filteredChats.map(chat => (
							<ChatLink
								key={chat.id}
								href={`/chats/${chat.id}`}
								title={chat.title}
							/>
						))}
					</ScrollArea>
				</Stack>
			</Flex>
		</>
	)
}
