import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendMail } from '@/helpers/mailer'


connect()

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        const ifUser = await User.findOne({ email });

        if (ifUser) {
            return NextResponse.json({ error: "User already exist" }, { status: 500 })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        await sendMail({ email, emailType: "VERIFY", userId: savedUser._id })

        return NextResponse.json({
            message: "User created successfully",
            status: 201,
            savedUser
        })

    }

    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}