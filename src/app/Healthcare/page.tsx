import { Metadata } from 'next';
import Healthcare from './Healthcare';

export const metadata: Metadata = {
    title: 'Healthcare Solutions | Hikvision Dubai',
    description: 'Advanced security for healthcare facilities.',
};

export default function HealthcarePage() {
    return (
        <div>
      
            <Healthcare />
      
        </div>
    );
}
