import { useState, useEffect } from 'react';
import api from '../api';
import { ListItem, ListItemText, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import RoomDetails from './components/RoomDetails';
import Payment_form from './components/Pyment_form';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from './styles/theme';

const StudentList = ({ hostel_id, room_id = 0 }: any) => {
    const { theme } = useTheme();
    type Student = {
        id: number;
        username: string;
        roll: number;
        room: number;
        image?: string;
        room_number: number;
    };
    const [students, setStudents] = useState<Student[]>();

    useEffect(() => {
        api.get('/students?hostel_id=' + hostel_id + '&room_id=' + room_id).then((response) => {
            setStudents(response.data);
            console.log(response.data, 'students');
        });
    }, []);

    function Open_edit_dilog(id: number) {
        // console.log(id);
        api.delete(`/students/${id}`).then(() => {
            setStudents(students?.filter((student) => student.id !== id));
        }).catch(() => {
            alert('Something went wrong! try again later');
        });
    }

    return (
        <StyledList initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* <RoomDetails /> */}
            <Styledlistdiv>
                {students && students.length === 0 && <Typography style={{
                    color: theme.colors.text,
                    fontSize: 23,
                }} >No Students in this room</Typography>}
                {students && students.map((student) => (
                    <StyledListItem key={student.id}>
                        <StyledListItemText primary={<Typography style={{
                            color: theme.colors.text,
                            fontSize: 23,
                        }} >{student.username}</Typography>} />
                        <StyledListItemText primary={`Room no: ${student.room_number}`} secondary={<Typography style={{
                            color: theme.colors.gray,
                            fontSize: 14,
                        }} >Roll no: {student.roll}</Typography>} />
                        <div style={{
                            display: 'flex',
                            gap: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20,
                        }}>
                            <Payment_form Hostel_id={hostel_id} student_id={student.id} />
                            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => Open_edit_dilog(student.id)}>
                                Remove
                            </Button>
                        </div>
                    </StyledListItem>
                ))}
            </Styledlistdiv>
        </StyledList>
    );
};

const StyledList = styled(motion.div)`
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Styledlistdiv = styled.div`
display: flex;
    flex-direction: row;
    gap: 20px;
`;

const StyledListItem = styled(ListItem)`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    padding: 20px;
    flex-direction: column;
`;

const StyledListItemText = styled(ListItemText)`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    font-size: 18px;
`;

const StyledSecondaryTypograpy = styled.p`
    color: ${({ theme }) => theme.colors.gray};
    font-size: 14px;
`;

export default StudentList;
