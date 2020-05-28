import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 60
    },
    icon: {
        color: '#3f51b5',
    }
}));

const Error = props => {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Grid container justify="center">
                <WarningRoundedIcon className={classes.icon} />
            </Grid>
            <Grid container justify="center">
                <Typography
                    component="h5"
                    variant="h5">
                    {props.msg}
                </Typography>
            </Grid>
        </Container>
    );
}

export default Error;