export default function UserProfile({ params }: any) {

    return (

        <div className="text-center flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center bg-white p-8 rounded-lg shadow-md w-full max-w-md">

                <h1 className="text-2xl font-bold mb-6 text-center">Profile Page of {params.id}</h1>

            </div>
        </div>
    )
}