'use client'
import { CardContainer } from '@/components/cards/cardContainer'
import { ExerciseMachinesSearch } from '@/components/exerciseMachinesSearch/exerciseMachinesSearch'
import { Footer } from '@/components/footer/footer'
import { Header } from '@/components/header/header'
import { useState } from 'react'
import styles from './exerciseMachines.module.scss'

export function ExerciseMachines() {
	const [inputValue, setInputValue] = useState('')
	const [isChecked, setChecked] = useState(false)

	return (
		<>
			<Header />
			<main className={styles.main}>
				<div className={styles.bgImageDiv}>
					<h1>Our exercise machines</h1>
				</div>
				<ExerciseMachinesSearch setInputValue={setInputValue} setChecked={setChecked} />
				<CardContainer input={inputValue} checkbox={isChecked} />
			</main>
			<Footer />
		</>
	)
}
