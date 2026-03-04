import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import Cookies from './cookies';

export const metadata = { title: 'Cookie Policy | Hikvision Dubai' };

export default function CookiesPage() {
    return (<div><Navbar /><Cookies /><Footer /></div>);
}
