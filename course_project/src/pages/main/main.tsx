import { Footer } from '@/components/footer/footer'
import { Header } from '@/components/header/header'
import { About } from '@/components/mainComponents/about/about'
import { ImgGallery } from '@/components/mainComponents/imgGallery/imgGallery'
import styles from './main.module.scss'

export function Main() {
	return (
		<>
			<Header />
			<main className={styles.main}>
				<div className={styles.bgImgDiv}>
					<h1>Tren Master Gym</h1>
				</div>
				<ImgGallery />
				<About />
			</main>
			<Footer />
		</>
	)
}
