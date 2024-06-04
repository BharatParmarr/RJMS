import { useState } from 'react';
import api from '../api';
import { TextField, Button } from '@mui/material';
import styled from 'styled-components';
import { useTheme } from './styles/theme';

const RoomForm = ({ room, onSave, Hostel_id }: any) => {
    const { theme } = useTheme();
    // console.log(Hostel_id, 'Hostel_id');
    const [formData, setFormData] = useState({
        name: room ? room.name : '',
        number: room ? room.number : '',
        capacity: room ? room.capacity : '',
        status: room ? room.status : true,
        hostel: room ? room.hostel : Hostel_id,
    });

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // console.log(formData, Hostel_id);
        formData.hostel = Hostel_id;
        if (room) {
            api.put(`/rooms/${room.id}/`, formData).then(onSave).catch((error) => {
                console.log(error);
            });
        } else {
            api.post('/rooms', formData).then(onSave).catch((error) => {
                console.log(error);
            });
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledTextField label="Name" name="name" value={formData.name} onChange={handleChange} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }} />
            <StyledTextField label="Number" name="number" value={formData.number} onChange={handleChange} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }} />
            <StyledTextField label="Capacity" name="capacity" value={formData.capacity} onChange={handleChange} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }} />
            <Button type="submit" variant="contained" color="primary">
                {room ? 'Update' : 'Create'} Room
            </Button>
        </StyledForm>
    );
};

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    min-width: 400px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: 768px) {
        min-width: 100%;
    }
`;

const StyledTextField = styled(TextField)`
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
`;

export default RoomForm;
