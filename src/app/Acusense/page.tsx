import { Metadata } from 'next';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import Acusense from './Acusense';

export const metadata: Metadata = {
    title: 'AcuSense Technology | Hikvision Dubai',
    description: 'AI-powered accurate human and vehicle detection by Hikvision.',
};

export default function AcusensePage() {
    return (
        <div>
            <Navbar />
            <Acusense />
            <Footer />
        </div>
    );
}
