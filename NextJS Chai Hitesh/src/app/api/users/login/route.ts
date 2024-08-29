import { connect } from '@/dbConfig/dbConfig'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';

connect()


export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if the user exists
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({
                error: "User does not exist",
                status: 400,
            });
        }

        // Verify the password
        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({
                error: "Invalid password",
                status: 400,
            });
        }

        // Create a JWT token
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username,
        };

        const token = jwt.sign(tokenData, process.env.token_secret!, { expiresIn: '12h' });

        // Create response with token as a cookie
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            status: 200,
        });

        response.cookies.set('token', token, { httpOnly: true });

        return response;
    }
    catch (error: any) {
        console.error('Error during login:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
