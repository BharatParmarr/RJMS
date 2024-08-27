// src/components/EditBusinessForm.js
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import apis from '../../apis';
import { useParams } from 'react-router-dom';
// import { Backdrop, CircularProgress } from '@mui/material';
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
    border: 1px solid ${({ theme }) => theme.colors.gray};
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

const Image_priview = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
`;

const EditBusinessForm = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    type BusinessDetails = {
        name: string;
        address: string;
        phone: string;
        email: string;
        website: string;
        id: number;
        logo: any;
        [key: string]: any;
    }
    const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({
        name: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        id: 0,
        logo: null,
    });

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const response = await apis.get(`/Manage/${id}`);
                setBusinessDetails(response.data);
            } catch (error) {
                console.error('Error fetching business:', error);
            }
        };

        fetchBusiness();
    }, []);

    const handleUpdate = async (e: { preventDefault: () => void; }) => {
        setLoading(true);
        e.preventDefault();
        let data: any = businessDetails
        // romove the logo if it is a string
        console.log('data:', data.logo);
        try {
            delete data.manager;
            delete data.staffs;
            if (typeof businessDetails.logo === 'string') {
                delete data.logo;
            }
            console.log('data:', data);
            const response = await apis.put(`/businesses/${businessDetails.id}/`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log('Business updated:', response.data);
            if (response.status === 200) {
                setLoading(false);
                alert('Data updated successfully!');
            }
        } catch (error) {
            console.error('Error updating business:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Container>
            <Loading_component open={loading} />
            <Title>Edit Business Details</Title>
            <Form onSubmit={handleUpdate}>
                <Input
                    type="text"
                    value={businessDetails.name}
                    onChange={(e) => setBusinessDetails({ ...businessDetails, name: e.target.value })}
                    placeholder="Business Name"
                />
                <Input
                    type="text"
                    value={businessDetails.address}
                    onChange={(e) => setBusinessDetails({ ...businessDetails, address: e.target.value })}
                    placeholder="Address"
                />
                <Input
                    type="text"
                    value={businessDetails.phone}
                    onChange={(e) => setBusinessDetails({ ...businessDetails, phone: e.target.value })}
                    placeholder="Phone"
                />
                <Input
                    type="email"
                    value={businessDetails.email}
                    onChange={(e) => setBusinessDetails({ ...businessDetails, email: e.target.value })}
                    placeholder="Email"
                />
                <Input
                    type="text"
                    value={businessDetails.website}
                    onChange={(e) => setBusinessDetails({ ...businessDetails, website: e.target.value })}
                    placeholder="Website"
                />
                {/* image  */}
                <Input
                    type="file"
                    name='logo'
                    onChange={(e) => {
                        if (e.target.files) {
                            setBusinessDetails({ ...businessDetails, logo: e.target.files[0] });
                        }
                    }}
                    placeholder="Brand Logo"
                />
                {businessDetails.logo && (
                    <>
                        {/* if logo is url thed show image else show the image using URL.createObjectURL */}
                        {typeof businessDetails.logo === 'string' ? (
                            <Image_priview src={businessDetails.logo} alt="logo" />
                        ) : (
                            <Image_priview src={URL.createObjectURL(businessDetails.logo)} alt="logo" />
                        )}
                    </>
                )}
                <Button type="submit">Update</Button>
            </Form>
        </Container>
    );
};

export default EditBusinessForm;
