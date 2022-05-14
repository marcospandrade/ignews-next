import { AppProps } from 'next/app';
import { SessionProvider as AuthProvider } from 'next-auth/react';

import { Header } from '../components/Header';

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
