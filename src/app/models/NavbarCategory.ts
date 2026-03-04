import mongoose from 'mongoose';

const navbarCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });

const NavbarCategory = mongoose.models.NavbarCategory || mongoose.model('NavbarCategory', navbarCategorySchema);
export default NavbarCategory;
