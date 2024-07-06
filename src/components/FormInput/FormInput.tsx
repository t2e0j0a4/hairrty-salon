'use client';
import React, {useState} from "react";
import styles from "./FormInput.module.css";

// React Icons
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const FormInput = ({labelId, label, fieldType, placeholder, fieldTitle, fieldName, defaultVal, labelMsg, required = false, pattern = undefined}: {
    labelId: string,
    label: string,
    fieldType: 'password' | 'text' | 'email' | 'time',
    placeholder: string,
    fieldTitle: string,
    fieldName: string,
    labelMsg?: string,
    required?: boolean,
    pattern?: string | undefined,
    defaultVal?: string
  }) => {
  
    const [showPassword, setShowPassword] = useState(false);
  
    return (
      <div className={styles.main__input}>
        <label htmlFor={labelId}>{label}{labelMsg && <span>({labelMsg})</span>}</label>
        {
          fieldType === "password" ? (
            <div className={styles.password__box}>
              <input required={required} aria-required={required} type={showPassword ? 'text' : 'password'} id={labelId} placeholder={placeholder} title={fieldTitle} aria-label={fieldTitle} name={fieldName} pattern={pattern} />
              <button type='button' title='Toggle Password Visibility' aria-label='Toggle Password Visibility' onClick={() => {setShowPassword(current => !current)}}>
                {
                  !showPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>
                }
              </button>
            </div>
          ) : (
            <input required={required} defaultValue={defaultVal} aria-required={required} type={fieldType} id={labelId} placeholder={placeholder} title={fieldTitle} aria-label={fieldTitle} name={fieldName} pattern={pattern} />
          )
        }
      </div>
    )
}


export default FormInput;