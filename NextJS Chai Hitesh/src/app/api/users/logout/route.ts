import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout Successfull",
            status: 200,
            success: true
        })
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })
        return response;
    }
    catch (error: any) {
        console.log("Error : ", error.message)
        return NextResponse.json({
            error: error.message,
            status: 500
        })
    }
}