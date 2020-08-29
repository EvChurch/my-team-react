import React, { ReactElement, useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { Provider as HttpProvider } from 'use-http';
import DateFnsUtils from '@date-io/date-fns';
import theme from '../src/lib/theme';
import TopBar from '../src/components/TopBar';

const App = ({ Component, pageProps, router }: AppProps): ReactElement => {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    const options = {
        interceptors: {
            request: async ({ options }) => {
                options.headers.Authorization = `Bearer ${pageProps.session.user.token}`;
                return options;
            },
        },
    };

    return (
        <>
            <Head>
                <meta name="description" content="Church Leadership Development Platform." />
                <meta name="viewport" content="viewport-fit=cover,width=device-width,initial-scale=1,minimum-scale=1" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <link rel="manifest" href="/manifest.json" />
                <link href="/favicon.png" rel="icon" type="image/png" sizes="32x32" />
            </Head>
            <NextAuthProvider session={pageProps.session}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <HttpProvider url={process.env.API_URL} options={options}>
                            <TopBar session={pageProps.session} />
                            <Component {...pageProps} key={router.route} />
                        </HttpProvider>
                    </MuiPickersUtilsProvider>
                </ThemeProvider>
            </NextAuthProvider>
        </>
    );
};

export default App;
