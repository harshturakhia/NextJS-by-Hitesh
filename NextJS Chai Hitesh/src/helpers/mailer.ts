import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'


export const sendMail = async ({ email, emailType, userId }: any) => {

    try {
        const hashToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            const user = await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashToken,
                    verifyTokenExpiry: Date.now() + 3600000
                },
                { new: true, runValidators: true }
            )
        }
        else if (emailType === 'RESET') {
            const user = await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                },
                { new: true, runValidators: true }
            )
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "6034d92d71d4bd",
                pass: "c8145c0a6ab06a"
            }
        });

        const mailOptions = {
            from: "tatva.dotnet.harshturakhia07@outlook.com",
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your account' : 'Reset your password',
            html: `
            <p>
                Click <a href="${process.env.domain}/verifyemail?token=${hashToken}">Here</a>
                to ${emailType === 'VERIFY' ? 'verify your email' : 'Reset your password'}
                or ${process.env.domain}/verifyemail?token=${hashToken}
            </p>
            `
        }

        const mailRes = await transporter.sendMail(mailOptions);
        return mailRes;
    }
    catch (error: any) {
        console.log("Error : ", error.message)
        throw new Error(error.message);
    }

}