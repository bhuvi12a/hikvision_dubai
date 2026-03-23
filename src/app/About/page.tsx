import { Metadata } from 'next';
import About from './About';

export const metadata: Metadata = {
    title: 'About Us | Hikvision Dubai',
    description: 'Learn about Hikvision Dubai - your trusted partner for professional security solutions in the UAE.',
};

export default function AboutPage() {
    return (
        <div>
           
            <About />
        
        </div>
    );
}
