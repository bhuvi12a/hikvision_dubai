import { Metadata } from 'next';

import Homepage from './Components/Home';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Professional Security Solutions in Dubai | Hikvision UAE',
  description: 'Leading provider of cutting-edge surveillance systems and security equipment in Dubai. Get professional security solutions for your peace of mind.',
};

export default function Home() {
  try {
    return (
      <div>
    
        <Homepage />
      
      </div>
    );
  } catch (error) {
    console.error('Error in Home component:', error);
    notFound();
  }
}
