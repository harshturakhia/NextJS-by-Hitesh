import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


export async function connect() {
    try {
        // await mongoose.connect('mongodb+srv://harshturakhia:FC99k30xND9w87vC@nextjs.ofitb.mongodb.net/');
        await mongoose.connect(process.env.mongo_uri!);
        console.log("Mongodb connected successfully!");

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Mongodb connected successfully!");
        });

        connection.on('error', (error) => {
            console.error("Mongodb error:", error);
        });
    }
    catch (error) {
        console.error('Something went wrong!');
        console.error('Error:', error);
    }
}
