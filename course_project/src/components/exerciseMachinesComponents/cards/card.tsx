import styles from './card.module.scss'

export function Card(props: { exerciseMachine?: IExerciseMachine }) {
	if (!props.exerciseMachine) {
		return <div className={styles.card}></div>
	}
	const { name, picture, description } = props.exerciseMachine

	return (
		<div className={styles.card}>
			<h3>{name}</h3>
			<div className={styles.imgDiv}>
				<img src={`http://localhost:4200/${picture}`} alt='picture of exercise machine' />
			</div>
			<p>{description}</p>
		</div>
	)
}
