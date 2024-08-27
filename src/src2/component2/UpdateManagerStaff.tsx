// src/components/UpdateManagerStaff.js
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import apis from '../../apis';// Axios instance
import { useParams } from 'react-router-dom';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const Container = styled.div`
    background-color:  ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing.padding};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
`;

const Title = styled.h2`
    color: ${({ theme }) => theme.colors.primary};
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

const CurrentManagerHolder = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 5px;
    margin-bottom: 10px;
    padding: 0 5px;
    border: 1px solid #ccc;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
    width: fit-content;
    border-radius: 4px;
`;

const CurrentStaffHolder = styled.div`
    color: ${({ theme }) => theme.colors.secondary};
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 5px;
    margin-bottom: 10px;
    padding: 5px;
`;

const Stafflist = styled.span`
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    padding: 0 5px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 5
    margin-right: 5px;
    margin-bottom: 5px;
`;

const DeleteButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #ccc;
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid ${({ theme }) => theme.colors.white};
    padding: 5px;
`;

const UpdateManagerStaff = () => {
    const { id } = useParams();
    const [manager, setManager] = useState('');
    const [staff, setStaff] = useState('');

    const [currentManager, setCurrentManager] = useState('');
    const [currentStaff, setCurrentStaff] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apis.get(`/Manage/${id}/Manage_get/`);
                console.log('Current manager and staff:', response.data);
                setCurrentManager(response.data.manager);
                setCurrentStaff(response.data.staffs);
            } catch (error) {
                console.error('Error fetching manager/staff:', error);
            }
        };

        fetchData();
    }, []);

    const handleUpdate = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let data = {
            staff: staff,
            manager: manager,
        };
        if (staff.length > 0) {
            data['staff'] = staff;
        } else {
            // Remove staff key if staff is empty
            delete (data as { staff?: string }).staff;
        }
        if (manager) {
            data['manager'] = manager;
        } else {
            delete (data as { manager?: string }).manager;
        }
        if (!data) {
            alert('Please enter manager or staff');
            return;
        }

        try {
            const response = await apis.post(`/Manage/${id}/Manage/`, data);
            console.log('Manager and staff updated:', response.data);
            // Update the current manager and staff
            // reload the page
            window.location.reload();
        } catch (error) {
            console.error('Error updating manager/staff:', error);
        }
    };

    function handleDeleteManager() {
        // Ask for confirmation
        if (!window.confirm('Are you sure you want to delete the manager?')) {
            return;
        }
        console.log('Delete manager:', currentManager);
        let response = apis.delete(`/Manage/${id}/Manage_delete_manager/`);
        console.log('Delete manager response:', response);
        setCurrentManager('');
    }

    function handleDeleteStaff(staffId: any) {
        console.log('Delete staff:', staffId);
        let data = {
            staff: staffId,
        };
        let response = apis.delete(`/Manage/${id}/Manage_delete_staff/`, { data });
        console.log('Delete staff response:', response);
        let newStaff = currentStaff.filter((staff) => staff !== staffId);
        setCurrentStaff(newStaff);
    }

    return (
        <Container>
            <Title>Update Manager and Staff</Title>
            <Form onSubmit={handleUpdate}>
                <label>Manager</label>
                <Input
                    type="text"
                    value={manager}
                    onChange={(e) => setManager(e.target.value)}
                    placeholder="Manager ID"
                />
                {currentManager.length === 0 && <label>No manager added yet</label>}
                {currentManager && currentManager.length > 0 && <label>Current Manager</label>}
                {currentManager && <CurrentManagerHolder>{currentManager}
                    <DeleteButton onClick={handleDeleteManager}>
                        <PersonRemoveIcon />
                    </DeleteButton>
                </CurrentManagerHolder>}
                <label>Staff's ID</label>
                <Input
                    type="text"
                    value={staff}
                    onChange={(e) => setStaff(e.target.value)}
                    placeholder="Staff IDs"
                />
                {currentStaff.length === 0 && <label>No staff added yet</label>}
                {currentStaff && currentStaff.length > 0 && <label>Current Staff</label>}
                <CurrentStaffHolder>{currentStaff && currentStaff.map((staff) => <Stafflist key={staff}>
                    {staff}
                    <DeleteButton onClick={() => handleDeleteStaff(staff)}>
                        <PersonRemoveIcon />
                    </DeleteButton>
                </Stafflist>)}</CurrentStaffHolder>
                <Button type="submit">Update</Button>
            </Form>
        </Container>
    );
};

export default UpdateManagerStaff;
