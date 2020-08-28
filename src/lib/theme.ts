import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
    typography: {
        fontFamily: "'Source Sans Pro', sans-serif",
    },
    palette: {
        primary: {
            main: '#0093D0',
        },
        secondary: {
            main: '#05699b',
        },
    },
    overrides: {
        MuiCard: {
            root: {
                borderRadius: '10px',
            },
        },
        MuiCardHeader: {
            root: {
                borderBottom: '1px solid #EBECEC',
            },
            title: {
                fontSize: '1.2rem',
            },
        },
        MuiCardContent: {
            root: {
                padding: defaultTheme.spacing(4),
                [defaultTheme.breakpoints.down('sm')]: {
                    padding: defaultTheme.spacing(2),
                },
            },
        },
        MuiCardActions: {
            root: {
                borderTop: '1px solid #EBECEC',
                justifyContent: 'flex-end',
                [defaultTheme.breakpoints.down('xs')]: {
                    justifyContent: 'center',
                },
            },
        },
        MuiTableCell: {
            head: {
                fontWeight: 700,
            },
        },
    },
});

export default theme;
