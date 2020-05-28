import React, { useEffect, useState, useContext } from 'react'
import moment from 'moment'
import 'moment/locale/es'
import axios from 'axios'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { withRouter, Link } from 'react-router-dom'


import Loader from '../Loader'

import Container from '@material-ui/core/Container';
import { HistoricContext } from '../../context/historicsContext';


moment.locale('es');

const Historic = props => {
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
        console.log(JSON.stringify(dataChart));
        const indicadorHistoric = historicContext.historic[props.indicador];
        if (indicadorHistoric && indicadorHistoric.values) {
            const newData = indicadorHistoric.values
            .filter(v => {
                if (v.date >= from && v.date <= to) {
                    return v;
                }})
            .map(v => {
                return {
                    fecha: moment.unix(v.date).utc().format("D MMM YY"),
                    valor: v.rate
                }});

            setDataChart(newData);
        }
        else {
            setDataChart([])
        }

    }, [from, to, historicContext.historic])

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
            historicContext.error ? <p>{historicContext.error}</p> :
                <Container>
                    <div><Link to="/">home</Link></div>
                    <div>
                        {renderLineChart}
                    </div>
                </Container>
    );
}

export default withRouter(Historic);