import React, { useEffect, useState, useContext } from 'react'
import moment from 'moment'
import 'moment/locale/es'
import { withRouter } from 'react-router-dom'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import { HistoricContext } from '../../context/historicsContext';
import Loader from '../Loader'
import Error from '../Error'
import SearchForm from './SearchForm';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TableData from './TableData';
import { Typography } from '@material-ui/core';


moment.locale('es');
const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 20
    },
    table: {
        minWidth: 250,
    },
    title: {
        marginBottom: 30
    },
    card: {
        marginTop: 20,
    },
    CardContent: {
        padding: 24
    },
    alert: {
        marginTop: 20
    }
}));

const Historic = props => {
    const classes = useStyles();
    const [dataChart, setDataChart] = useState([]);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const historicContext = useContext(HistoricContext);

    useEffect(() => {
        const getInfo = async (indicador) => {
            await historicContext.getHistoric(indicador);
        }
        getInfo(props.indicador);

        const to = moment().utc().startOf('day').unix();
        const fromPeriod = props.frecuency === "daily" ? 'month' : 'year';
        const from = moment().utc().startOf('day').subtract(5, fromPeriod).unix();
        setFrom(from);
        setTo(to);
    }, []);

    useEffect(() => {
        const indicadorHistoric = historicContext.historic[props.indicador];
        if (indicadorHistoric && indicadorHistoric.values) {
            const newData = indicadorHistoric.values
                .filter(v => {
                    if(v.date >= from && v.date <= to){
                        return v;
                    }
                 })
                .map(v => {
                    return {
                        fecha: moment.unix(v.date).utc().format("D MMM YY"),
                        valor: v.rate
                    }
                });

            setDataChart(newData);
        }
        else {
            setDataChart([])
        }

    }, [from, to, historicContext.historic])

    const searchHandler = (fromDate, toDate) => {
        setFrom(fromDate);
        setTo(toDate);
    }

    const renderLineChart = (
        <LineChart width={600} height={300} data={dataChart} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="valor" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
        </LineChart>
    );

    return (
        historicContext.isLoading ? <Loader /> :
            historicContext.error ? <Error msg="Error al cargar la información." /> :
                <Container className={classes.container}>
                    <Button
                        color="primary"
                        onClick={(event) => {
                            event.preventDefault();
                            props.history.push("/");
                        }}>Volver</Button>

                    <SearchForm
                        from={from}
                        to={to}
                        searchHandler={searchHandler}
                        frecuency={props.frecuency} />

                    <Card className={classes.card} variant="outlined">
                        <CardContent className={classes.CardContent}>
                            <Typography
                                className={classes.title}
                                component="h5"
                                variant="h5">
                                Valores históricos de {props.indicador.toUpperCase()}
                            </Typography>
                            <Grid container justify="space-around">
                                <Grid item>
                                    {renderLineChart}
                                    {
                                        dataChart && dataChart[0] && (
                                            dataChart[0].fecha != from ||
                                            dataChart[dataChart.length - 1].fecha != to)
                                        &&
                                        <Alert
                                            className={classes.alert}
                                            severity="warning">
                                            Podrían no existir registros para todas las fechas deseadas. Sólo se mostrarán los disponibles.
                                        </Alert>
                                    }
                                </Grid>
                                <Grid item>
                                    <TableData dataChart={dataChart} />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Container >
    );
}

export default withRouter(Historic);