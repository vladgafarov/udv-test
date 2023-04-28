import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'

const router = createBrowserRouter([
	{
		path: '/',
		element: <div>Hello world!</div>,
	},
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<RouterProvider router={router} />
		</MantineProvider>
	</React.StrictMode>
)
