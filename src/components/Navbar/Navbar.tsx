'use client';
import Link from 'next/link';
import React, {useState} from 'react';
import styles from "./Navbar.module.css";

// Actions
import { logoutUser } from '@/lib/actions/authentication';

const Navbar = ({pageName}: {pageName: 'register' | 'profile' | 'login' | 'home'}) => {

    const [loggingOut, setLoggingOut] = useState(false);

  return (
    <nav className={styles.app__navbar}>
        <div className={styles.navbar__center}>
            <h1>Hairrty</h1>
            <div className={styles.navbar__cta}>
                {
                    pageName === 'register' ? (
                        <Link href="/login">Login</Link>
                    ) : pageName === 'profile' ? (
                        <button onClick={() => {
                            setLoggingOut(true);
                            logoutUser();
                        }} disabled={loggingOut} type='button' title='Logout' aria-label='Logout'>Logout</button>
                    ) : pageName === 'login' ? (
                        <Link href="/registration">New Registration</Link>
                    ) : (
                        <div className={styles.more__options}>
                            <Link href="/registration">Register</Link>
                            <Link href="/login">Login</Link>
                        </div>
                    )
                }
            </div>
        </div>
    </nav>
  )
}

export default Navbar;