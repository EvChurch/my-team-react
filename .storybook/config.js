import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import MockDate from 'mockdate';
import isChromatic from 'chromatic/isChromatic';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Provider as HttpProvider } from 'use-http';
import theme from '../src/lib/theme';

if (isChromatic()) {
    MockDate.set(new Date(2020, 1, 1));
}

addDecorator((storyFn) => (
    <HttpProvider url="https://api.fluro.io" options={{ cachePolicy: 'no-cache' }}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>{storyFn()}</MuiPickersUtilsProvider>
        </ThemeProvider>
    </HttpProvider>
));
addParameters({ chromatic: { diffThreshold: true } });

// automatically import all files ending in *.stories.tsx
configure(require.context('../src/components', true, /\.stories\.tsx?$/), module);
