import React from 'react';
import moment from 'moment'
import MomentUtils from '@date-io/moment';
import 'moment/locale/es'

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 250
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        padding: 40
    },
    button: {
        margin: theme.spacing(1),
    },
    card: {
        marginTop:20,
    },
    CardContent: {
        padding: 24
    }
}));

const SearchForm = (props) => {
    const classes = useStyles();
    const [from, setFromDate] = React.useState(moment.unix(props.from).utc().startOf(props.frecuency === "daily" ? 'day': 'month'));
    const [to, setToDate] = React.useState(moment.unix(props.to).utc().startOf(props.frecuency === "daily" ? 'day': 'month'));

    const searchHandler = event => {
        event.preventDefault();
        const fromDate = from.unix();
        const toDate = to.unix();
        props.searchHandler(fromDate, toDate);
    }

    return (
        <Card className={classes.card} variant="outlined">
            <CardContent className={classes.CardContent}>
                <Grid container justify="space-around">
                    <MuiPickersUtilsProvider utils={MomentUtils} locale='es'>
                        <KeyboardDatePicker
                            label="Desde"
                            value={from}
                            onChange={date => setFromDate(date)}
                            format={props.frecuency === "daily" ? "D MMM YYYY" : "MMM YYYY"}
                        />
                        <KeyboardDatePicker
                            label="Hasta"
                            value={to}
                            onChange={date => setToDate(date)}
                            format={props.frecuency === "daily" ? "D MMM YYYY" : "MMM YYYY"}
                        />
                    </MuiPickersUtilsProvider>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SearchRoundedIcon />}
                        onClick={(event) => searchHandler(event)} >
                        Buscar
                    </Button>
                </Grid>
            </CardContent>
        </Card >
    );
}
export default SearchForm;