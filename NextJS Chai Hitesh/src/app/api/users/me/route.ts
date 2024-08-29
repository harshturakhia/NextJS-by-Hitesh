import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from '@/dbConfig/dbConfig'

connect();

export async function GET(request: NextRequest) {
    try {
        const _id = getDataFromToken(request);
        const user = await User.findById(_id).select('-password'); // Added await

        if (!user) {
            return NextResponse.json({
                message: 'User not found!',
                status: 404
            });
        }

        return NextResponse.json({
            message: 'User found!',
            data: user,
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: 400
        });
    }
}
