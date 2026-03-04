import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
}, { timestamps: true });

adminSchema.pre('save', async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export default Admin;
