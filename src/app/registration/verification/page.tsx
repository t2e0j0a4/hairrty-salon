import React from 'react'
import styles from "./page.module.css";

// Components
import FormInput from '@/components/FormInput/FormInput'
import { RegistrationSteps } from '@/components/ProcessSteps/ProcessSteps'

const VerifyOTPMain = () => {
  return (
    <>
        <RegistrationSteps currentStep={2} />

        <form className={styles.main__form}>
          <h3>OTP Verification!</h3>
          <p>OTP has been sent to Owner Contact Number.</p>

          <FormInput labelId='otp' label='Enter OTP' fieldType='text' placeholder='Enter OTP' fieldTitle='Provide a valid OTP' fieldName='otp' required={true} pattern="^\d{6}$" />
          <div className={styles.options}>
            <button type='button' title='Resend OTP' aria-label='Resend OTP'>Resend OTP</button>
          </div>

          <button type='submit' title='Verify OTP' aria-label='Verify OTP'>Verify OTP</button>

        </form>
    </>
  )
}

export default VerifyOTPMain