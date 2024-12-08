'use client'
import { CardContainer } from '@/components/exerciseMachinesComponents/cards/cardContainer'
import { ExerciseMachinesEdit } from '@/components/exerciseMachinesComponents/edit/exerciseMachinesEdit'
import { ExerciseMachinesSearch } from '@/components/exerciseMachinesComponents/search/exerciseMachinesSearch'
import { ExerciseMachinesReport } from '@/components/reports/exerciseMachinesReport'
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
			<CardContainer
				input={inputValue}
				checkbox={isChecked}
				exerciseMachines={exerciseMachines}
				isDataLoading={isLoading}
			/>
			{!isLoading && Cookies.get('role') === 'admin' && (
				<ExerciseMachinesEdit exerciseMachines={exerciseMachines} setExerciseMachines={setExerciseMachines} />
			)}
			{!isLoading && <ExerciseMachinesReport exerciseMachines={exerciseMachines} />}
		</>
	)
}
