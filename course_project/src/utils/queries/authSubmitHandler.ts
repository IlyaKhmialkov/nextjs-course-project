import { FormEvent } from 'react'
import axios from '../axiosConfig'

interface IAuthSubmitHandlerProps {
	e: FormEvent<HTMLFormElement>
	currentTarget?: EventTarget & HTMLFormElement
}

export async function authSubmitHandler({ e, currentTarget }: IAuthSubmitHandlerProps) {
	currentTarget ? '' : e.preventDefault()

	const formData = currentTarget ? new FormData(currentTarget) : new FormData(e.currentTarget)
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
