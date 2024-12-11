'use client'
import { CardContainer } from '@/components/exerciseMachinesComponents/cards/cardContainer'
import { ExerciseMachinesEdit } from '@/components/exerciseMachinesComponents/edit/exerciseMachinesEdit'
import { ExerciseMachinesSearch } from '@/components/exerciseMachinesComponents/search/exerciseMachinesSearch'
import { ExerciseMachinesReport } from '@/components/reports/exerciseMachinesReport'
import { useExerciseMachines } from '@/hooks/queryHooks/exerciseMachines/useExerciseMachines'
import Cookies from 'js-cookie'
import { useState } from 'react'

export function ExerciseMachines() {
	const { data, isLoading } = useExerciseMachines()
	const [inputValue, setInputValue] = useState('')
	const [isChecked, setChecked] = useState(false)

	return (
		<>
			<ExerciseMachinesSearch setInputValue={setInputValue} setChecked={setChecked} />
			<CardContainer input={inputValue} checkbox={isChecked} exerciseMachines={data} isDataLoading={isLoading} />
			{!isLoading && data && Cookies.get('role') === 'admin' && <ExerciseMachinesEdit exerciseMachines={data} />}
			{!isLoading && data && <ExerciseMachinesReport exerciseMachines={data} />}
		</>
	)
}
