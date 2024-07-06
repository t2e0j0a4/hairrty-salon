'use client';
import React, { useRef, useState } from 'react';
import styles from "./DocsInput.module.css";

// React Icons
import { AiOutlineCloudUpload } from "react-icons/ai";
import createToast from '@/utils/createToast';

const DocsInput = ({ uploadDocLabelId, uploadDocTitle, uploadDocName, uploadDocRequired = true }: { uploadDocLabelId: string, uploadDocTitle: string, uploadDocName: string, uploadDocRequired?: boolean }) => {

  const [selectedDoc, setSelectedDoc] = useState({
    docName: '',
    selected: false,
    docSize: 0
  })


  const changeUpdateDoc = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const { name, size } = e.target.files[0];
      setSelectedDoc({
        docName: name,
        selected: true,
        docSize: size/1024
      });
      
      if ((size/1024) > 2048 ) {
        createToast('error', 'File should be less than 2MB');
        setSelectedDoc({
          docName: '',
          selected: false,
          docSize: 0
        });
        e.target.files = null;
        e.target.value = '';
      } else {
        createToast('success', 'Document selected!');
      }

    } else {
      createToast('error', 'Select a file to upload.');
    }
  }

  return (
    <div className={styles.docs__upload}>
      <label htmlFor={uploadDocLabelId}>
        <p>Upload {uploadDocTitle}</p>
        <AiOutlineCloudUpload fontSize={40} />
        <p>Allowed only less than 2MB</p>
        <p>Accepted only PNG, JPG, JPEG images.</p>
        {selectedDoc.selected && <p>{selectedDoc.docName} selected!</p>}
      </label>
      <input type="file" id={uploadDocLabelId} accept='.png, .svg, .jpeg, .jpg' name={uploadDocName} required={uploadDocRequired} onChange={changeUpdateDoc} />
    </div>
  )
}

export default DocsInput