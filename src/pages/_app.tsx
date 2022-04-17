import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { SessionProvider as AuthProvider } from 'next-auth/react';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider session={pageProps.session}>
            <Header />
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
