import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import queryString from 'query-string';
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header(location) {

    const name = queryString.parse(location.search);

    const classes = useStyles();


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        Coronavirus Buildings
                    </Typography>
                    <Typography variant="h6" style={{ marginRight: '15px' }}>Your name</Typography>
                    <Link to={`/`} style={{ color: 'white', textDecoration: 'none' }}>
                        <Button color="inherit" style={{ color: 'white', textDecoration: 'none' }} >Logout</Button>

                    </Link>





                </Toolbar>
            </AppBar>
        </div>
    );
}
