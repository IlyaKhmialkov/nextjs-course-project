'use client'
import { createColumnHelper } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { Table } from './table'
import styles from './table.module.scss'

interface IProgramsTableProps {
	programs: ITrainingProgram[]
}

interface IDisplayedProgram {
	id: string
	name: string
	time: string
	dayOfWeek: string
}

const columnHelper = createColumnHelper<IDisplayedProgram>()
const columns = [
	columnHelper.accessor('id', {
		header: () => 'ID',
	}),
	columnHelper.accessor('name', {
		header: () => 'Name',
	}),
	columnHelper.accessor('time', {
		header: () => 'Time',
	}),
	columnHelper.accessor('dayOfWeek', {
		header: () => 'Day of week',
	}),
]

function convertTableData(programs: ITrainingProgram[]) {
	const displayedAprograms: IDisplayedProgram[] = []
	programs.forEach(program => {
		displayedAprograms.push({
			id: program.id.toString(),
			name: program.name,
			time: program.time.split('T')[1].slice(0, 5),
			dayOfWeek: program.dayOfWeek.toString(),
		})
	})
	return displayedAprograms
}

export function ProgramsTable({ programs }: IProgramsTableProps) {
	const [data, setData] = useState<IDisplayedProgram[]>(convertTableData(programs))

	useEffect(() => {
		setData(convertTableData(programs))
	}, [programs])

	return (
		<div className={styles.programs}>
			<Table data={data} columns={columns} />
		</div>
	)
}
