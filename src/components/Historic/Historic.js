import React, { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/es'
import axios from 'axios'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { withRouter, Link } from 'react-router-dom'


import Loader from '../Loader'

import Container from '@material-ui/core/Container';


moment.locale('es');

const Historic = props => {
    const [values, setValues] = useState(null);
    const [minDate, setMinDate] = useState(0);
    const [maxDate, setMaxDate] = useState(0);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        const to = moment().utc().startOf('day').unix();
        const fromPeriod = props.frecuency === "daily" ? 'month' : 'year';
        const from = moment().utc().startOf('day').subtract(5, fromPeriod).unix();

        axios.get(`http://localhost:2000/values/${props.indicador}?from=${from}&to=${to}`)
            .then(res => {
                setValues(res.data.data.values);
                setMinDate(res.data.data.min_date);
                setMaxDate(res.data.data.max_date);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                setError("Error al cargar la información.")
            })
    }, []);

    const data = !values ? null :
        values.map(v => {
            return {
                fecha: moment.unix(v.date).utc().format("D MMM YY"),
                valor: v.rate
            }
        });
    
        console.log(data);
        
    
    const renderLineChart = (
        <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="valor" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
        </LineChart>
    );

    return (
        isLoading ? <Loader /> :
            error ? <p>{error}</p> :
                <Container>
                    <div><Link to="/">home</Link></div>
                    <div>
                        {renderLineChart}
                    </div>
                </Container>
    );
}

export default withRouter(Historic);