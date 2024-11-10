import { Dispatch, KeyboardEvent, SetStateAction, useRef } from 'react'
import { CheckBox } from '../inputFields/checkBox'
import { InputField } from '../inputFields/inputField'
import styles from './exerciseMachinesSearch.module.scss'

interface IExerciseMachinesSearchProps {
	setInputValue: Dispatch<SetStateAction<string>>
	setChecked: Dispatch<SetStateAction<boolean>>
}

export function ExerciseMachinesSearch({ setInputValue, setChecked }: IExerciseMachinesSearchProps) {
	const input = useRef<HTMLInputElement>(null)
	const checkbox = useRef<HTMLInputElement>(null)

	const checkboxHandler = () => {
		checkbox.current && checkbox.current.checked ? setChecked(true) : setChecked(false)
	}
	const inputButtonHandler = () => {
		if (input.current && input.current.value) {
			input.current.value = input.current.value.trim()
			setInputValue(input.current.value)
		} else {
			setInputValue('')
		}
	}
	const inputHandler = () => {
		if (input.current && !input.current.value) {
			setInputValue('')
		}
	}
	const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			if (input.current && input.current.value) {
				input.current.value = input.current.value.trim()
				setInputValue(input.current.value)
			} else {
				setInputValue('')
			}
		}
	}
	return (
		<div className={styles.inputDiv}>
			<InputField currentRef={input} onClick={inputButtonHandler} onChange={inputHandler} onKeyDown={keyPressHandler} />
			<CheckBox currentRef={checkbox} onChange={checkboxHandler} />
		</div>
	)
}
