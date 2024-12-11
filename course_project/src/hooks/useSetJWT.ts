import setJWTFromCookies from '@/utils/setJWTFromCookies'
import { useEffect } from 'react'

export function useSetJWT() {
	useEffect(() => {
		setJWTFromCookies()
	}, [])
}
