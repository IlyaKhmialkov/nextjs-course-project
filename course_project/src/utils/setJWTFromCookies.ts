import Cookies from 'js-cookie'
import { setAuthHeader } from './axiosConfig'

export default function setJWTFromCookies() {
	const token = Cookies.get('token')
	if (token) {
		setAuthHeader(token)
	}
}
