'use client'
import Cookies from 'js-cookie'

export function removeCookies() {
	Cookies.remove('token')
	Cookies.remove('role')
	Cookies.remove('id')
}
