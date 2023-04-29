import {
	ArrowLeftOnRectangleIcon,
	UserCircleIcon,
} from '@heroicons/react/24/outline'
import { Flex, Menu, Text, Title } from '@mantine/core'
import { IUser } from '../types'

interface IProps {
	user: IUser
	logout: () => void
}

export default function Header({ user, logout }: IProps) {
	return (
		<Flex justify={'space-between'} align={'center'} h="100%">
			<Title order={3}>Chat app</Title>

			<Menu position="bottom-end">
				<Menu.Target>
					<Flex
						align="center"
						gap="xs"
						sx={() => ({
							cursor: 'pointer',
						})}
					>
						<Text>{user.username}</Text>
						<UserCircleIcon height={22} />
					</Flex>
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Item
						icon={<ArrowLeftOnRectangleIcon height={16} />}
						color="red"
						onClick={logout}
					>
						Logout
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</Flex>
	)
}
