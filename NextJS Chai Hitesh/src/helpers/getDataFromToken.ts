import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken: any = jwt.verify(token, process.env.token_secret!);

        return decodedToken.id;
    } catch (error: any) {
        throw new Error("Invalid or expired token");
    }
}
