import axios from '../axiosConfig'

export async function ChangePasswordHandler(email: string, newPassword: string) {
	const response = await axios.post<string | null>('/auth/change-password', {
		email: email,
		newPassword: newPassword,
	})

	if (response.status === 201) {
		return response.data
	}
	return '{"error":"Internal server error"}'
}
