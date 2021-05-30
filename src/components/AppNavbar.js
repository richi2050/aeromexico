import React,{Fragment} from 'react'
import {AppBar, Typography, Toolbar} from '@material-ui/core'
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    grow :{
        flexGrow: 1
    }
  });



const AppNavbar = () => {
    const classes = useStyles();
    return (
        <Fragment>
            <AppBar  position='static'>
                <Toolbar>
                    <Icon>flight</Icon>
                    <div className={classes.grow}></div>
                    <Typography variant="h6">
                          Aeromexico
                    </Typography>  
                </Toolbar>  
            </AppBar>
        </Fragment>
    )
}

export default AppNavbar
