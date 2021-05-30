import React, { Fragment,useState } from 'react'
import {KeyboardDatePicker } from '@material-ui/pickers'
import {Grid, TextField, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Vuelos from './Vuelos'
import Error404 from './Error404'

const useStyles = makeStyles({
    grid90:{
        width: 969,
    },
    submit :{ 
        marginTop: 25,
        marginBottom: 20
    },
   
  });

const Vuelo = () => {
    const [date,setDate] =  useState(new Date());
    const [data,setData] =  useState([]);
    const dateP = new Date();
    const dateP2 = new Date();
    dateP.setDate(date.getDate() + 1);
    dateP2.setDate(date.getDate() - 1);

    const [date1] =  useState(dateP);
    const [date2] =  useState(dateP2);
    const classes = useStyles();
    const [modoEdicion, setModoEdicion] = useState(true);

    const [vuelo,setVuelo] =  useState('');
    const [vista, setVista] = useState(false);

    const onChange = e => {
        let vuelo = e.target.value;
        setVuelo(vuelo)
        activarEdicion();
    }

    const activarEdicion = () => {
        if(vuelo !== '' && date !== ''){
         setModoEdicion(false);
        }
    }

    const buscar = async (e) => {
        e.preventDefault()
        try {
            const format = date.getFullYear()+'-0'+(date.getMonth()+ 1 )+'-'+date.getDate();            
            fetch("https://www.aeromexico.com/api/v1/checkin/flight-status?store=mx&pos=WEB&flight="+vuelo+"&date="+format+"&origin=&destination=")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setData(data._collection);
                setVista(true);    
            });   
        } catch (error) {
            
        }
    }

    return (
        <Fragment>
            <Grid item md={10} xs={12}>
                <form  onSubmit={buscar} >
                <Grid item >
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <TextField name="nombre" onChange={onChange}   value={vuelo} fullWidth label='Ingrese Vuelo'/>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <KeyboardDatePicker 
                                clearable
                                value={date}
                                placeholder="Fecha de Salida"
                                onChange={date => {
                                    
                                    setDate(date)
                                }}
                                minDate={date2}
                                maxDate={date1}
                                format="yyyy-MM-dd"
                                />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justify='center'>
                    <Grid item xs={12} md={6}>
                        <Button type='submit' disabled={modoEdicion} variant='contained' fullWidth size='large' color='primary' className={classes.submit}>Buscar</Button>
                    </Grid>
                </Grid>
            </form>
            </Grid>
            {(vista) ? ((data.length > 0) ? <Vuelos data={data} data2={data}/>:<Error404/>):''}
        </Fragment>
    )
}

export default Vuelo
