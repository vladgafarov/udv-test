import { useOutletContext } from 'react-router-dom'
import { IUser } from '../types'

export const useUser = () => {
	const { user } = useOutletContext() as { user: IUser }

	if (!user) {
		throw new Error('cannot find user in outlet context')
	}

	return user
}
