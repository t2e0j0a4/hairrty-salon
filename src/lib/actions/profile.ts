'use server';

import { cookies } from "next/headers";

// 1. Owner Documents
export async function uploadOwnerDocs(formData: FormData) {

    try {

        const response = await fetch(`${process.env.SERVER_HOST_URL}/api-salon/v1/profile/owner/upload-docs`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${cookies().get('_salon__auth__token_')?.value}`
            },
            body: formData
        });

        const data = await response.json();
        console.log(data);
        
        if (!response.ok) {
            

            if (response.status === 400) {
                return {
                    status: 'error',
                    message: 'Unauthorized!'
                }
            }

            return {
                status: 'error',
                message: 'Issues submiting documents. Try again!'
            }
        }

        return {
            status: 'success',
            message: 'Documents submitted!'
        }

    } catch(error) {
        console.log(error);
        return {
            status: 'error',
            message: 'Internal Server Error'
        }
    }
}

// 2. Salon Documents
export async function uploadSalonDocs(formData: FormData) {
    console.log(formData);
    try {

        const response = await fetch(`${process.env.SERVER_HOST_URL}/api-salon/v1/profile/salon/upload-docs`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${cookies().get('_salon__auth__token_')?.value}`
            },
            body: formData
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.log(data);

            if (response.status === 400) {
                return {
                    status: 'error',
                    message: 'Unauthorized!'
                }
            }

            return {
                status: 'error',
                message: 'Issues submiting documents. Try again!'
            }
        }

        return {
            status: 'success',
            message: 'Documents submitted!'
        }

    } catch(error) {
        console.log(error);
        return {
            status: 'error',
            message: 'Internal Server Error'
        }
    }

}

// 3. Add Item of Category
export async function addCategoryItem(formData: FormData) {

    const subCategoryId = formData.get('subCategoryId');
    const name = formData.get('name');
    const time = formData.get('time');
    const price = parseInt(formData.get('price')?.toString() as string);

    const newItem = { subCategoryId, name, time, price };

    try {

        const response = await fetch(`${process.env.SERVER_HOST_URL}/api-salon/v1/profile/category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies().get('_salon__auth__token_')?.value}`
            },
            body: JSON.stringify(newItem)
        });

        if (!response.ok) {
            return {
                status: 'error',
                message: 'Issues adding item. Try again!'
            }
        }

        return {
            status: 'success',
            message: 'Added Item successfully!'
        }
        
    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            message: 'Internal Server Error'
        }
    }
}