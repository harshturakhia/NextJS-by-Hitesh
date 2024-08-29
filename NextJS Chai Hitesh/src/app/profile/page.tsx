"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState<string | null>(null);

    const logoutHandler = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout Successful");
            router.push('/login');
        } catch (error: any) {
            console.log("Error: ", error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/me');
            setData(res.data.data._id);
        } catch (error: any) {
            console.log("Error: ", error.message);
            toast.error("Failed to fetch user details");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="flex flex-col bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-4">
                <h1 className="text-2xl font-bold py-4 text-center">
                    Profile Page
                </h1>
            </div>

            <button
                onClick={logoutHandler}
                className="my-3 w-full max-w-md py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Logout
            </button>
            <button
                onClick={getUserDetails}
                className="my-3 w-full max-w-md py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Fetch Details
            </button>

            {data ? (
                <Link href={`/profile/${data}`} className="text-blue-800 py-4 hover:underline">
                    {data}
                </Link>
            ) : (
                <p className="text-gray-800 py-4">No user details available</p>
            )}
        </div>
    )
}
