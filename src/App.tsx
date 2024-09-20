// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import API_HOST from './config';
// import styled, { keyframes } from 'styled-components';
// import Edit from '@mui/icons-material/Edit';
// import { Button, Paper, Avatar, Typography, Grid, Chip } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';

// // Keyframes for animations
// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

// const slideIn = keyframes`
//   from {
//     transform: translateY(20px);
//     opacity: 0;
//   }
//   to {
//     transform: translateY(0);
//     opacity: 1;
//   }
// `;

// // Container for the entire application
// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
//   color: ${({ theme }) => theme.colors.text};
//   background-color: ${({ theme }) => theme.colors.background};
//   animation: ${fadeIn} 0.5s ease-in-out;
// `;

// // Profile container with animation
// const ProfileContainer = styled(Paper)`
//   padding: 40px;
//   border-radius: 16px;
//   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
//   background-color: ${({ theme }) => theme.colors.white};
//   max-width: 800px;
//   width: 100%;
//   animation: ${slideIn} 0.5s ease-in-out;
// `;

// const ProfileHeader = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 32px;
// `;

// const ProfileAvatar = styled(Avatar)`
//   width: 120px;
//   height: 120px;
//   margin-right: 24px;
//   transition: transform 0.3s ease-in-out;

//   &:hover {
//     transform: scale(1.1);
//   }
// `;

// const ProfileInfo = styled.div`
//   flex: 1;
// `;

// const ProfileName = styled(Typography)`
//   font-size: 2.5rem;
//   font-weight: bold;
//   margin-bottom: 8px;
// `;

// const ProfileUsername = styled(Typography)`
//   font-size: 1.2rem;
//   color: ${({ theme }) => theme.colors.textSecondary};
//   margin-bottom: 16px;
// `;

// const InfoGrid = styled(Grid)`
//   margin-top: 24px;
// `;

// const InfoItem = styled.div`
//   margin-bottom: 16px;
// `;

// const InfoLabel = styled(Typography)`
//   font-weight: bold;
//   color: ${({ theme }) => theme.colors.textSecondary};
//   margin-bottom: 4px;
// `;

// const InfoValue = styled(Typography)`
//   font-size: 1.1rem;
// `;

// const EditButton = styled(Button)`
//   margin-top: 32px;
//   position: absolute;
//   bottom: 20px;
//   left: 20px;
//   z-index: 1000;
//   background-color: ${({ theme }) => theme.colors.primary};
//   color: ${({ theme }) => theme.colors.white};
//   transition: background-color 0.3s ease-in-out;

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.primaryDark};
//   }
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const InputField = styled.input`
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
// `;


// function EditForm({ user, show, setShow, setUserdata }: { user: any, show: boolean, setShow: any, setUserdata: any }) {

//   type UsrData = {
//     id: number;
//     email: string;
//     phone: string;
//     address: string;
//     image?: string;
//     username: string;
//     first_name?: string;
//     last_name?: string;
//   };
//   const [formData, setFormData] = useState<UsrData>({
//     id: user?.id ? user?.id : 0,
//     email: user?.email ? user?.email : '',
//     phone: user?.phone ? user?.phone : '',
//     address: user?.address ? user?.address : '',
//     image: user?.image ? user?.image : '',
//     username: user?.username ? user?.username : '',
//     first_name: user?.first_name ? user?.first_name : '',
//     last_name: user?.last_name ? user?.last_name : '',
//   });

//   useEffect(() => {
//     setFormData({
//       id: user?.id ? user?.id : 0,
//       email: user?.email ? user?.email : '',
//       phone: user?.phone ? user?.phone : '',
//       address: user?.address ? user?.address : '',
//       image: user?.image ? user?.image : '',
//       username: user?.username ? user?.username : '',
//       first_name: user?.first_name ? user?.first_name : '',
//       last_name: user?.last_name ? user?.last_name : '',
//     });
//   }, [user]);
//   const handleChange = (e: any) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     console.log(formData.image, 'Image');
//     if (formData.image === undefined || formData.image === '' || formData.image === null) {
//       delete formData.image;
//     }
//     if (user) {
//       axios.post(API_HOST + '/api/user', formData, {
//         headers: {
//           'Authorization': 'Token ' + localStorage.getItem('token')
//         }
//       }).then(response => {
//         console.log(response.data);
//         if (response.data) {
//           if (response.data.message === 'User data updated') {
//             setUserdata(formData)
//             setShow(false);
//           }
//         }
//       });
//     }
//   };


//   return (<>
//     {show && <Form onSubmit={handleSubmit}>
//       <InputField type="text" name="username" value={formData?.username} onChange={handleChange} />
//       <InputField type="text" name="first_name" value={formData?.first_name} onChange={handleChange} />
//       <InputField type="text" name="last_name" value={formData?.last_name} onChange={handleChange} />
//       {/* <InputField type="text" name="email" value={formData?.email} onChange={handleChange} /> */}
//       <InputField type="text" name="phone" placeholder='Phone' value={formData?.phone} onChange={handleChange} />
//       <InputField type="text" name="address" value={formData?.address} placeholder='Address' onChange={handleChange} />
//       <Button type="submit" variant="contained" color="primary">Update</Button>
//     </Form>}</>
//   );
// }


// function RegisterRestaurant() {
//   type UsrData = {
//     id: number;
//     email: string;
//     phone: string;
//     address: string;
//     image: string;
//     username: string;
//     first_name?: string;
//     last_name?: string;
//   };
//   const [usrData, setUsrData] = useState<UsrData>();
//   const [show, setShow] = useState<boolean>(false);

//   const [subscription, setSubscription] = useState<any>();

//   useEffect(() => {
//     try {
//       axios.get(API_HOST + '/api/user', {
//         headers: {
//           'Authorization': 'Token ' + localStorage.getItem('token')
//         }
//       }).then((response) => {
//         // console.log(response.data, 'UserData14');
//         setUsrData(response.data);
//       });
//     } catch (error) {
//       console.error('There was an error!', error);
//     }
//     axios.get(API_HOST + '/api/subscription', {
//       headers: {
//         'Authorization': 'Token ' + localStorage.getItem('token')
//       }
//     }).then((response) => {
//       console.log(response.data, 'UserData14');
//       console.log(response.data, 'Length');
//       if (response.data.length > 0) {
//         setSubscription(response.data);

//       }
//     }).catch((error) => {
//       console.error('There was an error!', error);
//     });
//   }, []);


//   return (
//     <Container>
//       <ProfileContainer elevation={3}>
//         <ProfileHeader>
//           <ProfileAvatar src={usrData?.image || '/default-avatar.png'} alt={usrData?.username} />
//           <ProfileInfo>
//             <ProfileName variant="h1">{usrData?.first_name} {usrData?.last_name}</ProfileName>
//             <ProfileUsername variant="subtitle1">@{usrData?.username}</ProfileUsername>
//             <Chip label={`ID: ${usrData?.id}`} variant="outlined" />
//           </ProfileInfo>
//         </ProfileHeader>

//         <InfoGrid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <InfoItem>
//               <InfoLabel variant="caption">Email</InfoLabel>
//               <InfoValue>{usrData?.email}</InfoValue>
//             </InfoItem>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <InfoItem>
//               <InfoLabel variant="caption">Phone</InfoLabel>
//               <InfoValue>{usrData?.phone || 'Not provided'}</InfoValue>
//             </InfoItem>
//           </Grid>
//           <Grid item xs={12}>
//             <InfoItem>
//               <InfoLabel variant="caption">Address</InfoLabel>
//               <InfoValue>{usrData?.address || 'Not provided'}</InfoValue>
//             </InfoItem>
//           </Grid>
//         </InfoGrid>

//         <EditForm user={usrData} show={show} setShow={setShow} setUserdata={setUsrData} />
//       </ProfileContainer>
//       <EditButton
//         variant="contained"
//         color="primary"
//         startIcon={<Edit />}
//         onClick={() => setShow(!show)}
//       >
//         Edit Profile
//       </EditButton>
//       <Button
//         style={{
//           position: 'fixed',
//           bottom: '20px',
//           right: '20px',
//         }}
//         variant="contained"
//         color="primary"
//         onClick={() => {
//           window.location.href = '/';
//         }}
//       >
//         <HomeIcon />
//       </Button>
//     </Container>);
// }

// export default RegisterRestaurant;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_HOST from './config';
import styled, { keyframes } from 'styled-components';
import { Edit, Home, Email, Phone, LocationOn } from '@mui/icons-material';
import { Button, Avatar, Typography, Grid, Chip, TextField } from '@mui/material';

// Keyframes for animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const ProfileContainer = styled.div`
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.colors.white};
  max-width: 800px;
  width: 100%;
  position: relative;
  overflow: hidden;
  animation: ${slideIn} 0.5s ease-in-out;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
`;

const ProfileAvatar = styled(Avatar)`
  width: 150px;
  height: 150px;
  margin-right: 24px;
  border: 4px solid #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    animation: ${pulse} 1s infinite;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h1`
  font-size: 6rem;
  margin-bottom: 8px;
  font-weight: 200;
  color: ${({ theme }) => theme.colors.gray};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProfileUsername = styled(Typography)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 16px;
  opacity: 0.9;
`;

const StyledChip = styled(Chip)`
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: bold;

  span {
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const InfoGrid = styled(Grid)`
  margin-top: 24px;
`;

const InfoItem = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }
`;

const InfoLabel = styled(Typography)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 4px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }
`;

const InfoValue = styled(Typography)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const EditButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.primary};
  color: '#ffffff'
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    font-size: 1.3rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const HomeButton = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.primary};
  color: '#ffffff'
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    font-size: 1.3rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const AnimatedTextField = styled(TextField)`
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.colors.gray};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  
  input {
    color: ${({ theme }) => theme.colors.gray};
    &::placeholder {
      color: ${({ theme }) => theme.colors.gray};
    }
  }
  label {
    color: ${({ theme }) => theme.colors.gray};
  }
  
  &:focus-within {
    transform: translateY(-4px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

// Types
type UserData = {
  id: number;
  email: string;
  phone: string;
  address: string;
  image?: string;
  username: string;
  first_name?: string;
  last_name?: string;
};

function EditForm({ user, show, setShow, setUserData }: { user: UserData | undefined, show: boolean, setShow: React.Dispatch<React.SetStateAction<boolean>>, setUserData: React.Dispatch<React.SetStateAction<UserData | undefined>> }) {
  const [formData, setFormData] = useState<UserData>({
    id: user?.id || 0,
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    image: user?.image || '',
    username: user?.username || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.image === undefined || formData.image === '' || formData.image === null) {
      delete formData.image;
    }
    try {
      const response = await axios.post(`${API_HOST}/api/user`, formData, {
        headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
      });
      if (response.data.message === 'User data updated') {
        setUserData(formData);
        setShow(false);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (!show) return null;

  return (
    <Form onSubmit={handleSubmit}>
      <AnimatedTextField name="username" label="Username" value={formData.username} onChange={handleChange} fullWidth />
      <AnimatedTextField name="first_name" label="First Name" value={formData.first_name} onChange={handleChange} fullWidth />
      <AnimatedTextField name="last_name" label="Last Name" value={formData.last_name} onChange={handleChange} fullWidth />
      <AnimatedTextField name="phone" label="Phone" value={formData.phone} onChange={handleChange} fullWidth />
      <AnimatedTextField name="address" label="Address" value={formData.address} onChange={handleChange} fullWidth multiline rows={3} />
      <Button type="submit" variant="contained" color="primary" fullWidth>Update Profile</Button>
    </Form>
  );
}

function EnhancedProfilePage() {
  const [userData, setUserData] = useState<UserData>();
  const [showEditForm, setShowEditForm] = useState(false);
  // const [subscription, setSubscription] = useState<any>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_HOST}/api/user`, {
          headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // const fetchSubscription = async () => {
    //   try {
    //     const response = await axios.get(`${API_HOST}/api/subscription`, {
    //       headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
    //     });
    //     if (response.data.length > 0) {
    //       setSubscription(response.data);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching subscription data:', error);
    //   }
    // };

    fetchUserData();
    // fetchSubscription();
  }, []);

  // logout function
  const logOutconfirmation = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
  };

  return (
    <Container>
      <ProfileContainer>
        <ProfileHeader>
          <ProfileAvatar src={userData?.image || '/default-avatar.png'} alt={userData?.username} />
          <ProfileInfo>
            <ProfileName >{userData?.first_name} {userData?.last_name}</ProfileName>
            <ProfileUsername variant="subtitle1">@{userData?.username}</ProfileUsername>
            <StyledChip label={`ID: ${userData?.id}`} variant="outlined" />
          </ProfileInfo>
        </ProfileHeader>
        <InfoGrid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <InfoItem>
              <InfoLabel variant="caption"><Email /> Email</InfoLabel>
              <InfoValue>{userData?.email}</InfoValue>
            </InfoItem>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoItem>
              <InfoLabel variant="caption"><Phone /> Phone</InfoLabel>
              <InfoValue>{userData?.phone || 'Not provided'}</InfoValue>
            </InfoItem>
          </Grid>
          <Grid item xs={12}>
            <InfoItem>
              <InfoLabel variant="caption"><LocationOn /> Address</InfoLabel>
              <InfoValue>{userData?.address || 'Not provided'}</InfoValue>
            </InfoItem>
          </Grid>
        </InfoGrid>
        {/* logout button */}
        <Button variant="contained" color="secondary" onClick={() => { logOutconfirmation() }}>Logout</Button>
        <EditForm user={userData} show={showEditForm} setShow={setShowEditForm} setUserData={setUserData} />
      </ProfileContainer>
      <EditButton
        onClick={() => setShowEditForm(!showEditForm)}
      >
        {showEditForm ? <span style={{ color: '#ffffff' }}>
          <Edit />
          Cancel
        </span> : <span style={{ color: '#ffffff' }}>
          <Edit />
          Edit
        </span>}
      </EditButton>
      <HomeButton
        onClick={() => { window.location.href = '/'; }}
      >
        <Home style={{ color: '#ffffff' }} />
      </HomeButton>
    </Container>
  );
}

export default EnhancedProfilePage;