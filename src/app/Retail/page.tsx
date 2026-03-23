import { Metadata } from 'next';
import Retail from './Retail';

export const metadata: Metadata = {
    title: 'Retail Solutions | Hikvision Dubai',
    description: 'Smart security for retail businesses.',
};

export default function RetailPage() {
    return (
        <div>
    
            <Retail />
        
        </div>
    );
}
