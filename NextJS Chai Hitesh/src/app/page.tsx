"use client"

import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const profileHandler = () => {
    router.push('/profile');
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-4xl font-extrabold mb-6 text-gray-800">
            Home Page
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Welcome to the home page. Click the button below to visit your profile.</p>
          <button
            onClick={profileHandler}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-150 ease-in-out"
          >
            Go to Profile Page
          </button>
        </div>
      </div>
    </>

  );
}
