import { Metadata } from 'next';
import Contact from './Contact';

export const metadata: Metadata = {
    title: 'Contact Us | Hikvision Dubai',
    description: 'Get in touch with Hikvision Dubai for professional security solutions and support.',
};

export default function ContactPage() {
    return (
        <div>
          
            <Contact />
         
        </div>
    );
}
