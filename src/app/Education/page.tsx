import { Metadata } from 'next';
import Education from './Education';

export const metadata: Metadata = {
    title: 'Education Solutions | Hikvision Dubai',
    description: 'Smart security solutions for educational institutions.',
};

export default function EducationPage() {
    return (
        <div>
       
            <Education />
        
        </div>
    );
}
