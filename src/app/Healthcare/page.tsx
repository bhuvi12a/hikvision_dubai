import { Metadata } from 'next';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import Healthcare from './Healthcare';

export const metadata: Metadata = {
    title: 'Healthcare Solutions | Hikvision Dubai',
    description: 'Advanced security for healthcare facilities.',
};

export default function HealthcarePage() {
    return (
        <div>
            <Navbar />
            <Healthcare />
            <Footer />
        </div>
    );
}
