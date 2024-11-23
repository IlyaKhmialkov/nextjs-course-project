'use client'
import { CardContainer } from '@/components/exerciseMachinesComponents/cards/cardContainer'
import { ExerciseMachinesEdit } from '@/components/exerciseMachinesComponents/edit/exerciseMachinesEdit'
import { ExerciseMachinesReport } from '@/components/exerciseMachinesComponents/report/exerciseMachinesReport'
import { ExerciseMachinesSearch } from '@/components/exerciseMachinesComponents/search/exerciseMachinesSearch'
import { useExerciseMachines } from '@/hooks/exerciseMachines/useExerciseMachines'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export function ExerciseMachines() {
	const [exerciseMachines, setExerciseMachines] = useState<IExerciseMachine[]>([])
	const { data, isLoading } = useExerciseMachines()
	const [inputValue, setInputValue] = useState('')
	const [isChecked, setChecked] = useState(false)

	useEffect(() => {
		if (!isLoading && data) {
			setExerciseMachines(data)
		}
	}, [data, isLoading])

	return (
		<>
			<ExerciseMachinesSearch setInputValue={setInputValue} setChecked={setChecked} />
			{isLoading ? (
				<CardContainer input={inputValue} checkbox={isChecked} exerciseMachines={data} isDataLoading={isLoading} />
			) : (
				<CardContainer input={inputValue} checkbox={isChecked} exerciseMachines={data} isDataLoading={isLoading} />
			)}
			{!isLoading && Cookies.get('role') === 'admin' && (
				<ExerciseMachinesEdit exerciseMachines={exerciseMachines} setExerciseMachines={setExerciseMachines} />
			)}
			{!isLoading && <ExerciseMachinesReport exerciseMachines={exerciseMachines} />}
		</>
	)
}
