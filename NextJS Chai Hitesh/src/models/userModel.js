import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
    },
    isverified: {
        type: Boolean,
        required: true,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenExpiry: {
        type: Date,
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpiry: {
        type: Date
    }
});

// Correct way to define or retrieve the model
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
