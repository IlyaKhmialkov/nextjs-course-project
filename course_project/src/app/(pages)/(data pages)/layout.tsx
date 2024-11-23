import { Footer } from '@/components/footer/footer'
import { Header } from '@/components/header/header'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}
