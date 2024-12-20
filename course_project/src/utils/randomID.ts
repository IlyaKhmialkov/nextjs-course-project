'use client'
import { connection } from 'next/server'

export async function randomID() {
	await connection()
	let result = ''
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const charactersLength = characters.length

	for (let i = 0; i < 8; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}

	return result
}
