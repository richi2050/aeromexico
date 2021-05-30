import React,{useState, useEffect, Fragment} from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {KeyboardDatePicker } from '@material-ui/pickers'
import Vuelos from './Vuelos';
import Error404 from './Error404';

const useStyles = makeStyles({
    grid90:{
        width: 969,
    },    
    submit :{ 
        marginTop: 25,
        marginBottom: 20
    },
   
    tableG: {
        width: "100%",
        marginTop: 10
    }
  });

const Destino = () => {
    const [data,setData] =  useState([]);
    const [date,setDate] =  useState(new Date());
    const dateP = new Date();
    const dateP2 = new Date();
    dateP.setDate(date.getDate() + 1);
    dateP2.setDate(date.getDate() - 1);
    const [flight,setFlight] =  useState([]);

    const [date1] =  useState(dateP);
    const [date2] =  useState(dateP2);

    const[origen, setOrigen] = useState('');
    const[destino, setDestino] = useState('');

    const [modoEdicion, setModoEdicion] = useState(true);
    const [vista, setVista] = useState(false);

    useEffect(() => {
        const obtenerDatos =  async () => {
            try {
                fetch("https://www.aeromexico.com/cms/api/v1/airports?language=es&status=1&store=MEX")
                .then((response) => response.json())
                .then((data) => {
                    setData(data.airports)});
            }
            catch (error) {
              console.log(error);
            }
          }
          obtenerDatos()
    }, []);

    const activarEdicion = () => {
        if(origen !== '' && destino !== '' && date !== ''){
         setModoEdicion(false);
        }
    }

    const buscar = async (e) => {
        e.preventDefault()
        try {
            const format = date.getFullYear()+'-0'+(date.getMonth()+ 1 )+'-'+date.getDate();            
            fetch("https://www.aeromexico.com/api/v1/checkin/flight-status?store=mx&pos=WEB&flight=&date="+format+"&origin="+origen+"&destination="+destino)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setFlight(data._collection);
                
                setVista(true);
            });

            /* https://www.aeromexico.com/api/v1/checkin/flight-status?store=mx&pos=WEB&flight=&date=2021-05-28&origin=CJS&destination=GDL */
            
        } catch (error) {
            
        }
    }
 
     
    const classes = useStyles();

    return (
        <Fragment>
            <Grid item md={10} xs={12}>
                <form  onSubmit={buscar} >
                        <Grid container spacing={3} justify='center'>
                            <Grid item md={3} xs={12}>
                                <Autocomplete
                                    id='origen'
                                    freeSolo
                                    options={data}
                                    getOptionLabel={(option) => option.airport['city'] +' - '+option.airport['code']}
                                    onChange={(event, newValue) => {
                                        if(newValue !== null){
                                            setOrigen(newValue.airport['code']);
                                            activarEdicion();
                                        }
                                        //setOrigen([]);
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Origen" variant='outlined'/>
                                    )}/>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <Autocomplete
                                    id='destino'
                                    freeSolo
                                        options={data}
                                        onChange={(event, newValue) => {
                                            if(newValue !== null){
                                                setDestino(newValue.airport['code']);
                                                activarEdicion();
                                            }
                                            //setDestino([]);
                                        }}
                                        getOptionLabel={(option) => option.airport['city'] +' - '+option.airport['code']}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Destino" variant='outlined'/>
                                        )}/>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <KeyboardDatePicker 
                                    clearable
                                    value={date}
                                    placeholder="Fecha de Salida"
                                    onChange={date => {
                                        
                                        setDate(date)
                                        activarEdicion();
                                    }}
                                    minDate={date2}
                                    maxDate={date1}
                                    format="yyyy-MM-dd"
                                    />
                            </Grid>         
                        </Grid>
                
                
                        <Grid container justify='center'>
                            <Grid item xs={12} md={6}>
                                <Button type='submit' disabled={modoEdicion} variant='contained' fullWidth size='large' color='primary' className={classes.submit}>Buscar</Button>
                            </Grid>
                        </Grid>
                </form>
            </Grid>
            {(vista) ? ((flight.length > 0) ? <Vuelos data={flight} data2={[]}/>:<Error404/>):''}

         
            
        </Fragment>

    )
}

export default Destino
