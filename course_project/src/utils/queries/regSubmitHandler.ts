import { FormEvent } from 'react'
import axios from './../axiosConfig'
import { authSubmitHandler } from './../queries/authSubmitHandler'

export async function regSubmitHandler(e: FormEvent<HTMLFormElement>) {
	e.preventDefault()
	const currentTarget = e.currentTarget

	const formData = new FormData(e.currentTarget)
	const email = formData.get('email')
	const name = formData.get('name')
	const age = parseInt(formData.get('age') as string, 10)
	const gender = formData.get('gender')
	const password = formData.get('password')

	const response = await axios.post<string | null>('/clients/create', {
		data: {
			email: email,
			name: name,
			age: age,
			gender: gender,
		},
		password: password,
	})

	if (response.status === 201) {
		if (response.data) {
			return await authSubmitHandler({ e: e, currentTarget: currentTarget })
		}
		return '{"error":"Email alreagy registred"}'
	}
	return '{"error":"Internal server error"}'
}
