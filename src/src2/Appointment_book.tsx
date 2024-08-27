// src/components/CreateAppointment.js

import { useEffect, useState } from 'react';
import { Button, TextField, Grid, Card, Typography, Switch } from '@mui/material';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import axios from 'axios';
import styled from 'styled-components';
import API_HOST from '../config';
import { useParams } from 'react-router-dom';
import { useTheme } from '../templates/styles/theme';
import Room_book from './component2/Room_book';
import { apis2 } from '../apis';

// Styled-components for custom styling
const FormContainer = styled(Card)`
  margin: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.white};
    width: 95%;
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

const StyledTypography = styled(Typography)`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
`;

const Styledform = styled.form`
  width: 100%;
    display: flex;
    background-color: ${({ theme }) => theme.colors.background};
    flex-direction: column;
    margin-top: 20px;
`;

const StyledGrid = styled(Grid)`
  margin-top: 20px;
`;

const StyledTextField = styled(TextField)`
    border-radius: 10px;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;


// Create appointment form component for bed
function Bed_book({ id }: any) {
    const { theme } = useTheme();
    const [is_occupied, setIs_occupied] = useState(false);

    useEffect(() => {
        const res = apis2.get('/bed_book/' + id);
        res.then((response) => {
            if (response.status === 200) {
                setIs_occupied(response.data.is_occupied);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    function handleSubmit(event: any) {
        event.preventDefault();
        if (typeof is_occupied !== 'boolean') {
            alert('Please enter a valid value');
            return;
        }

        const res = apis2.post('/bed_book/' + id, {
            'is_occupied': is_occupied,
        });
        res.then((response) => {
            if (response.status === 200) {
                alert('Successfully Added');
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div><Styledform onSubmit={handleSubmit}>
            <StyledGrid container spacing={2} sx={{
                backgroundColor: theme.colors.white,
                padding: '20px',
                borderRadius: '10px',
            }}>
                <StyledGrid item xs={12} sm={6}>
                    <Switch checked={is_occupied} onChange={() => setIs_occupied(!is_occupied)} />
                </StyledGrid>
                <StyledGrid item xs={12}>
                    <StyledButton type="submit" variant="contained" color="primary">
                        Save Changes
                    </StyledButton>
                </StyledGrid>
            </StyledGrid>
        </Styledform>
        </div>
    )
}


const CreateAppointment = ({ type, target_id, name_of_selected }: any) => {
    const { sub_id } = useParams();
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        patient_name: '',
        patient_email: '',
        patient_phone: '',
        patient_age: '',
        patient_Details: '',
        appointment_type: type, // Options: 'doctor', 'room', 'bed', 'facility'
        hospital_id: sub_id,
        target_id: target_id, // doctor_id, room_id, bed_id, facility_id depending on type
        date: '',
        time: '',
    });

    const [status, setStatus] = useState('');

    // WebSocket URL (replace with your backend WebSocket URL)
    const socketUrl = 'ws://localhost:8000/ws/appointments/' + `${sub_id}/${localStorage.getItem('token')}/`;

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
        onOpen: () => setStatus('WebSocket connection established'),
        onClose: () => setStatus('WebSocket connection closed'),
        onError: () => setStatus('WebSocket error occurred')
    });
    useEffect(() => {
        console.log(lastMessage, status);
    }, []);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        // Check WebSocket connection status
        if (type === 'doctor') {
            if (readyState === ReadyState.OPEN) {
                // If WebSocket is open, send appointment data
                sendMessage(JSON.stringify(formData));
                setStatus('Appointment created via WebSocket');
            } else {
                // If WebSocket is not connected, fall back to regular HTTP request
                try {
                    const response = await axios.post(API_HOST + '/api/appointments/create/', formData); // Replace with your API endpoint
                    if (response.status === 201) {
                        setStatus('Appointment created via HTTP request');
                    }
                } catch (error) {
                    setStatus('Error creating appointment');
                }
            }
        }
    };

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <FormContainer sx={{
            backgroundColor: theme.colors.white,
        }}>
            <StyledTypography style={{
                fontSize: '1.1rem',
            }} variant="h5">
                {type === 'doctor' && 'Create appointment with Doctor'}
                {type === 'room' && 'Book Room'}
                {type === 'bed' && 'Allot Bed'}
                {type === 'facility' && 'Register for Facility of'}
                <span style={{
                    color: theme.colors.primary,
                    fontSize: '1.4rem',
                    textTransform: 'capitalize',
                }}>
                    {' ' + name_of_selected}
                </span>
            </StyledTypography>
            {(type === 'doctor' || type === 'facility') && <Styledform onSubmit={handleSubmit}>
                <StyledGrid container spacing={2} sx={{
                    backgroundColor: theme.colors.white,
                    padding: '20px',
                    borderRadius: '10px',
                }}>
                    <StyledGrid item xs={12} sm={6}>
                        <StyledTextField
                            label="Patient Name"
                            name="patient_name"
                            value={formData.patient_name}
                            onChange={handleInputChange}
                            fullWidth
                            InputLabelProps={{
                                style: { color: theme.colors.text },
                            }}
                            sx={{
                                input: {
                                    color: theme.colors.text,
                                    backgroundColor: theme.colors.white,
                                    border: `1px solid ${theme.colors.gray}`,
                                    borderRadius: '8px',
                                },
                            }}
                        />
                    </StyledGrid>
                    <StyledGrid item xs={12} sm={6}>
                        <StyledTextField
                            label="Patient Email"
                            name="patient_email"
                            value={formData.patient_email}
                            onChange={handleInputChange}
                            fullWidth
                            InputLabelProps={{
                                style: { color: theme.colors.text },
                            }}
                            sx={{
                                input: {
                                    color: theme.colors.text,
                                    backgroundColor: theme.colors.white,
                                    border: `1px solid ${theme.colors.gray}`,
                                    borderRadius: '8px',
                                },
                            }}
                        />
                    </StyledGrid>
                    <StyledGrid item xs={12} sm={6}>
                        <StyledTextField
                            label="Patient Phone"
                            name="patient_phone"
                            value={formData.patient_phone}
                            onChange={handleInputChange}
                            fullWidth
                            InputLabelProps={{
                                style: { color: theme.colors.text },
                            }}
                            sx={{
                                input: {
                                    color: theme.colors.text,
                                    backgroundColor: theme.colors.white,
                                    border: `1px solid ${theme.colors.gray}`,
                                    borderRadius: '8px',
                                },
                            }}
                        />
                    </StyledGrid>

                    <StyledGrid item xs={12} sm={6}>
                        <StyledTextField
                            label="Patient Age"
                            name="patient_age"
                            value={formData.patient_age}
                            onChange={handleInputChange}
                            fullWidth
                            InputLabelProps={{
                                style: { color: theme.colors.text },
                            }}
                            sx={{
                                input: {
                                    color: theme.colors.text,
                                    backgroundColor: theme.colors.white,
                                    border: `1px solid ${theme.colors.gray}`,
                                    borderRadius: '8px',
                                },
                            }}
                        />
                    </StyledGrid>
                    <StyledGrid item xs={12}>
                        <StyledTextField
                            label="Patient Details"
                            name="patient_Details"
                            value={formData.patient_Details}
                            onChange={handleInputChange}
                            multiline
                            rows={4}
                            fullWidth
                            InputLabelProps={{
                                style: { color: theme.colors.text },
                            }}
                            InputProps={{
                                style: { color: theme.colors.text },
                            }}
                            sx={{
                                color: theme.colors.text,
                                backgroundColor: theme.colors.white,
                                border: `1px solid ${theme.colors.gray}`,
                                borderRadius: '8px',
                            }}
                        />
                    </StyledGrid>
                    {/* Add fields for date, time, and other related information */}
                    <StyledGrid item xs={12} sm={6}>
                        <StyledTextField
                            label="Date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            fullWidth
                            InputLabelProps={{
                                style: { color: theme.colors.text },
                            }}
                            sx={{
                                input: {
                                    color: theme.colors.text,
                                    backgroundColor: theme.colors.gray,
                                    border: `1px solid ${theme.colors.gray}`,
                                    borderRadius: '8px',
                                },

                            }}

                        />
                    </StyledGrid>
                    <StyledGrid item xs={12} sm={6}>
                        <StyledTextField
                            label="Time"
                            name="time"
                            type="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            fullWidth
                            InputLabelProps={{
                                style: { color: theme.colors.text },
                            }}
                            sx={{
                                input: {
                                    color: theme.colors.text,
                                    backgroundColor: theme.colors.gray,
                                    border: `1px solid ${theme.colors.gray}`,
                                    borderRadius: '8px',
                                },
                            }}
                        />
                    </StyledGrid>
                    <StyledGrid item xs={12}>
                        <StyledButton type="submit" variant="contained" color="primary">
                            Create Appointment
                        </StyledButton>
                    </StyledGrid>

                </StyledGrid>
            </Styledform>}
            {type == 'room' && <Room_book id={target_id} sub_id={sub_id} />}
            {type == 'bed' && <Bed_book id={target_id} />}
            {/* Display connection and status messages */}
            {/* <StyledTypography variant="subtitle1" color="secondary" style={{ marginTop: '20px' }}>
                {status}
            </StyledTypography> */}
        </FormContainer>
    );
};

export default CreateAppointment;

