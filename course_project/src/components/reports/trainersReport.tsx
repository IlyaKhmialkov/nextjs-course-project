import Excel from 'exceljs'
import { saveAs } from 'file-saver'
import { jsPDF } from 'jspdf'
import styles from './reports.module.scss'

interface ITrainersReportProps {
	trainers: ITrainer[]
}

export function TrainersReport({ trainers }: ITrainersReportProps) {
	async function excelDownloadHandler() {
		const workbook = new Excel.Workbook()
		const worksheet = workbook.addWorksheet('Exercise Machines')

		worksheet.columns = [
			{ header: 'id', key: 'id', width: 4 },
			{ header: 'name', key: 'name', width: 30 },
			{ header: 'email', key: 'email', width: 30 },
			{ header: 'age', key: 'age', width: 4 },
			{ header: 'gender', key: 'gender', width: 10 },
			{ header: 'experience', key: 'experience', width: 10 },
			{ header: 'price', key: 'price', width: 10 },
		]
		trainers.forEach(trainer => {
			worksheet.addRow({
				id: trainer.id,
				name: trainer.name,
				email: trainer.email,
				age: trainer.age,
				gender: trainer.gender,
				experience: trainer.experience,
				price: trainer.price + '$/h',
			})
		})

		const buffer = await workbook.xlsx.writeBuffer()
		saveAs(new Blob([buffer]), 'trainers.xlsx')
	}

	function pdfDownloadHandler() {
		const doc = new jsPDF()
		const pageWidth = doc.internal.pageSize.getWidth()
		const margin = 20

		const drawHeader = (doc: jsPDF, page: any) => {
			doc.setFontSize(18)
			doc.setTextColor(40, 40, 40)
			doc.text('Trainers Report', pageWidth / 2, 15, { align: 'center' })
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

		trainers.forEach((trainer, index) => {
			if (index !== 0) {
				doc.addPage()
			}

			drawHeader(doc, index + 1)
			doc.setTextColor(30, 30, 30)

			doc.setFontSize(20)
			doc.text(`${trainer.name}`, pageWidth / 2, 32, { align: 'center' })

			doc.setFontSize(14)
			doc.text(`ID: ${trainer.id}`, margin, 44)
			doc.text(`Email: ${trainer.email}`, margin, 50)
			doc.text(`Age: ${trainer.age}`, margin, 56)
			doc.text(`Gender: ${trainer.gender}`, margin, 62)
			doc.text(`Experience: ${trainer.experience}`, margin, 68)
			doc.text(`Price: ${trainer.price}$ / hour`, margin, 74)

			if (trainer.picture) {
				const img = new Image()
				img.src = `http://localhost:4200/${trainer.picture}`
				doc.addImage(img, 'PNG', margin, 100, pageWidth - 2 * margin, pageWidth - 2 * margin)
			}
			drawFooter(doc)
		})

		doc.save('trainers.pdf')
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
