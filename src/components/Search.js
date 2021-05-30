import React,{useState} from 'react'
import {Container, Typography, Grid, RadioGroup, FormControlLabel, FormControl,Radio  } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Destino from './Destino';
import Vuelo from './Vuelo';







const useStyles = makeStyles({
paper : {
        marginTop:8,
        display:"flex",
        flexDirection: 'column',
        alignItem:'center'
    }
  });




const Search = () => {
    const [value, setValue] = useState('0');
    const handleChange = (event) => {
      setValue(event.target.value);
    };
    const classes = useStyles();
    return (
        <Container maxWidth='xl'>

            <div className={classes.paper}>
                
                <Typography component='h1' variant='h5'>
                    Buscar Vuelo
                </Typography>

                <Grid container spacing={3}>
                    <Grid item md={2} xs={12}>
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                <FormControlLabel value='0' control={<Radio />} label="Destino" />
                                <FormControlLabel value="1" control={<Radio />} label="Número de vuelo" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    
                        {(value === '0') ? <Destino/>:<Vuelo/>}  
                    
                </Grid>
            </div>
        </Container>
    )
}

export default Search
