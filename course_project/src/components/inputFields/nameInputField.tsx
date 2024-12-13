import { FaPerson } from 'react-icons/fa6'
import styles from './inputField.module.scss'

interface INameInputProps {
	id?: string
	noIcon?: boolean
}

export function NameInputField({ id, noIcon }: INameInputProps) {
	const inputId = id ? `name-${id}` : 'name'
	return (
		<div className={styles.inputDiv}>
			{noIcon ? (
				<>
					<label htmlFor={inputId}></label>
					<input
						className={styles.simple}
						type='text'
						id={inputId}
						name={inputId}
						placeholder='enter name'
						autoComplete='off'
						required
					/>
				</>
			) : (
				<>
					<label htmlFor={inputId}>
						<div className={styles.iconDiv}>
							<FaPerson size={20} />
						</div>
					</label>
					<input type='text' id={inputId} name={inputId} placeholder='enter your name' autoComplete='on' required />
				</>
			)}
		</div>
	)
}
