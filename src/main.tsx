import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import Root from './routes/root'
import ErrorPage from './error-page'
import Chat from './routes/chat'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/chats/:chatId',
				element: <Chat />,
			},
			{
				index: true,
				element: <div>Select chat</div>,
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
