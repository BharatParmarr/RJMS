import { useState, useEffect } from 'react';
import api from '../api';
import { ListItem, ListItemText, Button, TextField, MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
// import StudentList from "./StudentList";
import BedroomChildIcon from '@mui/icons-material/BedroomChild';
import { useTheme } from './styles/theme';
import './styles/Input_field_style.css';
import { useNavigate } from "react-router-dom";

function RoomChildList({ hostel_id, room_id, rooms, student_id, setrooms, student }: any) {
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        room: room_id,
        hostel: hostel_id,
        new_room: room_id,
    });
    const [show, setShow] = useState(false);


    const handleChange = (e: any) => {
        console.log(e.target.value);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    function Change_room() {
        if (formData.room === formData.new_room || formData.new_room === '') {
            setShow(false);
            return;
        }
        api.put(`/students/${student_id}`, { room: formData.new_room }).then(() => {
            let new_rooms = rooms.map((room: any) => {
                if (room.id === formData.room) {
                    room.students = room.students.filter((student: any) => student.id !== student_id);
                }
                if (room.id === formData.new_room) {
                    room.students.push(student);
                }
                return room;
            }
            );
            setrooms(new_rooms);
        }).catch(() => {
            alert('Something went wrong! try again later');
        }).finally(() => {
            setShow(false);
        });
    }
    return (
        <StyledFormDiv >
            {!show && <Button variant="outlined" color="primary" onClick={() => setShow(true)}>Change Room</Button>}
            {show && <><TextField
                select
                label="New Room"
                name="new_room"
                value={formData.new_room}
                onChange={handleChange}
                style={{ width: 200, backgroundColor: theme.colors.background, color: theme.colors.text }}
                sx={{ label: { color: theme.colors.primary }, input: { color: theme.colors.primary } }}
                inputProps={{ style: { color: "red" } }}
            >{rooms.map((room: any) => (
                <MenuItem key={room.id} value={room.id} style={{
                    color: theme.colors.text,
                    backgroundColor: theme.colors.background,
                }}>
                    {room.name}
                </MenuItem>
            ))}
            </TextField>
                <Button variant="outlined" color="primary" onClick={() => Change_room()}>
                    Save
                </Button></>}
        </StyledFormDiv >
    );
}

const RoomList = ({ hostel_id }: any) => {
    const { theme } = useTheme();
    const navigate = useNavigate();

    type Room = {
        id: number;
        name: string;
        capacity: number;
        number: number;
        students?: [];
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
            <Styledlistdiv>
                {rooms && rooms.map((room) => (
                    <StyledListItem key={room.id}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <BedroomChildIcon style={{
                                fontSize: 40,
                                color: theme.colors.gray,
                                marginRight: 10,
                            }} />
                            <StyledListItemText primary={room.name} /></div>
                        <StyledListItemText primary={`Room No: ${room.number}`} secondary={<StyledSecondaryTypograpy>Capacity: {room.capacity}</StyledSecondaryTypograpy>} />
                        {room.students && <StyledListItemText primary={`Students: ${room.students.length}`} />}
                        <Button variant="outlined" color="primary" onClick={() => navigate(`/hostels/room/${hostel_id}/${room.id}/${room.name}`)}>
                            Manage
                        </Button>
                    </StyledListItem>
                ))}
            </Styledlistdiv>
            {rooms && rooms.length === 0 && <h1 style={{ color: 'gray' }}>No Rooms Found</h1>}
            <StyledStudentsHolder>
                {rooms && rooms.map((room) => (
                    <StyledStudentList key={room.id}>
                        <StyledHeading>Students in {room.name}</StyledHeading>
                        {room.students && room.students.map((student: any) => (
                            <StyledStudentItem key={student.id}>
                                <StyledListItemText primary={student.username} />
                                <StyledListItemText primary={`Roll no: ${student.roll}`} />
                                <RoomChildList hostel_id={hostel_id} room_id={room.id} rooms={rooms} student_id={student.id} student_name={student.username} setrooms={setRooms} student={student} />
                            </StyledStudentItem>
                        ))}
                        {room.students && room.students.length === 0 && <h5 style={{ color: '#8b8b8bb5' }}>No Students Found</h5>}
                    </StyledStudentList>
                ))}</StyledStudentsHolder>
            {/* <CustomizedDialogs name="Student" From={StudentForm} Hostel_id={hostel_id} rooms={rooms} /> */}
        </StyledList>
    );
};

const StyledList = styled(motion.div)`
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    min-height: 100vh;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const Styledlistdiv = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
    }
`;

const StyledListItem = styled(ListItem)`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    padding: 20px;
    flex-direction: column;
    min-width: 16vw;
    max-width: 18vw;

    @media (max-width: 768px) {
        min-width: 100%;
        max-width: 100%;
    }
`;

const StyledListItemText = styled(ListItemText)`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
`;

const StyledSecondaryTypograpy = styled.p`
    color: ${({ theme }) => theme.colors.gray};
    font-size: 14px;
`;

const StyledStudentsHolder = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-x: auto;
    margin-top: 20px;
`;

const StyledStudentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: ${({ theme }) => theme.colors.white};
    width: 100%;
    padding: 12px;
    border-radius: 8px;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const StyledStudentItem = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const StyledHeading = styled.h2`
    color: ${({ theme }) => theme.colors.gray};
    font-size: 14px;
`;

const StyledFormDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;
export default RoomList;
