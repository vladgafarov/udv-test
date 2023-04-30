import { openDB } from 'idb'
import { IChatsDB } from '../types'

const chatsDB = openDB<IChatsDB>('chats', 1, {
	upgrade(db) {
		db.createObjectStore('chats', {
			keyPath: 'id',
		}).createIndex('by-title', 'title')
	},
})

export async function getChatById(id: string) {
	const db = await chatsDB
	return db.get('chats', id)
}

export async function createChat(title: string) {
	const db = await chatsDB

	const uuid = crypto.randomUUID()

	return db.add('chats', {
		id: uuid,
		title,
		createdAt: new Date().toISOString(),
	})
}

export async function deleteChat(id: string) {
	const db = await chatsDB
	return db.delete('chats', id)
}

export async function getAllChats() {
	const db = await chatsDB

	return db.getAll('chats')
}
