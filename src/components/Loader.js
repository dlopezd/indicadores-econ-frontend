// Author: 
// fuente: https://codepen.io/keegnn/pen/qdvYJb
import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 60
    },
}));
const Loader = _ => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Grid container justify="center">
                <div className="kabobloader">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </Grid>
        </Container>
    );
}

export default Loader;