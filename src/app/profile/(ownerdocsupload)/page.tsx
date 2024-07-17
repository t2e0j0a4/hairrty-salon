'use client';
import React, { useState } from 'react'
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';

// Components
import DocsInput from '@/components/DocsInput/DocsInput';
import { ProfileSteps } from '@/components/ProcessSteps/ProcessSteps'

// Utils
import createToast from '@/utils/createToast';

// Actions
import { uploadOwnerDocs } from '@/lib/actions/profile';


const needOwnerDocs: {id: number, name: string, fieldName: string, checked: boolean, uploadName: string}[] = [
  {
    id: 1,
    name: 'Aadhar Card',
    fieldName: 'aadharCard',
    uploadName: 'docs',
    checked: false
  },
  {
    id: 2,
    name: 'Pan Card',
    fieldName: 'panCard',
    uploadName: 'docs',
    checked: false
  },
];

const UploadDocs = () => {

  const router = useRouter();

  // const { docs: ownerDocs, updateDocUploadStatus: ownerStatusUpdate } = useDocsCheck({userUploadedDocs: needOwnerDocs});
  
  const [docsUploadLoad, setDocsUploadLoad] = useState(false);

  return (
    <>

      <ProfileSteps currentStep={1} />

      <div className={styles.main__form}>

        <h3>Upload Documents</h3>
        <p>Upload all documents related to Owner. <span style={{ color: '#FF0000' }}>Do not refresh!</span></p>

        <form className={styles.upload__docs} onSubmit={async(e) => {
            e.preventDefault();
            setDocsUploadLoad(true);
            const toastId = createToast('loading', 'Submitting your documents...');
            try {

              const formData = new FormData(e.currentTarget);
              const response = await uploadOwnerDocs(formData);
              if (response.status === 'success') {
                createToast('success', response.message, toastId);
                router.push('/profile/salondocs');
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
                      <DocsInput uploadDocLabelId={`${doc.fieldName}Doc`} uploadDocName={doc.uploadName} uploadDocTitle={doc.name} uploadDocRequired={true} />
                    </div>
                  )
                })
              }
            </div>
            <button disabled={docsUploadLoad} type='submit' title='Submit Docs' aria-label='Submit Docs'>Submit</button>
          </form>

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