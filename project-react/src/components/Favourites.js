
import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useLocation } from 'react-router';
import Header from './Header';
import Map from './Map';




const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


const Favourites = (props) => {

    const [fav, setFav] = useState([]);


    const location = useLocation();


    useEffect(() => {
        if (location.list != null) {
            // Update the document title using the browser API
            setFav([...fav, location.list]);
        }
    }, []);



    const test = () => {
        console.log("list: ", location.list)
        console.log("state: ", fav)

    }
    // const data = [
    //     { name: 'District', data: location.data.district },
    //     { name: 'Building Name', data: location.data.building },
    //     { name: 'Last Date of Visit', data: location.data.date },
    //     { name: 'Related Cases No.', data: location.data.cases },
    //     { name: 'Patient Age(s)', data: location.data.ages },
    //     { name: 'Patient Gender(s', data: location.data.genders }
    // ];

    const classes = useStyles();
    return (
        <div>
            <Header />
            <button onClick={test}>test</button>
            <div style={{
                marginTop: '50px', marginLeft: '50px', align: "center"
            }}>
                <h2>Favourites</h2>
            </div>
            <div style={{
                margin: '50px', marginLeft: '50px', align: "center"
            }}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>District</TableCell>
                                <TableCell align="right">Building</TableCell>
                                <TableCell align="right">Last Date of Visit</TableCell>
                                <TableCell align="right">Related Cases No.</TableCell>
                                <TableCell align="right">Patient Age(s)</TableCell>
                                <TableCell align="right">Patient Gender(s)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>


                            {fav.map((rows) => (rows.map((row) => (
                                <TableRow key={row.building}>
                                    <TableCell component="th" scope="row">
                                        {row.district}
                                    </TableCell>
                                    <TableCell align="right">{row.building}</TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                    <TableCell align="right">{row.cases}</TableCell>
                                    <TableCell align="right">{row.ages}</TableCell>
                                    <TableCell align="right">{row.genders}</TableCell>
                                </TableRow>
                            ))))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}




export default Favourites;



