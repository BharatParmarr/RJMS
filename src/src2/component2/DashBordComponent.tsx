import styled from 'styled-components';
// import icons from material-ui icons
// import PersonIcon from '@mui/icons-material/Person';
// import BedroomChildRoundedIcon from '@mui/icons-material/BedroomChildRounded';
// import EditCalendarRoundedIcon from '@mui/icons-material/EditCalendarRounded';
// import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
// import { apis2 } from '../../apis';
// import { useEffect, useState } from 'react';

// import { useMemo } from 'react';
// import { Grid, Paper, Typography } from '@mui/material';
// import { styled as styledmui } from '@mui/system';
// import { useTable } from 'react-table';
// import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
// import { useParams } from 'react-router-dom';
// import Dashboard2 from './DashBordComponent2';

// const DashboardContainer2 = styledmui('div')({
//   padding: '20px',
//   position: 'relative',
//   minHeight: '100vh',
//   width: '100%',
// });

// const DataPaper = styledmui(Paper)({
//   padding: '20px',
//   marginBottom: '20px',
// });

// const Dashboard_sub_component = ({ data }: any) => {
//   const {
//     doctors,
//     nurses,
//     appointments,
//     staffs,
//     facilities,
//     room_occupancies,
//     doctor_list,
//     nurse_list,
//     appointment_list,
//     staff_list,
//     facility_list,
//     room_occupancy_list,
//   } = data;

//   const columns = useMemo(
//     () => [
//       {
//         Header: 'Doctors',
//         accessor: 'doctor',
//       },
//       {
//         Header: 'Nurses',
//         accessor: 'nurse',
//       },
//       {
//         Header: 'Appointments',
//         accessor: 'appointment',
//       },
//       {
//         Header: 'Staffs',
//         accessor: 'staff',
//       },
//       {
//         Header: 'Facilities',
//         accessor: 'facility',
//       },
//       {
//         Header: 'Room Occupancies',
//         accessor: 'room_occupancy',
//       },
//     ],
//     []
//   );

//   const tableData = useMemo(
//     () =>
//       doctor_list.map((doctor: any, index: string | number) => ({
//         doctor,
//         nurse: nurse_list[index] || '',
//         appointment: appointment_list[index] || '',
//         staff: staff_list[index] || '',
//         facility: facility_list[index] || '',
//         room_occupancy: room_occupancy_list[index] || '',
//       })),
//     [doctor_list, nurse_list, appointment_list, staff_list, facility_list, room_occupancy_list]
//   );

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
//     columns,
//     data: tableData,
//   });

//   const chartData = {
//     labels: ['Doctors', 'Nurses', 'Appointments', 'Staffs', 'Facilities', 'Room Occupancies'],
//     datasets: [
//       {
//         label: 'Counts',
//         data: [doctors, nurses, appointments, staffs, facilities, room_occupancies],
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//       },
//     ],
//   };

//   return (
//     <DashboardContainer2>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <DataPaper>
//             <Typography variant="h4" gutterBottom>
//               Dashboard
//             </Typography>
//             <Bar data={chartData} />
//           </DataPaper>
//         </Grid>
//         <Grid item xs={12}>
//           <DataPaper>
//             <Typography variant="h6" gutterBottom>
//               Data Table
//             </Typography>
//             <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
//               <thead>
//                 {headerGroups.map(headerGroup => (
//                   <tr {...headerGroup.getHeaderGroupProps()}>
//                     {headerGroup.headers.map(column => (
//                       <th {...column.getHeaderProps()} style={{ borderBottom: '1px solid black', padding: '10px' }}>
//                         {column.render('Header')}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>
//               <tbody {...getTableBodyProps()}>
//                 {rows.map(row => {
//                   prepareRow(row);
//                   return (
//                     <tr {...row.getRowProps()}>
//                       {row.cells.map(cell => (
//                         <td {...cell.getCellProps()} style={{ padding: '10px', borderBottom: '1px solid black' }}>
//                           {cell.render('Cell')}
//                         </td>
//                       ))}
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </DataPaper>
//         </Grid>
//       </Grid>
//     </DashboardContainer2>
//   );
// };


const DashboardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0 auto;
`;

// const Card = styled.div`
//   background-color: ${({ theme }) => theme.colors.cardBackground};
//   border-radius: 8px;
//   padding: 1.5rem;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//     justify-content: center;
//     height: auto;
// `;

// const CardTitle = styled.h3`
//   color: ${({ theme }) => theme.colors.text};
//   margin-bottom: 0.5rem;
// `;

// const CardValue = styled.p`
//   font-size: 2rem;
//   font-weight: bold;
//   color: ${({ theme }) => theme.colors.primary};
//   margin-bottom: 0.5rem;
// `;

// const IconWrapper = styled.div`
//   font-size: 2.5rem;
//   color: ${({ theme }) => theme.colors.secondary};
//   margin-bottom: 1rem;
// `;

// const ChartContainer = styled.div`
//   grid-column: 1 / -1;
//   background-color: ${({ theme }) => theme.colors.cardBackground};
//   border-radius: 8px;
//   padding: 1.5rem;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   height: auto;
// `;

// const ChartTitle = styled.h2`
//   color: ${({ theme }) => theme.colors.text};
//   margin-bottom: 1rem;
// `;

const DashboardComponetn = () => {


  return (
    <DashboardContainer>
      {/* <Dashboard_sub_component data={Dashbord_data} /> */}
      {/* <Card>
        <IconWrapper>
          <PersonIcon />
        </IconWrapper>
        <CardTitle>Total Doctors</CardTitle>
        <CardValue>48</CardValue>
      </Card>
      <Card>
        <IconWrapper>
          <BedroomChildRoundedIcon />
        </IconWrapper>
        <CardTitle>Available Beds</CardTitle>
        <CardValue>125</CardValue>
      </Card>
      <Card>
        <IconWrapper>
          <EditCalendarRoundedIcon />
        </IconWrapper>
        <CardTitle>Appointments Today</CardTitle>
        <CardValue>32</CardValue>
      </Card>
      <Card>
        <IconWrapper>
          <BarChartRoundedIcon />
        </IconWrapper>
        <CardTitle>Revenue This Month</CardTitle>
        <CardValue>$125,000</CardValue>
      </Card>
      <ChartContainer>
        <ChartTitle>Patient Statistics</ChartTitle>
      <p>Chart placeholder - Add your preferred chart library component here</p>
    </ChartContainer> */}
    </DashboardContainer >
  );
};

export default DashboardComponetn;