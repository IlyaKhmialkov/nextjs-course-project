'use client'
import { createColumnHelper } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { Table } from './table'

interface IAttendencesTableProps {
	attendances: IAttendance[]
}

interface IDisplayedAttendence {
	id: string
	date: string
	time: string
}

const columnHelper = createColumnHelper<IDisplayedAttendence>()
const columns = [
	columnHelper.accessor('id', {
		header: () => 'ID',
	}),
	columnHelper.accessor('date', {
		header: () => 'Date of visit',
	}),
	columnHelper.accessor('time', {
		header: () => 'Time of visit',
	}),
]

function convertTableData(attendances: IAttendance[]) {
	const displayedAattendances: IDisplayedAttendence[] = []
	attendances.forEach(att => {
		const [datePart, timePart] = att.date.split('T')
		displayedAattendances.push({ id: att.id.toString(), date: datePart, time: timePart.slice(0, 5) })
	})
	return displayedAattendances
}

export function AttendencesTable({ attendances }: IAttendencesTableProps) {
	const [data, setData] = useState<IDisplayedAttendence[]>(convertTableData(attendances))

	useEffect(() => {
		setData(convertTableData(attendances))
	}, [attendances])

	return <Table data={data} columns={columns} />
}
