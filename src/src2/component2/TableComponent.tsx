import React from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';

const TableWrapper = styled.div`
  margin: 20px 0;
  width: 100%;
  overflow-x: auto;
  background-color: ${({ theme }) => theme.colors.background};
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.white};

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  }

  th {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const TableComponent = ({ data, columns }: any) => {
    const tableData = React.useMemo(() => data, [data]);
    const tableColumns = React.useMemo(
        () => columns.map((col: string) => ({ Header: col, accessor: col.replace(/ /g, '_').toLowerCase() })),
        [columns]
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns: tableColumns,
        data: tableData,
    });

    return (
        <TableWrapper>
            <StyledTable {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </StyledTable>
        </TableWrapper>
    );
};
