// import React from 'react';
// import { useLocation } from 'react-router';

// const DetailedView = (props) => {

//     const location = useLocation()

//     return (
//         <div >
//             <h2>District: {location.data.district} </h2>
//             <h2>Building: {location.data.building} </h2>
//             <h2>Age: {location.data.ages} </h2>
//             <h2>Cases: {location.data.cases} </h2>
//             <h2>Date: {location.data.date} </h2>
//         </div>
//     );
// }

// export default DetailedView;
import React from 'react';
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
import MapDetail from './MapDetail';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 24,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const DetailedView = (props) => {

    const location = useLocation()

    const data = [
        { name: 'District', data: location.data.district },
        { name: 'Building Name', data: location.data.building },
        { name: 'Last Date of Visit', data: location.data.date },
        { name: 'Related Cases No.', data: location.data.cases },
        { name: 'Patient Age(s)', data: location.data.ages },
        { name: 'Patient Gender(s', data: location.data.genders }
    ];

    return (
        <div>
            <Header />
            <div style={{
                marginTop: '40px', marginLeft: '70px', align: "center"
            }}>
                <h1>Details</h1>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>

                <div >
                    <TableContainer component={Paper} style={{ marginTop: '20px', marginLeft: '70px', width: '650px', height: '400px' }}>
                        <Table aria-label="customized table" >

                            <TableBody >
                                {data.map((row) => (
                                    <StyledTableRow key={row.name}  >
                                        <StyledTableCell component="th" scope="row" >
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.data}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div >
                <div style={{ marginLeft: '70px', marginTop: '20px', width: '750px', height: '300px' }}><MapDetail loc={data.data} /></div>

            </div >
        </div>
    );
}


export default DetailedView;
