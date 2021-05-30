import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles({
    title:{
        fontSize:10
    },
    
  });

const Terminal = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.title}>
            Terminal {props.terminal} Sala {props.sala}
        </div>
    )
}

export default Terminal
