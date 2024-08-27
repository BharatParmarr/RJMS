// src/components/EditHospitalForm.js
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import apis from '../../apis'; // Axios instance
import { useParams } from 'react-router-dom';
import Loading_component from './Loading_compontet';

const Container = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing.padding};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
`;

const Title = styled.h2`
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.margin};

`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.margin};
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: ${({ theme }) => theme.colors.secondary};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: fit-content;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
    }
`;

const EditHospitalForm = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [hospitalDetails, setHospitalDetails] = useState({
        number_of_beds: '',
        number_of_rooms: '',
        specialties: '',
        facilities_available: '',
        opening_hours: '',
        id: 0,
    });

    useEffect(() => {
        const fetchHospital = async () => {
            try {
                const response = await apis.get(`/Manage_hospital/${id}`);
                setHospitalDetails(response.data);
            } catch (error) {
                console.error('Error fetching hospital:', error);
            }
        };
        fetchHospital();
    }, []);

    const handleUpdate = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await apis.put(`/hospitals/${hospitalDetails.id}/`, hospitalDetails);
            console.log('Hospital updated:', response.data);
        } catch (error) {
            console.error('Error updating hospital:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Loading_component loading={loading} />
            <Title>Edit Hospital Details</Title>
            <Form onSubmit={handleUpdate}>
                <Input
                    type="number"
                    value={hospitalDetails.number_of_beds}
                    onChange={(e) => setHospitalDetails({ ...hospitalDetails, number_of_beds: e.target.value })}
                    placeholder="Number of Beds"

                />
                <Input
                    type="number"
                    value={hospitalDetails.number_of_rooms}
                    onChange={(e) => setHospitalDetails({ ...hospitalDetails, number_of_rooms: e.target.value })}
                    placeholder="Number of Rooms"
                />
                <Input
                    type="text"
                    value={hospitalDetails.specialties}
                    onChange={(e) => setHospitalDetails({ ...hospitalDetails, specialties: e.target.value })}
                    placeholder="Specialties"
                />
                <Input
                    type="text"
                    value={hospitalDetails.facilities_available}
                    onChange={(e) => setHospitalDetails({ ...hospitalDetails, facilities_available: e.target.value })}
                    placeholder="Facilities Available"
                />
                <Input
                    type="text"
                    value={hospitalDetails.opening_hours}
                    onChange={(e) => setHospitalDetails({ ...hospitalDetails, opening_hours: e.target.value })}
                    placeholder="Opening Hours"
                />
                <Button type="submit">Update</Button>
            </Form>
        </Container>
    );
};

export default EditHospitalForm;
