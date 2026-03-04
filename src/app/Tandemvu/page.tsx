import { Metadata } from 'next';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import Tandemvu from './Tandemvu';

export const metadata: Metadata = {
    title: 'TandemVu Technology | Hikvision Dubai',
    description: 'Panoramic and detail views in a single camera.',
};

export default function TandemvuPage() {
    return (
        <div>
            <Navbar />
            <Tandemvu />
            <Footer />
        </div>
    );
}
