import { DBSchema } from 'idb'

export interface IUser {
	id: string
	username: string
}

export interface IChat {
	id: string
	title: string
	createdAt: string
}

export interface IMessage {
	id: string
	user_id: string
	chat_id: string
	text: string
	createdAt: string
	media: string | null
	replyToMessageId: string | null
	replyTo: IMessage | null
	user: Pick<IUser, 'username'>
}

export interface IMessageToReplyClient {
	id: string
	text: string
	user: Pick<IUser, 'username'>
	media: string | null
}

export interface ICreateMessageDto {
	text: string
	userId: string
	username: string
	chatId: string
	media?: string
	replyToMessageId?: string
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

export interface IMessagesDB extends DBSchema {
	messages: {
		key: string
		value: IMessage
		indexes: { 'by-chat-id': string }
	}
}
