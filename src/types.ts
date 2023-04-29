import { DBSchema } from 'idb'

export interface User {
	id: string
	username: string
	chatsIds: string[]
}

export interface Chat {
	id: string
	title: string
	messags: Message[]
}

export interface Message {
	id: string
	text: string
}

export interface UsersDB extends DBSchema {
	users: {
		key: string
		value: User
		indexes: { 'by-username': string }
	}
}
