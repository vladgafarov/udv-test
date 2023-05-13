import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			devOptions: {
				enabled: true,
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
			},
			manifest: {
				name: 'Chat app',
				short_name: 'Chat',
				description: 'Chat app for messaging within browser',
				theme_color: '#5C7CFA',
				background_color: '#5C7CFA',
				icons: [
					{
						src: 'vite-pwa256.png',
						sizes: '256x256',
						type: 'image/png',
					},
					{
						src: 'vite-pwa512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@components': path.resolve(__dirname, './src/components'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@api': path.resolve(__dirname, './src/api'),
			'@routes': path.resolve(__dirname, './src/routes'),
		},
	},
})
