import styles from './inputField.module.scss'

interface ISimpleInputProps {
	id?: string
	defVal?: string
}

export function SimpleInputField({ id, defVal }: ISimpleInputProps) {
	const inputId = id ? `simple-${id}` : 'simple'

	let inputProps = {
		className: styles.simple,
		type: 'text',
		id: inputId,
		name: inputId,
		autoComplete: 'off',
		required: true,
		defaultValue: '',
	}

	if (defVal) {
		inputProps.defaultValue = defVal
	}
	return (
		<div className={styles.inputDiv}>
			<label htmlFor={inputId}></label>
			<input {...inputProps} />
		</div>
	)
}
