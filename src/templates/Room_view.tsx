import { useParams } from "react-router-dom"
import { useTheme } from "./styles/theme"
// import { ListItem, ListItemText, Button } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import CustomizedDialogs from './components/CustomizedDialogs';

const StyledList = styled(motion.div)`
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    min-height: 100vh;
`;


function Room_view() {
    const { id, roomid, room_name } = useParams()
    const { theme } = useTheme()
    const room = [{ id: roomid, name: room_name, capacity: 4, number: 1 }]
    return (
        <StyledList initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <StudentList hostel_id={id} room_id={roomid} />
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                position: 'fixed',
                bottom: 20,
                right: 20,
            }}>
                <CustomizedDialogs name="Student" From={StudentForm} Hostel_id={id} rooms={room} />
            </div>
        </StyledList>
    )
}

export default Room_view