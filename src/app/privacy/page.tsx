import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import Privacy from './privacy';

export const metadata = { title: 'Privacy Policy | Hikvision Dubai' };

export default function PrivacyPage() {
    return (<div><Navbar /><Privacy /><Footer /></div>);
}
