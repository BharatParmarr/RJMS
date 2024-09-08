// src/components/AppointmentQueue.js

import React, { useEffect, useRef } from 'react';
import { useTable } from 'react-table';
import { Typography, CardContent } from '@mui/material';
import useWebSocket from 'react-use-websocket';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { apis2 } from '../apis';
import CachedIcon from '@mui/icons-material/Cached';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTheme } from '../templates/styles/theme';
import AppointmentsTable from './component2/Apointment_table';

// Styled-components for custom styling
const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    max-width: 100%;
`;
const TableContainer = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 98%;
`;

const StyledCardContent = styled(CardContent)`
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
    width: 100%;
`;

const StyledTypography = styled(Typography)`
    color: ${({ theme }) => theme.colors.text};
`;



const Styledbutton = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    color: '#fff';
    border: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    position: fixed;
    right: 20px;
    top: 20px;
`;

const StyledDatePicker = styled(DatePicker)`
    margin: 20px;
    width: 200px;
    border-radius: 5px;
    top: 20px;
    left: 20px;
`;

const AppointmentQueue = () => {
    const { sub_id } = useParams();
    const { theme } = useTheme();
    const [appointments, setAppointments] = React.useState<any[]>([]);
    const [show_more, set_show_more] = React.useState(false);
    const [page, set_page] = React.useState(1);
    const [date, set_date] = React.useState('');

    const [is_connected, set_is_connected] = React.useState(true);

    // WebSocket URL (replace with your backend WebSocket URL)
    const socketUrl = 'ws://192.168.0.106:8000/ws/appointments/queue/' + `${sub_id}/${localStorage.getItem('token')}/`;

    useWebSocket(socketUrl, {
        onOpen: () => {
            console.log('WebSocket connection opened');
            set_is_connected(true);
        },
        onMessage: (event) => {
            const data = JSON.parse(event.data);
            console.log('Data41414:', data);
            if (data.appointments) {
                console.log(data.appointments, 'data.appointments');
                if (Array.isArray(data.appointments)) {
                    // If the data is an array, it means we received the pending appointments
                    setAppointments(data.appointments);
                } else {
                    // Otherwise, it's a new appointment
                    setAppointments((prev) => [...prev, data.appointments]);
                }
            }
        },
        onClose: () => {
            console.log('WebSocket connection closed');
        },
        onError: () => {
            console.log('WebSocket connection error');
        }
    });

    // Fetch appointments on component mount
    const prevPageRef = useRef(page);
    const prevDateRef = useRef(date);

    useEffect(() => {
        async function fetch() {
            const response = await apis2.get(`/manage/appointment/queue/${sub_id}?date=${date}&page=${page}`);

            if (prevDateRef.current !== date) {
                // Date has changed, replace old data with new data
                setAppointments(response.data.results);
            } else if (prevPageRef.current !== page) {
                // Page has changed, append new data to old data
                setAppointments(prevAppointments => [...prevAppointments, ...response.data.results]);
            } else {
                // Initial load or other cases
                setAppointments(response.data.results);
            }

            if (response.data.results.length === 0) {
                // No more data available, stop showing the 'Show More' button
                set_show_more(false);
            }

            // Update previous values
            prevPageRef.current = page;
            prevDateRef.current = date;
        }

        fetch();
    }, [page, date]);



    // Define table columns
    const columns = React.useMemo(
        () => [
            { Header: 'Queue', accessor: 'que_number' },
            { Header: 'Name', accessor: 'patient_name' },
            { Header: 'Appointment', accessor: 'appointment_type' },
            { Header: 'For', accessor: 'appointment_for' },
            { Header: 'Date', accessor: 'date' },
            { Header: 'Time', accessor: 'time' },
            { Header: 'Status', accessor: 'appointment_status' },
        ],
        []
    );

    const tableInstance = useTable({ columns, data: appointments });

    // Render table
    const renderTable = (_tableInstance: any, MarkAppointmentComplete: any) => (
        <AppointmentsTable MarkAppointmentComplete={MarkAppointmentComplete} columns={columns} data={appointments} />
    );

    // Mark appointment as complete
    const MarkAppointmentComplete = async (id: number, appointment_type: string) => {
        const res = await apis2.get(`/manage/appointment/compelet/${id}/${appointment_type}`);
        if (res.status === 200) {
            // Remove the appointment from the queue
            setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
        }
    };

    const color = theme.colors.text

    // chake the length of responce if it is not 40 or 80 or 120 until 1000 then set show_more to false
    function show_more_fun() {
        if (appointments.length % 40 === 0 && appointments.length !== 0) {
            // if (appointments.length === 40 || appointments.length === 80 || appointments.length === 120 || appointments.length === 160 || appointments.length === 200 || appointments.length === 240 || appointments.length === 280 || appointments.length === 320 || appointments.length === 360 || appointments.length === 400 || appointments.length === 440 || appointments.length === 480 || appointments.length === 520 || appointments.length === 560 || appointments.length === 600 || appointments.length === 640 || appointments.length === 680 || appointments.length === 720 || appointments.length === 760 || appointments.length === 800 || appointments.length === 840 || appointments.length === 880 || appointments.length === 920 || appointments.length === 960 || appointments.length === 1000) {
            return true;
        } else {
            return false;
        }
    }
    // useEffect(() => {
    //     // Create the meta tag
    //     const metaTag = document.createElement('meta');
    //     metaTag.name = 'viewport';
    //     metaTag.content = 'width=1024';
    //     document.head.appendChild(metaTag);

    //     // Cleanup function to remove the meta tag when the component unmounts
    //     return () => {
    //         document.head.removeChild(metaTag);
    //     };
    // }, []);

    return (
        <MainContainer>
            {/* Reload Button */}
            {is_connected ? null : (<Styledbutton onClick={() => window.location.reload()} >
                <CachedIcon />
            </Styledbutton>)}
            {/* date Change Button using mui */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledDatePicker label="Appointment Date" onChange={(newValue) => {
                    if (!newValue || newValue === null) {
                        return;
                    }
                    set_page(1);
                    const date = new Date(newValue as any);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                    const day = String(date.getDate()).padStart(2, '0');
                    // fetchAppointmentsDate(`${year}-${month}-${day}`);
                    set_date(`${year}-${month}-${day}`);
                }}
                    sx={{
                        svg: { color },
                        input: { color },
                        label: { color },
                        border: `1px solid ${color}`
                    }}
                />
            </LocalizationProvider>
            <TableContainer>
                <StyledCardContent>
                    <StyledTypography variant="h5">Appointment Queue</StyledTypography>
                    {renderTable(tableInstance, MarkAppointmentComplete)}
                </StyledCardContent>
            </TableContainer>
            {/* Show more Button */}
            {!show_more && show_more_fun()
                ? <Styledbutton style={{
                    position: 'relative',
                }} onClick={() => set_page(page + 1)} >
                    Show More
                </Styledbutton> : null}
        </MainContainer>
    );
};

export default AppointmentQueue;
