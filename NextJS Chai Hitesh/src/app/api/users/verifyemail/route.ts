import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';

connect();

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({
                message: 'Token not valid or user not found',
                status: 400
            });
        }

        user.isverified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;


        await user.save();

        return NextResponse.json({
            message: 'User verified successfully',
            status: 200,
            success: true
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 400,
            error: error.message
        });
    }
}
