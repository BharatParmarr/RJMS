import { useEffect, useState } from 'react';
import axios from 'axios';
import API_HOST from './config';
import styled from 'styled-components';
import Edit from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

// Container for the entire application
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
`;

// Container for user data section
const UserDataSection = styled.div`
  display: flex;
  flex-direction: column; // Changed to column for better vertical alignment
  justify-content: center;
  align-items: center;
  padding: 20px; // Added padding for better spacing
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border}; // Using theme color for border
  border-radius: 8px; // Rounded corners for better aesthetics

  @media (max-width: 768px) {
    width: 90%; // Responsive width for tablets
  }

  @media (max-width: 480px) {
    width: 100%; // Responsive width for mobile
    padding: 10px; // Less padding on mobile
  }
`;

// User data container with vertical alignment
const UserData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px; // Rounded corners for better aesthetics
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); // Added shadow for depth
  gap: 20px; // Increased gap for better spacing
  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

// Styled button for edit action
const EditButton = styled(Button)`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark}; // Darker shade on hover
  }
`;

// Form container
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px; // Increased gap for better spacing

  @media (max-width: 480px) {
    gap: 10px; // Less gap on mobile
  }
`;

// Input field styling
const InputField = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%; // Full width input field
  box-sizing: border-box; // Ensures padding doesn't affect width

  @media (max-width: 480px) {
    padding: 8px; // Less padding on mobile
  }

  
`;


function EditForm({ user, show, setShow, setUserdata }: { user: any, show: boolean, setShow: any, setUserdata: any }) {

  type UsrData = {
    id: number;
    email: string;
    phone: string;
    address: string;
    image?: string;
    username: string;
  };
  const [formData, setFormData] = useState<UsrData>({
    id: user?.id ? user?.id : 0,
    email: user?.email ? user?.email : '',
    phone: user?.phone ? user?.phone : '',
    address: user?.address ? user?.address : '',
    image: user?.image ? user?.image : '',
    username: user?.username ? user?.username : '',
  });

  useEffect(() => {
    setFormData({
      id: user?.id ? user?.id : 0,
      email: user?.email ? user?.email : '',
      phone: user?.phone ? user?.phone : '',
      address: user?.address ? user?.address : '',
      image: user?.image ? user?.image : '',
      username: user?.username ? user?.username : '',
    });
  }, [user]);
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData.image, 'Image');
    if (formData.image === undefined || formData.image === '' || formData.image === null) {
      delete formData.image;
    }
    if (user) {
      axios.post(API_HOST + '/api/user', formData, {
        headers: {
          'Authorization': 'Token ' + localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response.data);
        if (response.data) {
          if (response.data.message === 'User data updated') {
            setUserdata(formData)
            setShow(false);
          }
        }
      });
    }
  };


  return (<>
    {show && <Form onSubmit={handleSubmit}>
      <InputField type="text" name="username" value={formData?.username} onChange={handleChange} />
      {/* <InputField type="text" name="email" value={formData?.email} onChange={handleChange} /> */}
      <InputField type="text" name="phone" placeholder='Phone' value={formData?.phone} onChange={handleChange} />
      <InputField type="text" name="address" value={formData?.address} placeholder='Address' onChange={handleChange} />
      <Button type="submit" variant="contained" color="primary">Update</Button>
    </Form>}</>
  );
}


function RegisterRestaurant() {
  type UsrData = {
    id: number;
    email: string;
    phone: string;
    address: string;
    image: string;
    username: string;
  };
  const [usrData, setUsrData] = useState<UsrData>();
  const [show, setShow] = useState<boolean>(false);


  console.log(usrData, 'UserData11')

  useEffect(() => {
    try {
      axios.get(API_HOST + '/api/user', {
        headers: {
          'Authorization': 'Token ' + localStorage.getItem('token')
        }
      }).then((response) => {
        console.log(response.data, 'UserData14');
        setUsrData(response.data);
      });
    } catch (error) {
      console.error('There was an error!', error);
    }
  }, []);


  return (<Container>
    <UserDataSection>
      <UserData>
        <h1>{usrData?.username}</h1>
        <p>{usrData?.email}</p>
        <p>{usrData?.phone}</p>
        <p>{usrData?.address}</p>
        <EditButton variant="contained" color="primary" startIcon={<Edit />} onClick={() => {
          setShow(!show);
        }}>Edit</EditButton>
        <EditForm user={usrData} show={show} setShow={setShow} setUserdata={setUsrData} />
      </UserData>
    </UserDataSection>
  </Container>);
}

export default RegisterRestaurant;