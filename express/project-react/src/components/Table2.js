//Dildakhan Darkhan (1155086654)
//Jumageldiyev Myratgeldi (1155118066)
//Manuchehr Tursunov (1155118876)
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const columns = [
    { id: 'district', label: 'District', minWidth: 170 },
    { id: 'building', label: 'Building', minWidth: 100 },
    {
        id: 'cases',
        label: 'Related Cases No.',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'ages',
        label: 'Age(s)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'genders',
        label: 'Gender(s)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },

    {
        id: 'date',
        label: 'Date',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
    {
        label: 'More actions',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];



const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});


//show a single table from two data sets
export default function Table2(props) {
    const classes = useStyles();

    const [favs, setFav] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const addFavourite = async (info) => {

        setFav([...favs, info]);
        alert("Added to favourites succesfully!")

    }


    return (
        <div>
            <div style={{ marginLeft: '0px', display: 'flex', flexDirection: 'column' }} ></div>
            <div style={{ marginLeft: '20px' }}>
                < Link style={{ textDecoration: 'none' }} to={{
                    pathname: `/favourites`,
                    list: favs,

                }}>
                    <div className="regText"> <Button variant="outlined" color="primary">Favourites</Button> </div>
                </Link>
            </div>

            <div style={{ margin: '30px', marginTop: '15px', width: '1300px' }}>
                <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                < Link to={{
                                                    pathname: `/details`,
                                                    data: row,

                                                }}>
                                                    <div className="regText"> <img style={{ width: '26px', height: '26px' }} src={require("../assets/detailsIcon.png")}></img></div>
                                                </Link>
                                                <Button variant="outlined" color="primary" style={{ height: '37px', fontSize: '8px', margin: '20px' }} onClick={(() => addFavourite(row))}>Add To Favourites</Button>

                                            </div>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={props.data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        </div>
    );
}






