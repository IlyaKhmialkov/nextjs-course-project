import Excel from 'exceljs'
import { saveAs } from 'file-saver'
import { jsPDF } from 'jspdf'
import styles from './exerciseMachinesReport.module.scss'

interface IExerciseMachinesReportProps {
	exerciseMachines: IExerciseMachine[]
}

export function ExerciseMachinesReport({ exerciseMachines }: IExerciseMachinesReportProps) {
	async function excelDownloadHandler() {
		const workbook = new Excel.Workbook()
		const worksheet = workbook.addWorksheet('Exercise Machines')

		worksheet.columns = [
			{ header: 'id', key: 'id', width: 4 },
			{ header: 'name', key: 'name', width: 20 },
			{ header: 'amount', key: 'amount', width: 8 },
			{ header: 'description', key: 'description', width: 80 },
			{ header: 'picture_link', key: 'picture_link', width: 70 },
		]

		exerciseMachines.forEach(machine => {
			worksheet.addRow({
				id: machine.id,
				name: machine.name,
				amount: machine.amount,
				description: machine.description,
				picture_link: machine.pictureLink,
			})
		})

		const buffer = await workbook.xlsx.writeBuffer()
		saveAs(new Blob([buffer]), 'exercise_machines.xlsx')
	}

	function pdfDownloadHandler() {
		const doc = new jsPDF()

		const firstId = exerciseMachines[0].id
		exerciseMachines.forEach(machine => {
			if (machine.id !== firstId) {
				doc.addPage()
			}
			doc.text('id: ' + machine.id, 20, 20)
			doc.text('name: ' + machine.name, 20, 30)
			doc.text('amount: ' + machine.amount, 20, 40)
			doc.text('picture link: ', 20, 50)
			doc.setFontSize(14)
			doc.text(machine.pictureLink, 20, 60)

			doc.setFontSize(16)
			doc.text('description: ', 20, 70)
			doc.setFontSize(14)
			const splitDescription = doc.splitTextToSize(machine.description, 180)
			doc.text(splitDescription, 20, 80)
			doc.setFontSize(16)
		})

		doc.save('exercise_machines.pdf')
	}

	return (
		<div className={styles.reportsDiv}>
			<h2>Export report</h2>
			<div>
				<button onClick={excelDownloadHandler}>Excel</button>
				<button onClick={pdfDownloadHandler}>Pdf</button>
			</div>
		</div>
	)
}
