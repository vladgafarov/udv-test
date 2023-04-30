import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Button, Flex, ScrollArea, Stack, TextInput } from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'
import {
	useLoaderData,
	useNavigate,
	useParams,
	useSearchParams,
} from 'react-router-dom'
import { IChat } from '../types'
import ChatLink from './ChatLink'

export default function Navbar() {
	const { chats } = useLoaderData() as {
		chats: IChat[]
	}
	const navigate = useNavigate()
	const [searchParams, setSearchParams] = useSearchParams()
	const { chatId } = useParams()
	const [value, setValue] = useState('')

	const filteredChats: IChat[] = useMemo(() => {
		const query = searchParams.get('query')

		if (!query) return chats

		return chats.filter(item => item.title.includes(query))
	}, [chats, searchParams])

	useEffect(() => {
		setSearchParams({ query: value })
	}, [setSearchParams, value])

	useEffect(() => {
		setValue('')
	}, [chatId])

	return (
		<>
			<Flex direction={'column'} h="100%">
				<Flex gap="sm">
					<TextInput
						type="search"
						placeholder="Search chats"
						icon={<MagnifyingGlassIcon height={16} />}
						value={value}
						onChange={e => setValue(e.currentTarget.value)}
					/>
					<Button color="indigo.4" onClick={() => navigate(`/chats/new`)}>
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
