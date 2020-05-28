import React, { useEffect, useState } from 'react';

import { keys } from '../../utils/util'
import Loader from '../Loader'
import IndicadorCard from './IndicadorCard'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 250
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    button: {
        color: '#0000008a',
    },
    container: {
        padding: 40
    },
    griptop: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
    title: {
        textAlign: 'right'
    }
}));

export default function Home() {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();
    const [indicadores, setIndicadores] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get("http://localhost:2000/last")
            .then(res => {
                setIndicadores(res.data.data);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                setError("Error al cargar la información.")
            })
    }, []);

    return (
        isLoading ? <Loader /> :
            error ? <p>{error}</p> :
                <Container className={classes.container}>
                    <Grid container className={classes.griptop} spacing={2}>
                        <Grid item >
                            <Grid container justify="center" spacing={spacing}>
                                {keys.map((key) => {
                                    const indicador = indicadores[key];
                                    return (
                                        <IndicadorCard indicador={indicador} />
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
    );
}
