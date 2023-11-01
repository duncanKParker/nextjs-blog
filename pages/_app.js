import '../styles/global.css';
import { UserProvider } from './UserContext';

export default function App({ Component, pageProps }) {
    return (
    <UserProvider>
        <Component {...pageProps} />
    </UserProvider>
    );
  }