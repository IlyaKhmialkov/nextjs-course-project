import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.scss'

export const oswald = localFont({
	src: './fonts/Oswald.ttf',
	variable: '--font-oswald',
	weight: '400',
})
export const openSans = localFont({
	src: './fonts/OpenSans.ttf',
	variable: '--font-open-sans',
	weight: '400',
})

export const metadata: Metadata = {
	title: 'Tren Master',
	description: 'Gym for those who are always one step ahead',
}

export const viewport: Viewport = {
	themeColor: 'black',
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${oswald.variable} ${openSans.variable}`}>{children}</body>
		</html>
	)
}
