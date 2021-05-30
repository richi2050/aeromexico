
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    title:{
        fontSize:10,
     
    },
    
  });


const Retraso = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.title}>
            {props.texto} {props.time}
        </div>
    )
}

export default Retraso
