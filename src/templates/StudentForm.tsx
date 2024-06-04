import { useState } from 'react';
import api from '../api';
import { TextField, Button } from '@mui/material';
import styled from 'styled-components';
import { useTheme } from './styles/theme';

const StudentForm = ({ student, onSave, Hostel_id, rooms }: any) => {
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        user: student ? student.user : '',
        roll: student ? student.roll : '',
        room: student ? student.room : '',
        hostel: student ? student.hostel : Hostel_id,
    });

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        formData.hostel = Hostel_id;
        if (student) {
            api.put(`/students/${student.id}/`, formData).then(onSave);
        } else {
            api.post('/students', formData).then(onSave).catch((error) => {
                console.log(error);
            });
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <TextField label="User" name="user" value={formData.user} onChange={handleChange} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }} />
            {/* selectinon field */}
            <TextField
                select
                label="Room"
                name="room"
                value={formData.room}
                onChange={handleChange}
                sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }}
            >
                {rooms.map((room: any) => (
                    <option key={room.id} value={room.id}>
                        {room.name}
                    </option>
                ))}
            </TextField>
            <TextField label="Roll" name="roll" value={formData.roll} onChange={handleChange} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }} />
            {/* <TextField label="Hostel" name="hostel" value={formData.hostel} onChange={handleChange} /> */}
            <Button type="submit" variant="contained" color="primary">
                {student ? 'Update' : 'Create'} Student
            </Button>
        </StyledForm>
    );
};

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    min-width: 400px;

    @media (max-width: 768px) {
        min-width: 100%;
    }
`;

export default StudentForm;
