"use client"

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function VerifyEmailPage() {
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        console.log('AAA : ', token)
        try {
            if (!token) return; // Ensure token is not empty
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
        }
        catch (error: any) {
            setError(true);
            console.log(error.response?.data || error.message);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlToken = urlParams.get('token'); // Extract token from query params
        console.log("TOKEN : ", urlParams, urlToken);
        setToken(urlToken || '');
    }, []);

    useEffect(() => {
        if (token) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
                <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                        Verify Your Email
                    </h1>

                    <div className="mb-6 text-center">
                        <h2 className="text-sm font-medium text-gray-600">
                            {token ? `Token: ${token}` : 'No token found'}
                        </h2>
                    </div>

                    {verified && (
                        <div className="text-center">
                            <h2 className="text-xl font-medium text-green-600 mb-4">
                                Your email has been successfully verified!
                            </h2>
                            <Link href='/login'>
                                Login to your account
                            </Link>
                        </div>
                    )}

                    {error && (
                        <div className="text-center">
                            <h2 className="text-xl font-medium text-red-600 mb-4">
                                Something went wrong. Please try again.
                            </h2>
                            <Link href='/login'>
                                Go back to login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
