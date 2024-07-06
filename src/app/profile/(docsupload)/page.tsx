'use client';
import React, { useState } from 'react'
import styles from "./page.module.css";

import { useRouter } from 'next/navigation';

// Components
import DocsInput from '@/components/DocsInput/DocsInput';
import { ProfileSteps } from '@/components/ProcessSteps/ProcessSteps'

// Custom Hooks
import useDocsCheck from '@/hooks/useDocsCheck';
import createToast from '@/utils/createToast';
import { uploadOwnerDocs, uploadSalonDocs } from '@/lib/actions/profile';

const needSalonDocs: {id: number, name: string, fieldName: string, checked: boolean, uploadName: string}[] = [
  {
    id: 1,
    name: 'Salon Logo',
    fieldName: 'salonLogo',
    uploadName: 'logo',
    checked: false
  },
  {
    id: 2,
    name: 'Registration ID',
    fieldName: 'registrationId',
    uploadName: 'docs',
    checked: false
  },
  {
    id: 3,
    name: 'Salon Outside Pic',
    fieldName: 'salonOutsidePics',
    uploadName: 'outside',
    checked: false
  },
  {
    id: 4,
    name: 'Salon Inside Pic',
    fieldName: 'salonInsidePics',
    uploadName: 'interior',
    checked: false
  },
];

const needOwnerDocs: {id: number, name: string, fieldName: string, checked: boolean}[] = [
  {
    id: 1,
    name: 'Aadhar Card',
    fieldName: 'aadharCard',
    checked: false
  },
  {
    id: 2,
    name: 'Pan Card',
    fieldName: 'panCard',
    checked: false
  },
];

const UploadDocs = () => {

  const router = useRouter();

  // const { docs: ownerDocs, updateDocUploadStatus: ownerStatusUpdate } = useDocsCheck({userUploadedDocs: needOwnerDocs});
  
  // const { docs: salonDocs, updateDocUploadStatus: salonStatusUpdate } = useDocsCheck({userUploadedDocs: needSalonDocs});

  const [currentUploadingDocs, setCurrentUploadingDocs] = useState<'owner' | 'salon'>('owner');
  const [uploadingStep, setUploadingStep] = useState<1 | 2>(1);
  
  const [docsUploadLoad, setDocsUploadLoad] = useState(false);

  return (
    <>

      <ProfileSteps currentStep={uploadingStep} />

      <div className={styles.main__form}>

        <h3>Upload Documents</h3>
        <p>Upload all documents related to {currentUploadingDocs}. <span style={{ color: '#FF0000' }}>Do not refresh!</span></p>

        {currentUploadingDocs === 'owner' && 
          <form className={styles.upload__docs} onSubmit={async(e) => {
            e.preventDefault();
            setDocsUploadLoad(true);
            const toastId = createToast('loading', 'Submitting your documents...');
            try {

              const formData = new FormData(e.currentTarget);
              const response = await uploadOwnerDocs(formData);
              if (response.status === 'success') {
                createToast('success', response.message, toastId);
                setCurrentUploadingDocs('salon');
                setUploadingStep(2);
              } else {
                createToast('error', response.message, toastId);
              }
              
            } catch (error) {
              createToast('error', 'Issues submitting your documents.', toastId);
            } finally {
              setDocsUploadLoad(false);
            }
          }}>
            <h4>Owner Related Docs</h4>
            <div className={styles.docs__checklist}>
              {
                needOwnerDocs.map((doc) => {
                  return (
                    <div className={styles.doc__upload} key={doc.id}>
                      <DocsInput uploadDocLabelId={`${doc.fieldName}Doc`} uploadDocName='docs' uploadDocTitle={doc.name} uploadDocRequired={true} />
                    </div>
                  )
                })
              }
            </div>
            <button disabled={docsUploadLoad} type='submit' title='Submit Docs' aria-label='Submit Docs'>Submit</button>
          </form>
        }

        {
          currentUploadingDocs === 'salon' && 
          <form className={styles.upload__docs} onSubmit={async(e) => {
            e.preventDefault();
            setDocsUploadLoad(true);
            const toastId = createToast('loading', 'Submitting your documents...');
            try {

              const formData = new FormData(e.currentTarget);
              const response = await uploadSalonDocs(formData);
              if (response.status === 'success') {
                createToast('success', response.message, toastId);
                router.push('/profile/category');
              } else {
                createToast('error', response.message, toastId);
              }
              
            } catch (error) {
              createToast('error', 'Issues submitting your documents.', toastId);
            } finally {
              setDocsUploadLoad(false);
            }
          }}>
            <h4>Salon Related Docs</h4>
            <div className={styles.docs__checklist}>
              {
                needSalonDocs.map((doc) => {
                  return (
                    <div className={styles.doc__upload} key={doc.id}>
                      {
                        (doc.fieldName === 'salonInsidePics') ? (
                          <>
                            <DocsInput uploadDocLabelId={`${doc.fieldName}Doc`} uploadDocName={doc.uploadName} uploadDocTitle={doc.name} uploadDocRequired={true} />
                            <DocsInput uploadDocLabelId={`${doc.fieldName}Doc1`} uploadDocName={doc.uploadName} uploadDocTitle={doc.name} uploadDocRequired={true} />
                            <DocsInput uploadDocLabelId={`${doc.fieldName}Doc2`} uploadDocName={doc.uploadName} uploadDocTitle={doc.name} uploadDocRequired={true} />
                          </>
                        ) : (
                          <DocsInput uploadDocLabelId={`${doc.fieldName}Doc`} uploadDocName={doc.uploadName} uploadDocTitle={doc.name} uploadDocRequired={true} />
                        )
                      }
                    </div>
                  )
                })
              }
            </div>
            <button disabled={docsUploadLoad} type='submit' title='Submit Docs' aria-label='Submit Docs'>Submit</button>
          </form>
        }

      </div>
    </>
  )
}

export default UploadDocs;

/*

<div className={styles.doc}>
  <input required type='checkbox' name={doc.fieldName} checked={doc.checked} onChange={ownerStatusUpdate} id={doc.fieldName} />
  <label htmlFor={doc.fieldName}>{doc.name}</label>
</div>

*/