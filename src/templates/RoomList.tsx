import { useState, useEffect } from 'react';
import api from '../api';
import { ListItem, ListItemText, Button } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import CustomizedDialogs from './components/CustomizedDialogs';

const RoomList = ({ hostel_id }: any) => {
    type Room = {
        id: number;
        name: string;
        capacity: number;
    };
    const [rooms, setRooms] = useState<Room[]>();

    useEffect(() => {
        api.get('/rooms?hostel_id=' + hostel_id).then((response) => {
            console.log(response.data);
            setRooms(response.data);
        });
    }, []);

    return (
        <StyledList initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {rooms && rooms.map((room) => (
                <ListItem key={room.id}>
                    <ListItemText primary={room.name} />
                    <ListItemText primary={`capacity: ${room.capacity}`} />
                    <Button variant="contained" color="primary" href={`/rooms/${room.id}`}>
                        Edit
                    </Button>
                </ListItem>
            ))}
            <StudentList hostel_id={hostel_id} />
            <CustomizedDialogs name="Student" From={StudentForm} Hostel_id={hostel_id} rooms={rooms} />
        </StyledList>
    );
};

const StyledList = styled(motion.div)`
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default RoomList;
