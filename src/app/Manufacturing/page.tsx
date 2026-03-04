import { Metadata } from 'next';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import Manufacturing from './Manufacturing';

export const metadata: Metadata = {
    title: 'Manufacturing Solutions | Hikvision Dubai',
    description: 'Industrial security and monitoring solutions.',
};

export default function ManufacturingPage() {
    return (
        <div>
            <Navbar />
            <Manufacturing />
            <Footer />
        </div>
    );
}
