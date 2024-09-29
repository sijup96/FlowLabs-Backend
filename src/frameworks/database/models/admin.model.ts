import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt'

export const AdminSchema: Schema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Method to compare the password
AdminSchema.methods.comparePassword = async function (enteredPassword: string) {
    return bcrypt.compare(enteredPassword, this.password);
}

export const AdminModel = model('Admin', AdminSchema);
