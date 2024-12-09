import Excel from 'exceljs'
import { saveAs } from 'file-saver'
import { jsPDF } from 'jspdf'
import styles from './reports.module.scss'

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
			{ header: 'description', key: 'description', width: 150 },
		]

		exerciseMachines.forEach(machine => {
			worksheet.addRow({
				id: machine.id,
				name: machine.name,
				amount: machine.amount,
				description: machine.description,
			})
		})

		const buffer = await workbook.xlsx.writeBuffer()
		saveAs(new Blob([buffer]), 'exercise_machines.xlsx')
	}

	function pdfDownloadHandler() {
		const doc = new jsPDF()
		const pageWidth = doc.internal.pageSize.getWidth()
		const margin = 20

		const drawHeader = (doc: jsPDF, page: any) => {
			doc.setFontSize(18)
			doc.setTextColor(40, 40, 40)
			doc.text('Exercise Machines Report', pageWidth / 2, 15, { align: 'center' })
			doc.setFontSize(12)
			doc.setTextColor(100)
			doc.text(`Page ${page}`, pageWidth - margin, 15, { align: 'right' })
			doc.setDrawColor(200)
			doc.line(margin, 20, pageWidth - margin, 20)
		}
		const drawFooter = (doc: jsPDF) => {
			const currentDate = new Date().toLocaleDateString()
			doc.setFontSize(10)
			doc.setTextColor(150)
			doc.text(`Generated on: ${currentDate}`, margin, doc.internal.pageSize.getHeight() - 10)
		}

		exerciseMachines.forEach((machine, index) => {
			if (index !== 0) {
				doc.addPage()
			}

			drawHeader(doc, index + 1)
			doc.setTextColor(30, 30, 30)

			doc.setFontSize(20)
			doc.text(`${machine.name}`, pageWidth / 2, 32, { align: 'center' })

			doc.setFontSize(14)
			doc.text(`ID: ${machine.id}`, margin, 44)
			doc.text(`Amount: ${machine.amount}`, margin, 54)

			const splitDescription = doc.splitTextToSize(machine.description, pageWidth - 2 * margin)
			doc.text(splitDescription, margin, 64)

			if (machine.picture) {
				const img = new Image()
				img.src = `http://localhost:4200/${machine.picture}`
				doc.addImage(img, 'PNG', margin, 100, pageWidth - 2 * margin, pageWidth - 2 * margin)
			}
			drawFooter(doc)
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
