import { useState, useMemo } from 'react';
import { TableInstance, useTable } from 'react-table';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import styled from 'styled-components';

const CompleteButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    color: '#fff';
    border: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
`;

const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;

    @media (max-width: 768px) {
        table {
            width: 100%;
            display: block;
            overflow-x: auto;
            white-space: nowrap;
        }

        th, td {
            text-align: left;
            padding: 8px;
            box-sizing: border-box;
        }
        tr{
            margin-bottom: 10px;
            border: 1px solid #f4f4f4;
            width: 100%;
        }
        th {
            background: #f4f4f4;
        }
            tbody {
                width: 100%;
                display: block;
                align-items: center;
                justify-content: center;
            }
    }
`;

const AppointmentsTable = ({ columns, data, MarkAppointmentComplete }: any) => {
    console.log(data, 'data');
    // State for search input
    const [searchInput, setSearchInput] = useState('');

    // Filter data based on the search input
    const filteredData = useMemo(() => {
        if (!searchInput) return data;

        return data.filter((row: { [x: string]: any; }) => {
            return columns.some((column: { accessor: string | number; }) => {
                const cellValue = row[column.accessor];
                if (cellValue) {
                    return String(cellValue).toLowerCase().includes(searchInput.toLowerCase());
                }
                return false;
            });
        });
    }, [searchInput, data, columns]);

    // Create table instance
    const tableInstance = useTable({
        columns,
        data: filteredData,
    });

    interface RowOriginal {
        id: number;
    }
    // Render table
    const renderTable = (tableInstance: TableInstance<{}>) => (
        <table {...tableInstance.getTableProps()} style={{ width: '100%', marginTop: 10 }}>
            <thead>
                {tableInstance.headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()} style={{ textAlign: 'left', padding: '8px' }} key={column.id}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...tableInstance.getTableBodyProps()}>
                {tableInstance.rows.map((row) => {
                    tableInstance.prepareRow(row);
                    return (
                        <tr style={{
                            height: '70px',
                        }}  {...row.getRowProps()} key={row.id}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()} style={{ padding: '8px' }} key={cell.column.id}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                            <td >
                                {row.values.appointment_status === 'Pending' ? (<CompleteButton
                                    onClick={() => {
                                        let id = (row.original as RowOriginal).id;
                                        MarkAppointmentComplete(id, row.values.appointment_type)
                                    }}
                                    style={{ border: 'none', cursor: 'pointer' }}
                                >
                                    <TaskAltIcon style={{ color: '#fff', fontSize: 20 }} />
                                </CompleteButton>) : null}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

    return (
        <div>
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
            />
            <TableContainer>
                {renderTable(tableInstance)}
            </TableContainer>
        </div>
    );
};

export default AppointmentsTable;
