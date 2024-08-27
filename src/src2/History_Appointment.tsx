import React, { useEffect } from 'react'
import styled from 'styled-components';
import AppointmentsTable from './component2/Apointment_table';
import { apis2 } from '../apis';
import { useParams } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTheme } from '../templates/styles/theme';

const StyledDatePicker = styled(DatePicker)`
    margin: 20px;
    width: 200px;
    border-radius: 5px;
`;

const Headign = styled.h1`
    text-align: center;
    color: ${({ theme }) => theme.colors.primary};
`;

const MainContainer = styled.div`
  padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    min-height: 100vh;
`;

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const Message = styled.div`
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`;

function History_Appointment() {
    const { sub_id } = useParams();

    const [appointments, setAppointments] = React.useState<any[]>([]);
    const [page, setPage] = React.useState(1);
    const [date, set_date] = React.useState('');
    const [isDataRemaining, setIsDataRemaining] = React.useState(true);

    const prevPageRef = React.useRef(page);
    const prevDateRef = React.useRef(date);

    useEffect(() => {
        async function fetch() {
            const response = await apis2.get(`/manage/appointment/queue/${sub_id}/full_history?&page=${page}&date=${date}`);
            if (response.data.results.length === 0) {
                setIsDataRemaining(false);
                return;
            }
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
            if (response.data.next === null) {
                setIsDataRemaining(false);
            }

            prevPageRef.current = page;
            prevDateRef.current = date;
        }
        fetch();
    }, [page, date]);

    const MarkAppointmentComplete = async (id: number, appointment_type: string) => {
        const res = await apis2.get(`/manage/appointment/compelet/${id}/${appointment_type}`);
        console.log('Response:', res);
        if (res.status === 200) {
            console.log('Appointment marked as complete');
            // Remove the appointment from the queue
            setAppointments((prev) => prev.filter((appointment) => appointment.id !== id));
        }
    };

    // Define table columns
    const columns = React.useMemo(
        () => [
            { Header: 'Queue Number', accessor: 'que_number' },
            { Header: 'Patient Name', accessor: 'patient_name' },
            { Header: 'Appointment Type', accessor: 'appointment_type' },
            { Header: 'Date', accessor: 'date' },
            { Header: 'Time', accessor: 'time' },
            { Header: 'Status', accessor: 'appointment_status' }
        ],
        []
    );

    const { theme } = useTheme();
    const color = theme.colors.primary;

    return (
        <MainContainer>
            <Headign>History Appointment</Headign>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledDatePicker label="Appointment Date" onChange={(newValue) => {
                    if (!newValue || newValue === null) {
                        return;
                    }
                    setPage(1);
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
            <AppointmentsTable MarkAppointmentComplete={MarkAppointmentComplete} columns={columns} data={appointments} />
            {
                isDataRemaining ?
                    <StyledButton onClick={() => setPage(page + 1)}>Load More</StyledButton>
                    : <Message>
                        No more data
                    </Message>
            }
        </MainContainer>
    )
}

export default History_Appointment