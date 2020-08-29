import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography: {
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    palette: {
        primary: {
            dark: '#689F38',
            main: '#8BC34A',
            light: '#DCEDC8',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#00BCD4',
        },
    },
});

export default theme;
