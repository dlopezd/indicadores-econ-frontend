import React, { useEffect, useState, useContext } from 'react';

import { keys } from '../../utils/util'
import Loader from '../Loader'
import IndicadorCard from './IndicadorCard'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { LastContext } from '../../context/lastContext';

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
    const lastContext = useContext(LastContext)

    useEffect(() => {
        const getInfo = async _ => {
            try {
                await lastContext.getIndicadores();
            }
            catch (error) {
                console.log(error);
            }
        }
        getInfo();
    }, []);

    return (
        lastContext.isLoading ? <Loader /> :
            lastContext.error ? <p>{lastContext.error}</p> :
                <Container className={classes.container}>
                    <Grid container className={classes.griptop} spacing={2}>
                        <Grid item >
                            <Grid container justify="center" spacing={spacing}>
                                {keys.map((key) => {
                                    const indicador = lastContext.indicadores[key];
                                    return (
                                        <IndicadorCard
                                            key={indicador.key}
                                            indicador={indicador} />
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
    );
}
