import { useState, useEffect } from 'react';
import styled from 'styled-components';
import GenericForm from './GenericForm';
import apis, { apis2 } from '../../apis';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 10px;
  border-radius: 10px;
  width: 100%;
`;

const Main_title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  font-size: 1.5rem;
  min-width: 33vw;
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

const Paradetails = styled.p`
  color: ${({ theme }) => theme.colors.gray};
  text-align: center;
  font-size: 1rem;
`;
const HospitalBed = ({ room_id, room_name }: any) => {

    const { sub_id } = useParams();
    const { type_page } = useParams();
    type Bed = {
        id: number;
        bed_number: string;
        is_occupied: boolean;
    };
    const [beds, setBeds] = useState<Bed[]>([]);
    type Editingbed = {
        id: number;
        bed_number: string;
        is_occupied: boolean;
    };
    const [editingBed, setEditingBed] = useState<Editingbed | null>(null);

    useEffect(() => {
        fetchBeds();
    }, []);

    const fetchBeds = async () => {
        const response = await apis2.get(`/manage/beds/${room_id}/${sub_id}`);
        setBeds(response.data);
    };

    const handleCreate = async (data: any) => {
        await apis2.post(`/manage/beds/${room_id}/${sub_id}`, data);
        fetchBeds();
    };

    const handleEdit = async (data: any) => {
        if (!editingBed) return;
        await apis.put(`/beds/${editingBed.id}/`, data);
        setEditingBed(null);
        fetchBeds();
    };

    const handleDelete = async (id: any) => {
        await apis.delete(`/beds/${id}/`);
        fetchBeds();
    };

    return (
        <Container>
            <Main_title>{type_page?.toUpperCase()} BEDS</Main_title>
            <Paradetails>Manage Beds of room {room_name}</Paradetails>
            <GenericForm
                initialData={editingBed ? editingBed : {}}
                onSubmit={editingBed ? handleEdit : handleCreate}
                fields={[
                    { name: 'bed_number', type: 'text', placeholder: 'Bed Number', hidden: false },
                    { name: 'is_occupied', type: 'checkbox', placeholder: 'Is Occupied', hidden: true, value: false },
                    { name: 'hospital', type: 'hidden', placeholder: 'Hospital', hidden: true, value: room_id },
                ]}
            />
            <List>
                {beds && beds.map((bed) => (
                    <ListItem key={bed.id}>
                        <span>{bed.bed_number}</span>
                        <div>
                            <Button onClick={() => setEditingBed(bed)}>Edit</Button>
                            <Button onClick={() => handleDelete(bed.id)}>Delete</Button>
                        </div>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default HospitalBed;