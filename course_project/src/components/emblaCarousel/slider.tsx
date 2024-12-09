'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ReactNode } from 'react'
import styles from './slider.module.scss'
import { NextButton, PrevButton, usePrevNextButtons } from './sliderArrows'

interface ISlideProps {
	children: ReactNode
}

export function Slider({ children }: ISlideProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false })

	const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

	return (
		<div className={styles.trainersCards}>
			<div className={styles.embla}>
				<div className={styles.emblaViewport} ref={emblaRef}>
					{children}
					<div className={styles.emblaButtons}>
						<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
						<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
					</div>
				</div>
			</div>
		</div>
	)
}
