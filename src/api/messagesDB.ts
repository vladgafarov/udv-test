import { openDB } from 'idb'
import { IMessagesDB } from '../types'

const messagesDB = openDB<IMessagesDB>('messaages', 1, {
	upgrade(db) {
		db.createObjectStore('messages', {
			keyPath: 'id',
		}).createIndex('by-chat-id', 'chat_id')
	},
})

export async function createMessage(payload: {
	text: string
	userId: string
	username: string
	chatId: string
}) {
	const db = await messagesDB

	const uuid = crypto.randomUUID()

	return db.add('messages', {
		id: uuid,
		text: payload.text,
		chat_id: payload.chatId,
		user_id: payload.userId,
		user: {
			username: payload.username,
		},
		createdAt: new Date().toISOString(),
	})
}

export async function getMessagesFromChat(chatId: string) {
	const db = await messagesDB

	return db.getAllFromIndex('messages', 'by-chat-id', chatId)
}

export async function deleteMessage(messageId: string) {
	const db = await messagesDB

	return db.delete('messages', messageId)
}
