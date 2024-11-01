'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { FaBurger } from 'react-icons/fa6'
import styles from './navigation.module.scss'

export function Navigation() {
	const linkList = useRef<HTMLUListElement>(null)

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
					<Link href={'/exerciseMachines'} className={styles.navLink}>
						exerciseMachines
					</Link>
				</li>
				<li>
					<Link href={'/exerciseMachines'} className={styles.navLink}>
						subscriptions
					</Link>
				</li>
				<li>
					<Link href={'/exerciseMachines'} className={styles.navLink}>
						trainers
					</Link>
				</li>
				<li>
					<Link href={'/exerciseMachines'} className={styles.navLink}>
						training programs
					</Link>
				</li>
				<li>
					<Link href={'/exerciseMachines'} className={styles.navLink}>
						attendance
					</Link>
				</li>
			</ul>
		</nav>
	)
}