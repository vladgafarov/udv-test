import { MantineProvider } from '@mantine/core'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
	action as chatAction,
	loader as chatLoader,
	deleteChatAction,
	deleteMessageAction,
} from './api/chatRoute'
import { action as newChatAction } from './api/newRoute'
import { action as rootAction, loader as rootLoader } from './api/rootRoute'
import ErrorPage from './error-page'
import Chat from './routes/chat'
import NewChat from './routes/chat/new'
import Root from './routes/root'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						path: '/chats/:chatId',
						loader: chatLoader,
						action: chatAction,
						element: <Chat />,
					},
					{
						path: '/chats/:chatId/delete-message',
						action: deleteMessageAction,
					},
					{
						path: '/chats/:chatId/delete-chat',
						action: deleteChatAction,
					},
					{
						path: '/chats/new',
						action: newChatAction,
						element: <NewChat />,
					},
					{
						index: true,
						element: <div>Select chat</div>,
					},
				],
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<RouterProvider router={router} />
		</MantineProvider>
	</React.StrictMode>
)
