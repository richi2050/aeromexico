import { Container,Grid, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'

const Error404 = () => {
    return (
        <Fragment>
            <Container maxWidth='md' >
                <Grid container justify='center' >
                    <Typography variant="h5" > No hay vuelos disponibles</Typography>
                </Grid>
            </Container>
        </Fragment>
    )
}

export default Error404