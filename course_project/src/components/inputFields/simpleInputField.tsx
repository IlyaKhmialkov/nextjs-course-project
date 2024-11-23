import styles from './inputField.module.scss'

interface IEmailInputProps {
	id?: string
}

export function SimpleInputField({ id }: IEmailInputProps) {
	const inputId = id ? `simple-${id}` : 'simple'
	return (
		<div className={styles.inputDiv}>
			<label htmlFor={inputId}></label>
			<input className={styles.simple} type='text' id={inputId} name={inputId} autoComplete='off' required />
		</div>
	)
}
