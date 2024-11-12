import { FormEvent } from 'react'
import axios from './axiosConfig'

export async function authSubmitHandler(e: FormEvent<HTMLFormElement>) {
	e.preventDefault()

	const formData = new FormData(e.currentTarget)
	const email = formData.get('email')
	const password = formData.get('password')

	const response = await axios.post<string | null>('/auth/login', {
		email: email,
		password: password,
	})

	if (response.status === 200) {
		if (response.data) {
			return JSON.stringify(response.data)
		}
		return '{"error":"Email or password incorrect"}'
	}
	return '{"error":"Internal server error"}'
}
