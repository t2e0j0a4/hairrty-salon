import React from 'react';
import styles from "./ProcessSteps.module.css";

// React Icons
import { TbFileScissors } from "react-icons/tb";
import { BiSolidMessageDetail } from "react-icons/bi";
import { IoDocumentText, IoDocuments, IoDuplicate, IoTimer } from "react-icons/io5";

const RegistrationSteps = ({currentStep}: {currentStep : 1 | 2}) => {
  return (
    <div className={styles.steps}>
      <span className={`${styles.step__icon} ${currentStep === 1 && styles.current__step} ${currentStep === 2 && styles.done__step}`}><IoDocumentText fontSize={18}/></span>
      <div className={`${styles.step__diff} ${currentStep === 2 && styles.next__step}`}></div>
      <span className={`${styles.step__icon} ${currentStep === 2 && styles.current__step}`}><BiSolidMessageDetail fontSize={18}/></span>
    </div>
  )
}

const ProfileSteps = ({currentStep}: {currentStep: 1 | 2 | 3 | 4} ) => {
  return (
    <div className={styles.steps}>
      <span className={`${styles.step__icon} ${currentStep === 1 && styles.current__step} ${currentStep >= 1 && styles.done__step}`}><IoDocuments fontSize={18}/></span>
      <div className={`${styles.step__diff} ${currentStep >= 2 && styles.next__step}`}></div>
      <span className={`${styles.step__icon} ${currentStep === 2 && styles.current__step} ${currentStep >= 2 && styles.done__step}`}><TbFileScissors fontSize={18}/></span>
      <div className={`${styles.step__diff} ${currentStep >= 3 && styles.next__step}`}></div>
      <span className={`${styles.step__icon} ${currentStep === 3 && styles.current__step} ${currentStep >= 3 && styles.done__step}`}><IoDuplicate fontSize={18}/></span>
      <div className={`${styles.step__diff} ${currentStep === 4 && styles.next__step}`}></div>
      <span className={`${styles.step__icon} ${currentStep === 4 && styles.current__step}`}><IoTimer fontSize={18}/></span>
    </div>
  )
}

export { RegistrationSteps, ProfileSteps }