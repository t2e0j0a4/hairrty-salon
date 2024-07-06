'use client';
import React, { useState } from 'react';
import styles from "./page.module.css";

// Components
import FormInput from '@/components/FormInput/FormInput';

// Actions
import { detailsRegistration } from "@/lib/actions/authentication";

// Utils
import createToast from '@/utils/createToast';

const SalonRegistration = () => {

  const [formSubmitLoad, setFormSubmitLoad] = useState(false);

  return (
    <>
      
      <form className={styles.main__form} onSubmit={async (e) => {
        e.preventDefault();
        setFormSubmitLoad(true);
        const toastId = createToast('loading', 'Submitting your details...');
        try {

          const formData = new FormData(e.currentTarget);
          const response = await detailsRegistration(formData);
          (response === undefined) ? createToast('success', 'Registration Success! Please login now.', toastId) : createToast('error', response.message, toastId);
          
        } catch (error) {
          createToast('error', 'Issues submitting your details.', toastId);
        } finally {
          setFormSubmitLoad(false);
        }
      }}>

        <h3>Fill Details</h3>
        <p>Details are required to know about your salon.</p>

        {/* Salon */}

        <FormInput labelId='salonName' label='Salon Name' fieldType='text' placeholder='Enter Salon Name' fieldTitle='Provide a valid salon name.' fieldName='name' required={true} />
        <FormInput labelId='salonRegisteredName' label='Salon Registration Name' fieldType='text' placeholder='Enter Salon Registration Name' fieldTitle='Provide a valid salon registration name.' fieldName='registeredName' required={true} />
        <FormInput labelId='salonPhoneName' label='Salon Contact Name' fieldType='text' placeholder='Enter Salon Contact Number' labelMsg='Start with +91 or 040' fieldTitle='Provide a valid salon contact number. Start with +91 (or) 040' fieldName='phoneNumber' required={true} pattern='^(?:\+91\d{10}|040\d{8})$' />
        <FormInput labelId='salonEmailId' label='Salon Email Address' fieldType='email' placeholder='Enter Salon Email Address' fieldTitle='Provide a valid salon email address.' fieldName='email' required={true} pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' />
        <FormInput labelId='salonPassword' label='Password' fieldType='password' placeholder='Create your Password' fieldTitle='Create your password' fieldName='password' required={true} />

        {/* Owner */}

        <FormInput labelId='ownerName' label='Owner Name' fieldType='text' placeholder='Enter Owner Name' fieldTitle='Provide a valid owner name.' fieldName='fullName' required={true} />
        <FormInput labelId='ownerPhoneName' label='Owner Contact Name' fieldType='text' placeholder='Enter Owner Contact Number' fieldTitle='Provide a valid owner contact number. Start with +91' fieldName='ownerPhoneName' required={true} pattern='^\+91\d{10}$' labelMsg='Start with +91' />
        <FormInput labelId='ownerEmailId' label='Owner Email Address' fieldType='email' placeholder='Enter Owner Email Address' fieldTitle='Provide a valid owner email address.' fieldName='ownerEmail' required={true} pattern='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' />

        {/* Address */}

        <FormInput labelId='streetAddress' label='Street Address' fieldType='text' placeholder='Enter Salon Address' fieldTitle='Provide a valid salon address.' fieldName='areaAddress' required={true} />
        <FormInput labelId='pincode' label='Pincode' fieldType='text' placeholder='Enter Salon Pincode' fieldTitle='Provide a valid salon pincode. (Digits only allowed)' fieldName='pincode' required={true} pattern="^\d+$" />

        {/* Submit Button */}

        <button disabled={formSubmitLoad ? true : false} aria-disabled={formSubmitLoad} type='submit' title='Register Now' aria-label='Register Now'>Register Now</button>

      </form>

    </>
  )
}

export default SalonRegistration;