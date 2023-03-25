import Link from "next/link"
import { ReactNode } from "react"
import styles from '@/styles/Navbar.module.scss'

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <NavItem href="/search">SEARCH</NavItem>
            <NavItem href="/typing-test">TYPING</NavItem>
        </div>
    )
}

export function NavItem({ href, children }: NavItemProps) {
    return (
        <Link href={href} className={styles.navLink}>
            {children}
        </Link>
    )
}

interface NavItemProps {
    href: string
    children: ReactNode
}