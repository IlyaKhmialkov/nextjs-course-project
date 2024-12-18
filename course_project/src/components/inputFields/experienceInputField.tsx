import styles from './inputField.module.scss'

interface IExperienceInputProps {
	defVal?: number
}

export function ExperienceInputField({ defVal }: IExperienceInputProps) {
	let inputProps = {
		className: styles.simple,
		type: 'number',
		id: 'exp',
		name: 'exp',
		placeholder: 'enter your experience',
		autoComplete: 'off',
		required: true,
		defaultValue: '',
	}

	if (defVal) {
		inputProps.defaultValue = defVal.toString()
	}
	return (
		<div className={styles.inputDiv}>
			<label htmlFor='exp'></label>
			<input {...inputProps} />
		</div>
	)
}
