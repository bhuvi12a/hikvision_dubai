import { Metadata } from 'next';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import SmartIP from './SmartIP';

export const metadata: Metadata = {
    title: 'Smart IP Solutions | Hikvision Dubai',
    description: 'Intelligent IP-based security infrastructure.',
};

export default function SmartIPPage() {
    return (
        <div>
            <Navbar />
            <SmartIP />
            <Footer />
        </div>
    );
}
