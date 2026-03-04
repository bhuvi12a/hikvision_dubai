import { Metadata } from 'next';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import Colorvu from './Colorvu';

export const metadata: Metadata = {
    title: 'ColorVu Technology | Hikvision Dubai',
    description: 'Full-color imaging 24/7 with Hikvision ColorVu technology.',
};

export default function ColorvuPage() {
    return (
        <div>
            <Navbar />
            <Colorvu />
            <Footer />
        </div>
    );
}
