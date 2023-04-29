import { openDB } from 'idb'
import { IUser, IUsersDB } from '../types'

const usersDB = openDB<IUsersDB>('users', 1, {
	upgrade(db) {
		db.createObjectStore('users', {
			keyPath: 'id',
		}).createIndex('by-username', 'username')
	},
})

export async function getUserById(id: string) {
	const db = await usersDB
	return db.get('users', id)
}

export async function getUserByUsername(username: string) {
	const db = await usersDB
	return db.getFromIndex('users', 'by-username', username)
}

export async function addUser(username: string) {
	const db = await usersDB

	const user = await getUserById(username)
	if (user) {
		throw new Error('User already exists')
	}

	const uuid = crypto.randomUUID()

	return db.add('users', {
		id: uuid,
		username,
	})
}

export async function updateUser(user: IUser) {
	const db = await usersDB

	return db.put('users', user)
}

export async function deleteUser(username: string) {
	const db = await usersDB
	return db.delete('users', username)
}

export async function getAllUsers() {
	const db = await usersDB
	return db.getAll('users')
}
