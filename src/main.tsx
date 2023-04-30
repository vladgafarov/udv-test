import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import Root, { action as rootAction, loader as rootLoader } from './routes/root'
import ErrorPage from './error-page'
import Chat, { loader as chatLoader, action as chatAction } from './routes/chat'
import NewChat, { action as newChatAction } from './routes/chat/new'

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
