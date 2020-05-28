import React from 'react'
import { withRouter } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import { makeStyles } from '@material-ui/core/styles';


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
    },
    icon: {
        color: '#3f51b5',
        marginLeft: 5
    }
}));

const IndicadorCard = (props) => {
    const indicador = props.indicador;
    const classes = useStyles();

    const leftText = indicador.unit == "dolar" ? "USD$" :
        indicador.unit == "pesos" ? "CLP$" : '';
    const rightText = indicador.unit == "porcentual" ? "%" : ''
    return (
        <Grid key={indicador} item>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography
                        className={classes.title}
                        component="h5"
                        variant="h5">
                        {indicador.key.toUpperCase()}
                        <Tooltip title={indicador.name} aria-label="add">
                            <InfoRoundedIcon className={classes.icon} fontSize="small" />
                        </Tooltip>
                    </Typography>
                    <Typography
                        className={classes.title}
                        variant="subtitle1"
                        color="textSecondary">
                        {`${leftText} ${indicador.value} ${rightText}`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        className={classes.button}
                        size="small"
                        onClick={()=> {props.history.push(`${indicador.frecuency}/${indicador.key}`)}}>
                        Ver histórico
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default withRouter(IndicadorCard);