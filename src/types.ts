import { DBSchema } from 'idb'

export interface IUser {
	id: string
	username: string
}

export interface IChat {
	id: string
	title: string
	messages: IMessage[]
}

export interface IMessage {
	id: string
	user_id: string
	text: string
	createdAt: string
}

export interface IUsersDB extends DBSchema {
	users: {
		key: string
		value: IUser
		indexes: { 'by-username': string }
	}
}

export interface IChatsDB extends DBSchema {
	chats: {
		key: string
		value: IChat
		indexes: { 'by-title': string }
	}
}
