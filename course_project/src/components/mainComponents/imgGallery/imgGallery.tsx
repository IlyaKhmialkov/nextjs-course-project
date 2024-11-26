'use client'
import { Modal } from '@/components/modal/modal'
import Link from 'next/link'
import { useState } from 'react'
import styles from './imgGallery.module.scss'

export function ImgGallery() {
	const [isModalOpen, setModalOpen] = useState(false)
	const [imgNumber, setImgNumber] = useState(-1)

	function imgPressHandler(imgNumber: number) {
		setImgNumber(imgNumber)
		setModalOpen(true)
	}

	return (
		<>
			<section className={styles.gymPictures}>
				<h2>gym gallery</h2>
				<div>
					<img src='/gymImages/img1.jpg' alt='image of gym' onClick={() => imgPressHandler(1)} />
					<img src='/gymImages/img2.jpg' alt='image of gym' onClick={() => imgPressHandler(2)} />
					<img src='/gymImages/img3.jpg' alt='image of gym' onClick={() => imgPressHandler(3)} />
					<img src='/gymImages/img4.jpg' alt='image of gym' onClick={() => imgPressHandler(4)} />
					<img src='/gymImages/img5.jpg' alt='image of gym' onClick={() => imgPressHandler(5)} />
					<img src='/gymImages/img6.jpg' alt='image of gym' onClick={() => imgPressHandler(6)} />
				</div>
				<Link href={'/exerciseMachines'} className={styles.link}>
					inspect all exercise machines
				</Link>
			</section>
			{isModalOpen && (
				<Modal onClose={() => setModalOpen(false)}>
					<img src={'/gymImages/img' + imgNumber + '.jpg'} alt='image of gym' className={styles.bigImg} />
				</Modal>
			)}
		</>
	)
}
