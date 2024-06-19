import { useState, useEffect } from 'react';
import api from '../api';
import { ListItem, ListItemText, Button } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import API_HOST from '../config';
import { useNavigate } from 'react-router-dom';

const HostelList = () => {
    const navigate = useNavigate();

    type Hostel = {
        id: number;
        name: string;
        address: string;
        phone: string;
        email: string;
        website: string;
        logo?: string;
    };
    const [hostels, setHostels] = useState<Hostel[]>();

    useEffect(() => {
        api.get(`/hostels/`).then((response) => {
            if (response.data.length > 0) {
                setHostels(response.data);
                console.log(response.data);
            }
        });
    }, []);

    return (
        <StyledList initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {hostels && hostels.map((hostel) => (
                <StyledListItem onClick={() => {
                    navigate(`/hostels/${hostel.id}`);
                }} key={hostel.id}>
                    <ListItemText primary={hostel.name} />
                    <ListItemText primary={hostel.address} />
                    {hostel.logo && <ListItemImage src={`${API_HOST}${hostel.logo}`} alt={hostel.name} />}
                </StyledListItem>
            ))}
            <Button variant="contained" color="primary"
                onClick={() => {
                    navigate('/hostels/create');
                }}
            >New Hostel</Button>
        </StyledList>
    );
};

const StyledList = styled(motion.div)`
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const ListItemImage = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;

    @media (max-width: 768px) {
        width: 100px;
        height: 100px;
    }
`;

const StyledListItem = styled(ListItem)`
    display: flex;
    gap: 20px;
    align-items: center;
    transition: all 0.3s;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 9px;
    color: ${({ theme }) => theme.colors.text};
    width: 28%;
    flex-wrap: wrap;
    flex-direction: column;
    margin-bottom: 15px;
    padding: 10px;

    &:hover {
        box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};
    }

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
    }
`;

export default HostelList;
