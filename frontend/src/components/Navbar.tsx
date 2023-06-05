import Link, { LinkProps } from "next/link"
import { ReactNode } from "react"
import styles from '@/styles/Navbar.module.scss'
import { logout } from "@/api/auth"
import AuthGuard from "./AuthGuard"

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.navGroup}>
                <NavItem href="/">HOME</NavItem>
                <NavItem href="/search">SEARCH</NavItem>
            </div>
            <div className={styles.navGroup}>
                <AuthGuard alt={<NavItem href="/login">LOG IN</NavItem>}>
                    <NavItem href="/friends">
                        FRIENDS
                    </NavItem>
                    <NavItem href="/users/0">
                        PROFILE
                    </NavItem>
                    <NavItem href="/login" onClick={() => logout()}>
                        LOG OUT
                    </NavItem>
                </AuthGuard>
            </div>
        </div>
    )
}

function NavItem(props: NavItemProps) {
    return (
        <Link className={styles.navLink} {...props}>
            {props.children}
        </Link>
    )
}

interface NavItemProps extends LinkProps {
    children: ReactNode
}