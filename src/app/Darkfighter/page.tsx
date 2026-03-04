import { Metadata } from 'next';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import Darkfighter from './Darkfighter';

export const metadata: Metadata = {
    title: 'DarkFighter Technology | Hikvision Dubai',
    description: 'Ultra-low light surveillance with Hikvision DarkFighter.',
};

export default function DarkfighterPage() {
    return (
        <div>
            <Navbar />
            <Darkfighter />
            <Footer />
        </div>
    );
}
