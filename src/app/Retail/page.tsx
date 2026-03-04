import { Metadata } from 'next';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import Retail from './Retail';

export const metadata: Metadata = {
    title: 'Retail Solutions | Hikvision Dubai',
    description: 'Smart security for retail businesses.',
};

export default function RetailPage() {
    return (
        <div>
            <Navbar />
            <Retail />
            <Footer />
        </div>
    );
}
