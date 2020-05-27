import React from 'react';

import { keys } from '../utils/util'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minWidth: 300
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    container: {
        padding: 40
    },
    griptop: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export default function Home() {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Grid container className={classes.griptop} spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <Grid container justify="center" spacing={spacing}>
                        {keys.map((value) => (
                            <Grid key={value} item>
                                <Card className={classes.root}>
                                    <CardContent className={classes.content}>
                                        <Typography component="h5" variant="h5">{value.toUpperCase()}</Typography>
                                        <Typography variant="subtitle1" color="textSecondary">Mac Miller</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}