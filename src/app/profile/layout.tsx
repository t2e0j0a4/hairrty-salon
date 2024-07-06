import React from 'react'
import styles from "./layout.module.css";

// Components
import Navbar from '@/components/Navbar/Navbar';

const ProfileLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
        <Navbar pageName="profile" />

        <main className={styles.app__profile}>
            <div className={styles.profile__center}>
                <h2>Add Salon Profile</h2>
                {children}
            </div>
        </main>
    </>
  )
}

export default ProfileLayout;