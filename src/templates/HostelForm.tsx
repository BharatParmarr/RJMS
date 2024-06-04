import { useState } from 'react';
import api from '../api';
import { TextField, Button } from '@mui/material';
import styled from 'styled-components';
import { useTheme } from './styles/theme';

const HostelForm = ({ hostel }: any) => {
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        name: hostel ? hostel.name : '',
        address: hostel ? hostel.address : '',
        phone: hostel ? hostel.phone : '',
        email: hostel ? hostel.email : '',
        website: hostel ? hostel.website : '',
        logo: hostel ? hostel.logo : null,
    });

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleChangeOfImage = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0],
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(formData);
        let newFormData = new FormData();
        newFormData.append('name', formData.name);
        newFormData.append('address', formData.address);
        newFormData.append('phone', formData.phone);
        newFormData.append('email', formData.email);
        newFormData.append('website', formData.website);
        newFormData.append('logo', formData.logo);

        if (hostel) {
            api.put(`hostels/${hostel.id}/`, newFormData).then(onSave);
        } else {
            api.post('hostels/', newFormData).then(onSave);
        }
    };

    // on save function
    const onSave = (response: any) => {
        console.log(response);
        // redirect to the hostel list page
        window.location.href = '/hostels';
    };

    return (
        <StyledForm onSubmit={handleSubmit}>
            <StyledTextfield label="Name" name="name" value={formData.name} onChange={handleChange} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }} />
            <StyledTextfield label="Address" name="address" value={formData.address} onChange={handleChange} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }} />
            <StyledTextfield label="Phone" name="phone" value={formData.phone} onChange={handleChange} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }} />
            <StyledTextfield label="Email" name="email" value={formData.email} onChange={handleChange} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }} />
            <StyledTextfield label="Website" name="website" value={formData.website} onChange={handleChange} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }} />
            <StyledTextfield name="logo" type='file' onChange={handleChangeOfImage} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }} />
            <Button type="submit" variant="contained" color="primary">
                {hostel ? 'Update' : 'Create'} Hostel
            </Button>
        </StyledForm>
    );
};

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: ${({ theme }) => theme.colors.background};
    min-height: 100vh;
    width: 100%;
    padding: 20px;

    @media (min-width: 768px) {
        margin: 0 auto;
    }
`;

const StyledTextfield = styled(TextField)`
background-color: ${({ theme }) => theme.colors.white};
border: 1px solid ${({ theme }) => theme.colors.text};
border-radius: 8px;
color: ${({ theme }) => theme.colors.text};
`;

export default HostelForm;
