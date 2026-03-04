import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
}, { timestamps: true });

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);

        const Admin = mongoose.model('Admin', adminSchema);

        const hashedPassword = await bcrypt.hash('admin123', 10);

        const admin = new Admin({
            username: 'admin',
            email: 'admin@hikvisiondubai.ae',
            password: hashedPassword,
        });

        await admin.save();
        console.log('Admin user created successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
}

createAdmin();
