// src/components/Dashboard.js

import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import styled from 'styled-components';
import { TableInstance, useTable } from 'react-table';
// import { Bar, Pie } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { useTheme } from '../../templates/styles/theme';
import AppointmentManager from '../Booking_componet';
import Divider from '@mui/material/Divider';


// Styled-components for custom styling
const DashboardContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const StatCard = styled(Card)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const TableContainer = styled.div`
  margin-top: 20px;
`;

const Styledtable = styled.table`
    border-collapse: collapse;
    width: 100%;
    
    th,
    td {
        border: 1px solid ${({ theme }) => theme.colors.gray};
        padding: 8px;
    }
    
    th {
        background-color: ${({ theme }) => theme.colors.primary};
        color: white;
    }

    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
    `;

const StyledGrid = styled(Grid)`
    border-radius: 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const StyledStatCard = styled(StatCard)`
    border-radius: 0px;
    background: ${({ theme }) => theme.colors.background};
    `;

const StyledCardContent = styled(CardContent)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
    flex-direction: column;
    font-size: 1rem;
    border-radius: 0px;
    `;



const Dashboard2 = ({ data }: any) => {
    const { theme } = useTheme();
    // Table columns and data
    const doctorColumns = React.useMemo(
        () => [
            { Header: 'Doctor Name', accessor: 'name' }
        ],
        []
    );

    const nurseColumns = React.useMemo(
        () => [
            { Header: 'Nurse Name', accessor: 'name' }
        ],
        []
    );

    const doctorTableData = React.useMemo(
        () => {
            if (data.doctor_list) {
                return data.doctor_list.map((name: any) => ({ name }));
            }
            else {
                return []
            }
        },
        [data.doctor_list]
    );

    const nurseTableData = React.useMemo(
        () => {
            if (data.nurse_list) {
                return data.nurse_list.map((name: any) => ({ name }));
            }
            else {
                return []
            }
        },
        [data.nurse_list]
    );

    const doctorTableInstance = useTable({ columns: doctorColumns, data: doctorTableData });
    const nurseTableInstance = useTable({ columns: nurseColumns, data: nurseTableData });

    // Render table
    const renderTable = (tableInstance: TableInstance<{ [x: string]: {}; }>) => (
        <Styledtable {...tableInstance.getTableProps()} style={{ width: '100%', marginTop: 10 }}>
            <thead>
                {tableInstance.headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()} style={{ textAlign: 'left', padding: '8px' }}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...tableInstance.getTableBodyProps()}>
                {tableInstance.rows.map(row => {
                    tableInstance.prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()} style={{ padding: '8px' }}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </Styledtable>
    );

    return (
        <DashboardContainer>
            <AppointmentManager />
            {/* divider */}
            <Divider sx={{
                marginTop: 2,
                marginBottom: 10,
                backgroundColor: theme.colors.gray,
                height: 1.1,
                width: '100%',
            }} />
            <StyledGrid container spacing={0}>
                {[
                    { label: 'Doctors', value: data.doctors },
                    { label: 'Nurses', value: data.nurses },
                    { label: 'Appointments', value: data.appointments },
                    { label: 'Staffs', value: data.staffs },
                    { label: 'Facilities', value: data.facilities },
                    { label: 'Room Occupancies', value: data.room_occupancies }
                ].map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <motion.div whileHover={{ boxShadow: `0px 0px 10px 0px ${theme.colors.primary}88` }}>
                            <StyledStatCard>
                                <StyledCardContent>
                                    <Typography style={{
                                        fontSize: '1.5rem',
                                    }} variant="h5" component="div">{item.label}</Typography>
                                    <Typography style={{
                                        fontSize: '1.5rem',
                                    }} variant="h4">{item.value}</Typography>
                                </StyledCardContent>
                            </StyledStatCard>
                        </motion.div>
                    </Grid>
                ))}
            </StyledGrid>
            {/* Tables */}
            <TableContainer style={{
                display: 'none'
            }}>
                {renderTable(doctorTableInstance)}
                {renderTable(nurseTableInstance)}
            </TableContainer>
        </DashboardContainer>
    );
};

export default Dashboard2;
