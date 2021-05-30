import React, { Fragment } from 'react'
import {Grid, Hidden, Typography, Container,withWidth } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Terminal from './Terminal';
import Retraso from './Retraso';

const useStyles = makeStyles({
    title:{
        fontSize:20,
    },
    title_2:{
        fontSize:15,
    },
    conte:{
        height: 140,
        width: 1000,
        marginTop:8,
        display:"flex",
        flexDirection: 'column',
        alignItem:'center'
    },
    gridT:{
        
        borderBottom:0,
        borderTop: 1, 
        borderColor: 'gray',
        borderStyle: 'solid',
        borderRight:0,
        borderLeft:0,
    },
});

const Vuelos = (props) => {
    const classes = useStyles();
    const flight = props.data;
    const flight2 = props.data2;

    console.log(flight2);
    
    const renderSwitchRetra = (param,time) => {
        switch(param) {   
            case 'DELAYED':
              return <Retraso param={param} texto="Retrasado" flag='true' time={time}></Retraso>
            default:
                return '';
                //return <Retraso param={param} texto="Llego" flag='false' time={time}></Retraso>
          }
    }

    const renderSwitch = (param) => {    
        switch(param) {
          case 'ON_TIME':
            return 'A tiempo';
          case 'FLOWN':
            return 'Volando';
          case 'DELAYED':
            return 'Retrasado'
          default:
              return 'Llego'
        }
      }
    const formatFecha = (param) => {
        var spli = param.split('T');
        return spli[1];
      }
    
     

    return (
        <Fragment>
            <Container maxWidth='md' >
                <Hidden xsDown>
                    <Grid container justify='center' >
                        <Grid item xs={4} md={2} >
                            <Typography variant="h5" className={classes.title_2}> Número de vuelo</Typography>
                        </Grid>
                        <Grid item xs={4} md={2} >
                            <Typography variant="h5" className={classes.title_2}> Estado</Typography>
                        </Grid>
                        <Grid item xs={4} md={2} >
                            <Typography variant="h5" className={classes.title_2}> Origen </Typography>
                        </Grid>
                        <Grid item xs={4} md={2} >
                            <Typography variant="h5" className={classes.title_2}> Hora Salida </Typography>
                        </Grid>
                        <Grid item xs={4} md={2} >
                            <Typography variant="h5" className={classes.title_2}> Hora Llegada</Typography>
                        </Grid>
                        <Grid item xs={4} md={2} >
                            <Typography variant="h5" className={classes.title_2}> Destino</Typography>
                        </Grid>
                    </Grid>
                </Hidden>
                {  
                    flight.map((item)=>(
                        item['_collection'].map((item2)=>(
                            <Grid container justify='center' className={classes.gridT} key={ item2['segment']['segmentCode'] } >
                                <Fragment>
                                    <Grid item xs={4} md={2} >
                                        <Typography component='h1' variant='h4' className={classes.title}>
                                            { item2['segment']['marketingCarrier'] } { item2['segment']['marketingFlightCode'] }
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} md={2}>
                                        <Typography component='h1' variant='h5' className={classes.title}>
                                            {renderSwitch(item2['segment']['flightStatus'])}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} md={2}>
                                        <Typography component='h1' variant='h5' className={classes.title}>
                                            {item2['segment']['departureAirport']} 
                                            <Terminal terminal={item2['boardingTerminal']} sala={item2['boardingGate']}></Terminal>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} md={2}>
                                        <Typography component='h1' variant='h5' className={classes.title}>
                                            {formatFecha(item2['segment']['departureDateTime'])}
                                            {renderSwitchRetra(item2['segment']['flightStatus'],item2['boardingTime'])}
                                        </Typography>
                                    </Grid>
                                        
                                    <Grid item xs={4} md={2}>
                                        <Typography component='h1' variant='h5' className={classes.title}>
                                            {formatFecha(item2['segment']['arrivalDateTime'])}
                                            {renderSwitchRetra(item2['segment']['flightStatus'],formatFecha(item2['estimatedArrivalTime']))}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} md={2}>
                                        <Typography component='h1' variant='h5' className={classes.title}>
                                            {item2['segment']['arrivalAirport']}
                                            <Terminal terminal={item2['arrivalTerminal']} sala={item2['arrivalGate']}></Terminal> 
                                        </Typography>
                                    </Grid>
                                </Fragment>
                            </Grid>
                            
                        ))
                        
                    ))
                }
            </Container>
        </Fragment>
    )
}

export default withWidth()(Vuelos)
