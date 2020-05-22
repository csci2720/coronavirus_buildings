//Dildakhan Darkhan (1155086654)
//Jumageldiyev Myratgeldi (1155118066)
//Manuchehr Tursunov (1155118876)
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { useLocation } from 'react-router';


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

export default function Header() {

    const location = useLocation()
    const [name, setName] = useState('');

    useEffect(() => {
        let user = location.data
        setName(user)

    }, []);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" className={classes.title}>
                        Residential Buildings of Conoravirus cases
                    </Typography>
                    <Typography variant="h6" style={{ marginRight: '15px' }}>{name}</Typography>
                    <Link to={`/`} style={{ color: 'white', textDecoration: 'none' }}>
                        <Button color="inherit" style={{ color: 'white', textDecoration: 'none' }} >Logout</Button>

                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}
