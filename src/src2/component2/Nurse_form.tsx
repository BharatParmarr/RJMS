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


const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  border-radius: 10px;
`;

const StyledAccordion = styled(Accordion)`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
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

const HospitalNurse = () => {
    const { sub_id } = useParams();
    const { theme } = useTheme();

    type Nurse = {
        id: number;
        user: number;
        specialization: string;
        available_days: string;
        available_time: string;
        name: string;
    };
    const [nurses, setNurses] = useState<Nurse[]>([]);
    type EditingNurse = {
        id: number;
        user: number;
        specialization: string;
        available_days: string;
        available_time: string;
    };
    const [editingNurse, setEditingNurse] = useState<EditingNurse | null>(null);

    useEffect(() => {
        fetchNurses();
    }, []);

    const fetchNurses = async () => {
        const response = await apis2.get('/manage/nurse/' + sub_id);
        setNurses(response.data);
    };

    const handleCreate = async (data: any) => {
        await apis.post('/nurses/', data);
        fetchNurses();
    };

    const handleEdit = async (data: any) => {
        if (!editingNurse) return;
        await apis.put(`/nurses/${editingNurse.id}/`, data);
        setEditingNurse(null);
        fetchNurses();
    };

    const handleDelete = async (id: any) => {
        await apis.delete(`/nurses/${id}/`);
        fetchNurses();
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
                    Nurses
                </span>
            </AccordionSummary>
            <AccordionDetails style={{
                backgroundColor: theme.colors.white,
                color: theme.colors.text
            }}>
                <Container>
                    <h1>Hospital Nurses</h1>
                    <GenericForm
                        initialData={editingNurse ? editingNurse : {}}
                        onSubmit={editingNurse ? handleEdit : handleCreate}
                        fields={[
                            { name: 'user', type: 'text', placeholder: 'User ID' },
                            { name: 'specialization', type: 'text', placeholder: 'Specialization' },
                            { name: 'available_days', type: 'text', placeholder: 'Available Days' },
                            { name: 'available_time', type: 'text', placeholder: 'Available Time' },
                            { name: 'hospital', type: 'number', placeholder: 'Hospital', hidden: true, value: sub_id },
                        ]}
                    />
                    <List>
                        {nurses.length && nurses.map((nurse) => (
                            <ListItem key={nurse.id}>
                                <span>{nurse.name}</span>
                                <div>
                                    <Button onClick={() => setEditingNurse(nurse)}>Edit</Button>
                                    <Button onClick={() => handleDelete(nurse.id)}>Delete</Button>
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </Container>
            </AccordionDetails>
        </StyledAccordion >
    );
};

export default HospitalNurse;