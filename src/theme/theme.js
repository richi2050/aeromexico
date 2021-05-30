import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography : {
        useNextVariants: true

    },
    palette : {
        primary : {
            main : '#0B2343'
        },
        common : {
            white: 'white'
        },
        secondary:  {
            main : '#007CC2'
        }
    },
    spacing : 10
});

export default theme;