import { openDB } from 'idb'
import { ICreateMessageDto, IMessagesDB } from '../types'

const messagesDB = openDB<IMessagesDB>('messaages', 1, {
	upgrade(db) {
		db.createObjectStore('messages', {
			keyPath: 'id',
		}).createIndex('by-chat-id', 'chat_id')
	},
})

export async function createMessage(dto: ICreateMessageDto) {
	const db = await messagesDB

	const uuid = crypto.randomUUID()

	if (dto.replyToMessageId) {
		// const tx = db.transaction('messages', 'readwrite')

		const messageToReply = await db.get('messages', dto.replyToMessageId)

		if (!messageToReply) throw new Error('message not found')

		return db.add('messages', {
			id: uuid,
			text: dto.text,
			chat_id: dto.chatId,
			user_id: dto.userId,
			user: {
				username: dto.username,
			},
			createdAt: new Date().toISOString(),
			media: dto.media || null,
			replyTo: messageToReply,
			replyToMessageId: dto.replyToMessageId,
		})
	}

	return db.add('messages', {
		id: uuid,
		text: dto.text,
		chat_id: dto.chatId,
		user_id: dto.userId,
		user: {
			username: dto.username,
		},
		createdAt: new Date().toISOString(),
		media: dto.media || null,
		replyTo: null,
		replyToMessageId: null,
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
