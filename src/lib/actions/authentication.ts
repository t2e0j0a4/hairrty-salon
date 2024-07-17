'use server';

import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export async function detailsRegistration(formData: FormData) {
    const name = formData.get('name');
    const registeredName = formData.get('registeredName');
    const phoneNumber = formData.get('phoneNumber');
    const email = formData.get('email');
    const password = formData.get('password');

    const owner = {
        fullName: formData.get('fullName'),
        phoneNumber: formData.get('ownerPhoneName'),
        email: formData.get('ownerEmail'),
    }

    const address = {
        location: formData.get('location'),
    }

    const newRegistration = {
        name, registeredName, phoneNumber, email, password, owner, address
    }

    console.log(newRegistration);

    try {
        
        const response = await fetch(`${process.env.SERVER_HOST_URL}/api-salon/v1/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRegistration)
        });

        // console.log(await response.json());

        if (!response.ok) {
            if (response.status === 409) {
                return {
                    status: 'error',
                    message: 'Salon email or contact number already exists.'
                }
            }

            return {
                status: 'error',
                message: 'Issue salon registration. Try again.'
            }
        }

    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            message: 'Internal Server Error'
        }
    }

    redirect('/login');
}

export async function detailsLogin(formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')

    const login = {email, password};
    
    // console.log(login);

    try {

        const response = await fetch(`${process.env.SERVER_HOST_URL}/api-salon/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        })

        
        if (!response.ok) {
            if (response.status === 401 || response.status === 404) {
                return {
                    status: 'error',
                    message: 'Invalid credentials.'
                }
            }

            return {
                status: 'error',
                message: 'Issues logging you. Try again!'
            }
        }

        const data = await response.json();

        if (!data.token) {
            return {
                status: 'error',
                message: 'Authentication failed. Try again!'
            }
        }

        cookies().set('_salon__auth__token_', data.token, {
            secure: true,
            maxAge: 24*60*60
        });
        
    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            message: 'Internal Server Error'
        }
    }

    redirect('/profile');
}

export async function logoutUser() {
    cookies().delete('_salon__auth__token_');
    redirect('/login');
}