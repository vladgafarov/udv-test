import { UserCircleIcon } from '@heroicons/react/24/outline'
import { ActionIcon, Flex, Text, Title } from '@mantine/core'

export default function Header() {
	return (
		<Flex justify={'space-between'} align={'center'} h="100%">
			<Title order={3}>Chat app</Title>

			<Flex align="center" gap="sm">
				<Text>User123</Text>
				<ActionIcon>
					<UserCircleIcon />
				</ActionIcon>
			</Flex>
		</Flex>
	)
}
