import React from 'react';
import styles from "./page.module.css";

// Components
import Navbar from '@/components/Navbar/Navbar';
import Link from 'next/link';

const HomePage = () => {
  return (
    <>

      <Navbar pageName='home' />

      <main className={styles.home__main}>
        <div className={styles.main__center}>

          <h2>Hairrty Salon Registration</h2>

          <section className={styles.home__options}>

            <div className={styles.option}>
              <h3>Salon Registration</h3>
              <p>1. Fill in details about salon and owner.</p>
              <p>2. Upload all documents related to salon.</p>
              <p className={styles.last}>3. Select catergories that are provided by your salon.</p>
              <Link href="/registration" >Register</Link>
            </div>

            <div className={styles.option}>
              <h3>Salon Login</h3>
              <p>1. No need to register if you have already filled details about you & salon.</p>
              <p className={styles.last}>2. Upload documents & Select categories & sub categories selected.</p>
              <Link href="/login" >Login</Link>
            </div>

          </section>

        </div>
      </main>

    </>
  )
}

export default HomePage;