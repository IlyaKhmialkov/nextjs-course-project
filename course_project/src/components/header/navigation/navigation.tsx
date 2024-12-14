'use client'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FaBurger } from 'react-icons/fa6'
import styles from './navigation.module.scss'

export function Navigation() {
	const [isRole, setIsRole] = useState(true)
	const [isClient, setIsClient] = useState(false)
	const role = Cookies.get('role')
	const linkList = useRef<HTMLUListElement>(null)

	useEffect(() => {
		setIsRole(!!role)
		setIsClient(role === 'client')
	}, [role])

	const burgerHandler = () => {
		if (linkList && linkList.current) {
			if (linkList.current.classList.contains(`${styles.active}`)) {
				linkList.current.classList.remove(`${styles.active}`)
			} else {
				linkList.current.classList.add(`${styles.active}`)
			}
		}
	}

	return (
		<nav>
			<button className={styles.burgerButton} onClick={burgerHandler}>
				<FaBurger size={70} />
			</button>
			<ul ref={linkList} className={styles.linksList}>
				<li>
					{isRole ? (
						isClient ? (
							<Link href={'/client'} className={styles.navLink}>
								profile
							</Link>
						) : (
							<Link href={'/trainer'} className={styles.navLink}>
								profile
							</Link>
						)
					) : (
						<Link href={'/auth'} className={styles.navLink}>
							log in
						</Link>
					)}
				</li>
				<li>
					<Link href={'/exerciseMachines'} className={styles.navLink}>
						exercise machines
					</Link>
				</li>
				<li>
					<Link href={'/subscriptions'} className={styles.navLink}>
						subscriptions
					</Link>
				</li>
				<li>
					<Link href={'/trainers'} className={styles.navLink}>
						trainers
					</Link>
				</li>
				<li>
					<Link href={'/trainingPrograms'} className={styles.navLink}>
						training programs
					</Link>
				</li>
				<li>
					<Link href={'/attendance'} className={styles.navLink}>
						attendance
					</Link>
				</li>
			</ul>
		</nav>
	)
}
