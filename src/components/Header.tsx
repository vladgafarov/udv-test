import { UserCircleIcon } from '@heroicons/react/24/outline'
import { ActionIcon, Flex, Text, Title } from '@mantine/core'
import { User } from '../types'

interface IProps {
	user: User
}

export default function Header({ user }: IProps) {
	return (
		<Flex justify={'space-between'} align={'center'} h="100%">
			<Title order={3}>Chat app</Title>

			<Flex align="center" gap="sm">
				<Text>{user.username}</Text>
				<ActionIcon>
					<UserCircleIcon />
				</ActionIcon>
			</Flex>
		</Flex>
	)
}
