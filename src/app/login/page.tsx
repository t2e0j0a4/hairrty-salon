'use client';
import React, { useState } from 'react'
import styles from "./page.module.css";

// Components
import Navbar from '@/components/Navbar/Navbar';
import FormInput from '@/components/FormInput/FormInput';

// Utils
import createToast from '@/utils/createToast';

// Actions
import { detailsLogin } from '@/lib/actions/authentication';

const Login = () => {

  const [formSubmitLoad, setFormSubmitLoad] = useState(false);

  return (
    <>
      <Navbar pageName="login" />

      <main className={styles.app__login}>
          <div className={styles.login__center}>
              <h2>Salon Login</h2>

              <form className={styles.main__form} onSubmit={async (e) => {
                e.preventDefault();
                setFormSubmitLoad(true);
                const toastId = createToast('loading', 'Verifying your details...');
                try {
        
                  const formData = new FormData(e.currentTarget);
                  const response = await detailsLogin(formData);
                  (response === undefined) ? createToast('success', 'Login Successfull.', toastId) : createToast('error', response.message, toastId)
                  
                } catch (error) {
                  createToast('error', 'Issues logging your in.', toastId);
                } finally {
                  setFormSubmitLoad(false);
                }
              }}>

                  <h3>Fill your Details</h3>
                  <p>Details are required to verify its you.</p>

                  <FormInput labelId='emailId' label='Email Address' fieldType='email' placeholder='Enter Email Address' fieldTitle='Provide a valid email address.' fieldName='email' required={true} pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' />
                  <FormInput labelId='password' label='Password' fieldType='password' placeholder='Enter Password' fieldTitle='Create your password' fieldName='password' required={true} />

                  {/* Submit Button */}

                  <button disabled={formSubmitLoad} aria-disabled={formSubmitLoad} type='submit' title='Login Now' aria-label='Login Now'>Login</button>

              </form>
          </div>
      </main>
    </>
  )
}

export default Login;