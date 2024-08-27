import { useState, useEffect } from 'react';
import styled from 'styled-components';
import GenericForm from './GenericForm';
import apis, { apis2 } from '../../apis';
import { useParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useTheme } from '../../templates/styles/theme';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const StyledAccordion = styled(Accordion)`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
    `;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  border-radius: 10px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const HospitalDoctor = () => {
    const { sub_id } = useParams();
    const { theme } = useTheme();
    type Doctor = {
        id: number;
        user: number;
        specialization: string;
        available_days: string;
        available_time: string;
        name: string;
    };
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [editingDoctor, setEditingDoctor] = useState<any>(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        const response = await apis2.get('/manage/doctor/' + sub_id);
        console.log(response.data, 'kk');
        setDoctors(response.data);
    };

    const handleCreate = async (data: any) => {
        await apis.post('/doctors/', data);
        fetchDoctors();
    };

    const handleEdit = async (data: any) => {
        await apis.put(`/doctors/${editingDoctor.id}/`, data);
        setEditingDoctor(null);
        fetchDoctors();
    };

    const handleDelete = async (id: any) => {
        await apis.delete(`/doctors/${id}/`);
        fetchDoctors();
    };

    return (
        <StyledAccordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{
                    backgroundColor: theme.colors.white,
                    color: theme.colors.text
                }}
            >
                <span style={{
                    fontFamily: 'Roboto, sans-serif',

                }}>
                    Doctors
                </span>
            </AccordionSummary>
            <AccordionDetails style={{
                backgroundColor: theme.colors.white,
                color: theme.colors.text
            }}>
                <Container>
                    <h1>Doctors</h1>
                    <br />
                    <h2 style={{
                        fontSize: '1.2rem',
                    }}>Form</h2>
                    <GenericForm
                        initialData={editingDoctor ? editingDoctor : {}}
                        onSubmit={editingDoctor ? handleEdit : handleCreate}
                        fields={[
                            { name: 'user', type: 'text', placeholder: 'User ID' },
                            { name: 'specialization', type: 'text', placeholder: 'Specialization' },
                            { name: 'available_days', type: 'text', placeholder: 'Available Days' },
                            { name: 'available_time', type: 'text', placeholder: 'Available Time' },
                            { name: 'hospital', type: 'number', placeholder: 'Hospital', hidden: true, value: sub_id },
                            { name: 'price', type: 'text', placeholder: 'Fees' },
                        ]}
                    />
                    <List>
                        {doctors.length > 0 && doctors.map((doctor) => (
                            <ListItem key={doctor.id}>
                                <span>{doctor.name}</span>
                                <div>
                                    <Button onClick={() => setEditingDoctor(doctor)}>Edit</Button>
                                    <Button onClick={() => handleDelete(doctor.id)}>Delete</Button>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </Container>
            </AccordionDetails>
        </StyledAccordion>
    );
};

export default HospitalDoctor;