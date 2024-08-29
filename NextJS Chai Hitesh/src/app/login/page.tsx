"use client"

import '../globals.css';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from 'react-hot-toast';


export default function LoginPage() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onLogin = async () => {
        // Signup logic here

        try {
            setIsLoading(true);
            console.log(user);
            const response = await axios.post("/api/users/login", user);
            toast.success('Login success');
            router.push('/profile')
        }
        catch (error: any) {
            console.log('Error : ', error)
            toast.error(error.message);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {

        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }

    }, [user]);


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    {isLoading ? 'Processing' : 'login'}
                </h1>


                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
                />

                <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
                />

                <button
                    onClick={onLogin}
                    className="w-full py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {buttonDisabled ? 'Enter details first' : 'Login'}
                </button>

                <p className="text-center text-sm mt-4">
                    Don't have an account? <Link href='/signup' className="text-blue-500 hover:underline">Signup here</Link>
                </p>
            </div>
        </div>
    );
}
