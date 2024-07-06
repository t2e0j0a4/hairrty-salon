'use client';
import React, { useState } from 'react';

function useDocsCheck({ userUploadedDocs }: { userUploadedDocs: {id: number, name: string, fieldName: string, checked: boolean}[] }) {

    const [docs, setDocs] = useState(userUploadedDocs);
    const [allChecked, setAllChecked] = useState(false);

    const updateAllCheckStatus = () => {
        const checkStatusSet = new Set([...docs.map((doc) => JSON.stringify(doc.checked))]);
        if (checkStatusSet.size === 1 && checkStatusSet.has('true')) {
            setAllChecked(true);
        } else {
            setAllChecked(false);
        }
    }

    const updateDocUploadStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        const updatedDocsStatus = docs.filter((doc) => {
            if (doc.fieldName === name) {
                doc.checked = checked;
            }
            return doc;
        })
        setDocs(updatedDocsStatus);
        updateAllCheckStatus();
    }

    return { docs, updateDocUploadStatus, allChecked };
}

export default useDocsCheck;