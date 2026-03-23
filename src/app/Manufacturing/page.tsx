import { Metadata } from 'next';
import Manufacturing from './Manufacturing';

export const metadata: Metadata = {
    title: 'Manufacturing Solutions | Hikvision Dubai',
    description: 'Industrial security and monitoring solutions.',
};

export default function ManufacturingPage() {
    return (
        <div>

            <Manufacturing />

        </div>
    );
}
