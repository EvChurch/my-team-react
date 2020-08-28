import React, { ReactElement, useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { Provider as HttpProvider } from 'use-http';
import theme from '../src/lib/theme';

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
                <meta name="description" content="Analytics for Tandem Ministries." />
                <meta name="viewport" content="viewport-fit=cover,width=device-width,initial-scale=1,minimum-scale=1" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <link rel="manifest" href="/manifest.json" />
                <link href="/favicon.png" rel="icon" type="image/png" sizes="32x32" />
            </Head>
            <NextAuthProvider session={pageProps.session}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <HttpProvider url={process.env.API_URL} options={options}>
                            <Component {...pageProps} key={router.route} />
                        </HttpProvider>
                    </MuiPickersUtilsProvider>
                </ThemeProvider>
            </NextAuthProvider>
        </>
    );
};

export default App;
