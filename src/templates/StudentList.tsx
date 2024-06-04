import { useState, useEffect } from 'react';
import api from '../api';
import { ListItem, ListItemText, Button } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const StudentList = ({ hostel_id }: any) => {
    type Student = {
        id: number;
        username: string;
    };
    const [students, setStudents] = useState<Student[]>();

    useEffect(() => {
        api.get('/students?hostel_id=' + hostel_id).then((response) => {
            setStudents(response.data);
            console.log(response.data, 'students');
        });
    }, []);

    return (
        <StyledList initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {students && students.map((student) => (
                <ListItem key={student.id}>
                    <ListItemText primary={student.username} />
                </ListItem>
            ))}
        </StyledList>
    );
};

const StyledList = styled(motion.div)`
    padding: 20px;
`;

export default StudentList;
