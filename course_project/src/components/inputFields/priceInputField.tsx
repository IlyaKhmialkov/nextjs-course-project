import styles from './inputField.module.scss'

interface IPriceInputProps {
	defVal?: number
}

export function PriceInputField({ defVal }: IPriceInputProps) {
	let inputProps = {
		className: styles.simple,
		type: 'number',
		id: 'price',
		name: 'price',
		placeholder: 'enter your price',
		autoComplete: 'off',
		required: true,
		defaultValue: '',
	}

	if (defVal) {
		inputProps.defaultValue = defVal.toString()
	}
	return (
		<div className={styles.inputDiv}>
			<label htmlFor='price'></label>
			<input {...inputProps} />
		</div>
	)
}
