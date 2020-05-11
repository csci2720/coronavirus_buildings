import React from 'react';
import { useTable, useFilters, useGlobalFilter, usePagination, useSortBy } from "react-table";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";


const data = [
    { district: "Wan Chai", building: "Block C, Villa Lotto", cases: "2", ages: "51,22", resident: "HK Resident", date: "05/03/2020" },
    { district: "Tai Po", building: "Tower 1, La Grove", cases: "1", ages: "45", resident: "Non-local", date: "05/04/2020" },
    { district: "Central and Western", building: "18 Stanley Main Street", cases: "1", ages: "33", resident: "HK Resident", date: "11/03/2020" },
    { district: "Wan Chai", building: "Block C, Villa Lotto", cases: "2", ages: "45, 34", resident: "HK Resident", date: "05/03/2020" },
    { district: "Tai Po", building: "Tower 1, La Grove", cases: "1", ages: "45", resident: "Non-local", date: "05/04/2020" },
    { district: "Central and Western", building: "18 Stanley Main Street", cases: "1", ages: ["33"], resident: "HK Resident", date: "11/03/2020" },
    { district: "Wan Chai", building: "Block C, Villa Lotto", cases: "2", ages: "33, 24", resident: "HK Resident", date: "05/03/2020" },
    { district: "Tai Po", building: "Tower 1, La Grove", cases: "1", ages: "45", resident: "Non-local", date: "05/04/2020" },
    { district: "Central and Western", building: "18 Stanley Main Street", cases: "1", ages: "33", resident: "HK Resident", date: "11/03/2020" },
    { district: "Wan Chai", building: "Block C, Villa Lotto", cases: "2", ages: "51,22", resident: "HK Resident", date: "05/03/2020" },
    { district: "Tai Po", building: "Tower 1, La Grove", cases: "1", ages: "45", resident: "Non-local", date: "05/04/2020" },
    { district: "Central and Western", building: "18 Stanley Main Street", cases: "1", ages: "33", resident: "HK Resident", date: "11/03/2020" },
    { district: "Wan Chai", building: "Block C, Villa Lotto", cases: "2", ages: "45, 34", resident: "HK Resident", date: "05/03/2020" },
    { district: "Tai Po", building: "Tower 1, La Grove", cases: "1", ages: "45", resident: "Non-local", date: "05/04/2020" },
    { district: "Central and Western", building: "18 Stanley Main Street", cases: "1", ages: ["33"], resident: "HK Resident", date: "11/03/2020" },
    { district: "Wan Chai", building: "Block C, Villa Lotto", cases: "2", ages: "33, 24", resident: "HK Resident", date: "05/03/2020" },
    { district: "Tai Po", building: "Tower 1, La Grove", cases: "1", ages: "45", resident: "Non-local", date: "05/04/2020" },
    { district: "Central and Western", building: "18 Stanley Main Street", cases: "1", ages: "33", resident: "HK Resident", date: "11/03/2020" },
    { district: "Wan Chai", building: "Block C, Villa Lotto", cases: "2", ages: "51,22", resident: "HK Resident", date: "05/03/2020" },
    { district: "Tai Po", building: "Tower 1, La Grove", cases: "1", ages: "45", resident: "Non-local", date: "05/04/2020" },
    { district: "Central and Western", building: "18 Stanley Main Street", cases: "1", ages: "33", resident: "HK Resident", date: "11/03/2020" },
    { district: "Wan Chai", building: "Block C, Villa Lotto", cases: "2", ages: "45, 34", resident: "HK Resident", date: "05/03/2020" },
    { district: "Tai Po", building: "Tower 1, La Grove", cases: "1", ages: "45", resident: "Non-local", date: "05/04/2020" },
    { district: "Central and Western", building: "18 Stanley Main Street", cases: "1", ages: ["33"], resident: "HK Resident", date: "11/03/2020" },
    { district: "Wan Chai", building: "Block C, Villa Lotto", cases: "2", ages: "33, 24", resident: "HK Resident", date: "05/03/2020" },
    { district: "Tai Po", building: "Tower 1, La Grove", cases: "1", ages: "45", resident: "Non-local", date: "05/04/2020" },
    { district: "Central and Western", building: "18 Stanley Main Street", cases: "1", ages: "33", resident: "HK Resident", date: "11/03/2020" },
];


const columns = [
    {
        Header: "District 🔽",
        accessor: "district",
        Footer: "Name",
        sortType: "basic"
    },
    {
        Header: "Building 🔽",
        accessor: "building",
        Footer: "Name",
        sortType: "basic"
    },
    {
        Header: "Case No. 🔽",
        accessor: "cases",
        sortType: "basic"
    },
    {
        Header: "Ages 🔽",
        accessor: "ages",
        sortType: "basic"
    },
    {
        Header: "Resident 🔽",
        accessor: "resident",
        sortType: "basic"
    },
    {
        Header: "Date 🔽",
        accessor: "date",
        sortType: "basic"
    }
]

const DefaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter }
}) => {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ""}
            onChange={e => {
                setFilter(e.target.value || undefined);
            }}
            placeholder={`Search ${count} records...`}
        />
    );
};


const TableData = () => {
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
            data,
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
        <div style={{ padding: '30px' }}>
            <MaUTable {...getTableProps()}>
                <TableHead>
                    {headerGroups.map(headerGroup => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (

                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                                    </span>
                                    <div>{column.canFilter ? column.render("Filter") : null}</div>
                                </th>
                            ))}
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableHead
                            colSpan={visibleColumns.length}
                            style={{
                                textAlign: "left"
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
                                {row.cells.map(cell => {
                                    return <TableCell {...cell.getCellProps()}>{cell.render("Cell")}</TableCell>;
                                })}

                            </TableRow>
                        );
                    })}
                </TableBody>
            </MaUTable>
            <div>
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
    );
};



export default TableData;
