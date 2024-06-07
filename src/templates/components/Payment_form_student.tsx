import { useState } from 'react';
import api from '../../api';
import { TextField, Button } from '@mui/material';
import styled from 'styled-components';
import { useTheme } from '../styles/theme';

const Payment_form_student = ({ student, onSave, Hostel_id, student_id }: any) => {
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        student: student_id,
        total: student ? student.total : 0,
        payment_method: student ? student.payment_method : '',
        paid: student ? student.paid : 0,
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
        formData.student = student_id;
        if (student) {
            api.put(`/payments/${student.id}/`, formData).then(onSave);
        } else {
            api.post('/payments', formData).then(onSave).catch((error) => {
                console.log(formData, 'formData')
                if (error.response.status === 400) {
                    alert('Somthing went wrong! try again later')
                } else if (error.response.status === 500) {
                    alert('User already exists in Another Hostel');
                }
            });
        }
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            {/* <TextField label="Student" name="student" value={formData.student} onChange={handleChange} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }} /> */}
            <TextField label="Total" name="total" value={formData.total} onChange={handleChange} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }} />
            <TextField label="Payment Method" name="payment_method" value={formData.payment_method} onChange={handleChange} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }} />
            <TextField label="Paid" name="paid" value={formData.paid} onChange={handleChange} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }} />
            <Button type="submit" variant="contained" color="primary">
                Payment
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



export default Payment_form_student