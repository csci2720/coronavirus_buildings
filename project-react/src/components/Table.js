import React, { useState, useEffect } from 'react';
import { useTable, useFilters, useGlobalFilter, usePagination, useSortBy } from "react-table";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DetailedView from './DetailedView';
import Register from './Register';
import { Link } from "react-router-dom";
import About from './About';
import axios from 'axios'




const data = [
    { district: "Wan Chai", building: "Block C, Villa Lotto", cases: "2", ages: "51,22", genders: "Male, Female", date: "05/03/2020" },
    { district: "Tai Po", building: "Tower 1, La Grove", cases: "1", ages: "45", genders: "Male", date: "05/04/2020" },
    { district: "Central and Western", building: "18 Stanley Main Street", cases: "1", ages: "33", genders: "Male", date: "11/03/2020" },
    { district: "Wan Chai", building: "Block C, Villa Lotto", cases: "2", ages: "51,22", genders: "Male, Female", date: "05/03/2020" },
    { district: "Tai Po", building: "Tower 1, La Grove", cases: "1", ages: "45", genders: "Male", date: "05/04/2020" },
    { district: "Central and Western", building: "18 Stanley Main Street", cases: "1", ages: "33", genders: "Male", date: "11/03/2020" },
    { district: "Wan Chai", building: "Block C, Villa Lotto", cases: "2", ages: "51,22", genders: "Male, Female", date: "05/03/2020" },
    { district: "Tai Po", building: "Tower 1, La Grove", cases: "1", ages: "45", genders: "Male", date: "05/04/2020" },
    { district: "Central and Western", building: "18 Stanley Main Street", cases: "1", ages: "33", genders: "Male", date: "11/03/2020" },
    { district: "Wan Chai", building: "Block C, Villa Lotto", cases: "2", ages: "51,22", genders: "Male, Female", date: "05/03/2020" },
    { district: "Tai Po", building: "Tower 1, La Grove", cases: "1", ages: "45", genders: "Male", date: "05/04/2020" },
    { district: "Central and Western", building: "18 Stanley Main Street", cases: "1", ages: "33", genders: "Male", date: "11/03/2020" },
    { district: "Wan Chai", building: "Block C, Villa Lotto", cases: "2", ages: "51,22", genders: "Male, Female", date: "05/03/2020" },
    { district: "Tai Po", building: "Tower 1, La Grove", cases: "1", ages: "45", genders: "Male", date: "05/04/2020" },
    { district: "Central and Western", building: "18 Stanley Main Street", cases: "1", ages: "33", genders: "Male", date: "11/03/2020" },
    { district: "Wan Chai", building: "Block C, Villa Lotto", cases: "2", ages: "51,22", genders: "Male, Female", date: "05/03/2020" },
    { district: "Tai Po", building: "Tower 1, La Grove", cases: "1", ages: "45", genders: "Male", date: "05/04/2020" },
    { district: "Central and Western", building: "18 Stanley Main Street", cases: "1", ages: "33", genders: "Male", date: "11/03/2020" },
];


const columns = [
    {
        Header: "District 🔽",
        accessor: "district",
        sortType: "basic"
    },
    {
        Header: "Building 🔽",
        accessor: "building",
        sortType: "basic"
    },
    {
        Header: "Last Date of Visit 🔽",
        accessor: "date",
        sortType: "basic"
    },
    {
        Header: "Related Cases No. 🔽",
        accessor: "cases",
        sortType: "basic"
    },
    {
        Header: "Patient Age(s) 🔽",
        accessor: "ages",
        sortType: "basic"
    },
    {
        Header: "Patient Gender(s) 🔽",
        accessor: "genders",
        sortType: "basic"
    },

]

const DefaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter }
}) => {
    const count = preFilteredRows.length;

    return (
        <input
            style={{ width: '100px' }}
            value={filterValue || ""}
            onChange={e => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`Search ${count} records...`}
        />
    );
};

const useStyles = makeStyles({
    root: {
        width: '95%',
        padding: '15px'
    },
    container: {
        maxHeight: 440,
    },
    text: {
        fontSize: '14px',
        fontStyle: 'bold'
    }
});

const data1 = []

const TableData = (props) => {

    const [favs, setFav] = useState([]);
    // const [allData, setAllData] = useState([]);

    //data1 = props.data

    useEffect(async () => {
        // Update the document title using the browser API
        // setAllData(props.data)
        data1 = await props.data
        console.log(data1)
    }, []);

    const addFavourite = async (info) => {

        // setFav([...favs, info]);

        // await fetch("https://cors-anywhere.herokuapp.com/http://localhost:3000/api/admin/loadData")
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             //setList(result.items)
        //             console.log(result)
        //         },
        //         // Note: it's important to handle errors here
        //         // instead of a catch() block so that we don't swallow
        //         // exceptions from actual bugs in components.
        //         (error) => {
        //             console.log("ERRORRRR")
        //         }
        //     )
        // console.log(favs)

        alert("Added to favourites succesfully!")

    }

    const filterTypes = React.useMemo(
        () => ({
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            }
        }),
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter
        }),
        []
    );
    const classes = useStyles();

    const {

        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data1,
            defaultColumn,
            filterTypes,
            initialState: { pageIndex: 0 }
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    return (
        <div>
            <div style={{ marginLeft: '0px', display: 'flex', flexDirection: 'column' }} >
                <div style={{ marginLeft: '20px' }}>
                    < Link style={{ textDecoration: 'none' }} to={{
                        pathname: `/favourites`,
                        list: favs,

                    }}>
                        <div className="regText"> <Button variant="outlined" color="primary">Favourites</Button> </div>
                    </Link>
                </div>
                <div style={{ margin: '20px', display: 'flex', flexDirection: 'column' }}  >

                    <Paper className={classes.root} style={{ width: '800px' }}>
                        <MaUTable {...getTableProps()} >
                            <TableHead >
                                {headerGroups.map(headerGroup => (
                                    <TableRow
                                        {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th >
                                                <div {...column.getHeaderProps(column.getSortByToggleProps())} className={classes.text}>
                                                    {column.render("Header")}
                                                    <span>
                                                        {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                                                    </span>

                                                </div>
                                                <div >{column.canFilter ? column.render("Filter") : null}</div>
                                            </th>
                                        ))}

                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableHead
                                        colSpan={visibleColumns.length}
                                        style={{
                                            textAlign: "left",
                                        }}
                                    >
                                    </TableHead>
                                </TableRow>
                            </TableHead>
                            <TableBody {...getTableBodyProps()}>
                                {page.map((row, i) => {
                                    prepareRow(row);
                                    return (

                                        <TableRow {...row.getRowProps()}>



                                            {
                                                row.cells.map(cell => {
                                                    return <TableCell {...cell.getCellProps()} >{cell.render("Cell")}</TableCell>;
                                                })
                                            }

                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                < Link to={{
                                                    pathname: `/details`,
                                                    data: row.original,

                                                }}>
                                                    <div className="regText"> <img style={{ width: '26px', height: '26px' }} src={require("../assets/detailsIcon.png")}></img></div>
                                                </Link>
                                                <Button variant="outlined" color="primary" style={{ height: '37px', fontSize: '8px', margin: '20px' }} onClick={(() => addFavourite(row.original))}>Add To Favourites</Button>

                                            </div>

                                        </TableRow>

                                    );
                                })}
                            </TableBody>
                        </MaUTable>
                    </Paper >
                    <div style={{ padding: '30px', display: 'flex', flexDirection: 'row' }}>
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            {"<<"}
                        </button>{" "}
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {"<"}
                        </button>{" "}
                        <button onClick={() => nextPage()} disabled={!canNextPage}>
                            {">"}
                        </button>{" "}
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            {">>"}
                        </button>{" "}
                        <span>
                            Page{" "}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{" "}
                        </span>
                        <span>
                            | Go to page:{" "}
                            <input
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                    gotoPage(page);
                                }}
                                style={{ width: "100px" }}
                            />
                        </span>{" "}
                        <select
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value));
                            }}
                        >
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>

                    </div>

                </div>
            </div>
        </div >
    );
};



export default TableData;
