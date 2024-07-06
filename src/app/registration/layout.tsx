import React from 'react'
import styles from "./layout.module.css";

// Components
import Navbar from '@/components/Navbar/Navbar';

const RegistrationLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
        <Navbar pageName="register" />

        <main className={styles.app__registration}>
            <div className={styles.registration__center}>
                <h2>Salon Registration</h2>
                {children}
            </div>
        </main>
    </>
  )
}

export default RegistrationLayout;