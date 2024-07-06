import React from 'react'
import styles from "./page.module.css";

// Components
import { ProfileSteps } from '@/components/ProcessSteps/ProcessSteps';

const InVerificationStage = () => {
  return (
    <>
        <ProfileSteps currentStep={4} />

        <main className={styles.verification__main}>

            <h3>Completed Profile</h3>
            <p>We appreciate for your patience.</p>

            <div className={styles.verification__center}>
                <span>⌛</span>
                <p>We Thank you for your willingness to join Hairrty Salons. And taking your time to complete your profile. Our team will be verifing your profile and documents provided and will get back to you within 24-48 hours via your Email address (or) Contact Number provided.</p>
                <p>Once your profile gets verified salon owner can login using <b>Hairrty Salon Mobile Application</b> and start their journey.</p>
                <p>Thanks, Hairrty Salons.</p>
            </div>

        </main>
    </>
  )
}

export default InVerificationStage;