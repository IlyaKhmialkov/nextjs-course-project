import { RefObject } from 'react'
import styles from './inputField.module.scss'

interface IInputProps {
	currentRef: RefObject<HTMLInputElement>
	onChange: () => void
}

export function CheckBox({ currentRef, onChange }: IInputProps) {
	return (
		<div className={styles.checkboxDiv}>
			<label>
				<input ref={currentRef} type='checkbox' id='myCheckbox' name='myCheckbox' onChange={onChange} />
				<p>search muscle groups</p>
			</label>
		</div>
	)
}
