//Dildakhan Darkhan (1155086654)
//Jumageldiyev Myratgeldi (1155118066)
//Manuchehr Tursunov (1155118876)
import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useLocation } from 'react-router';
import MapDetail, { MapComponent } from './MapDetail';

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


//detailed view of user's selected location
const DetailedView = (props) => {

    const location = useLocation()

    const data = [
        { name: 'District', data: location.data.district },
        { name: 'Building Name', data: location.data.building },
        { name: 'Last Date of Visit', data: location.data.date },
        { name: 'Related Cases No.', data: location.data.cases },
        { name: 'Patient Age(s)', data: location.data.ages },
        { name: 'Patient Gender(s)', data: location.data.genders }
    ];

    const addCom = () => {
        alert("Comment added")
    }

    // const commentHandle = (e) => {
    //     let temp = e.target.value
    //     setComment(temp)

    // }




    console.log("details: ", data)
    return (
        <div>
            {/* <Header /> */}
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
                <div style={{ marginLeft: '70px', marginTop: '20px', width: '750px', height: '300px' }}><MapDetail /></div>

            </div >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField id="outlined-basic" label="New comment" variant="outlined" style={{ marginTop: '20px', marginLeft: "70px", height: '50px', width: '260px' }} />
                <Button onClick={addCom} variant="outlined" color="primary" style={{ height: '40px', width: '195px', marginTop: '20px', marginLeft: "70px" }} type="submit">Add Comment</Button>
            </div>
        </div>
    );
}


export default DetailedView;








