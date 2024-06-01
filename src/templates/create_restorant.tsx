import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Paper, TextField, Typography, ListItem, ListItemText } from '@mui/material';
import { styled } from 'styled-components';
import { useSpring, animated } from 'react-spring';
import API_HOST from '../config';
import { useTheme } from './styles/theme';
import EditIcon from '@mui/icons-material/Edit';

const StyledPaper = styled(Paper)`
background-color: ${({ theme }) => theme.colors.background};
color: ${({ theme }) => theme.colors.text};
width: 100%;
padding: 20px;

@media (max-width: 600px) {
  padding: 0px;
}

`;

const StyledDiv = styled.div`
  margin: 0;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0;
  min-height: 100vh;
  padding: 20px;

  @media (min-width: 600px) {
    padding: 20px;
  }
`;

const StyledButton = styled(Button)`
margin-top: 16px;
background-color: ${({ theme }) => theme.colors.primary};
&:hover {
  background-color: ${({ theme }) => theme.colors.secondary};
}
`;

const StyledList = styled.div`
  border-radius: 9px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

const StyledButton2 = styled(Button)`
color: ${({ theme }) => theme.colors.primary};
&:hover {
    box-shadow: ${({ theme }) => theme.colors.primary}65 2px 2px 10px 5px;
  color: ${({ theme }) => theme.colors.secondary};
}

`;

const StyledForm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: ${({ theme }) => theme.colors.white};
color: ${({ theme }) => theme.colors.black};
`;

const ListImage = styled.img`
width: 100px;
height: 100px;
object-fit: cover;
border-radius: 12px;
`;

export default function Create_restorant() {

    const { theme } = useTheme();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState<any>('');

    const [showForm, setShowForm] = useState(false);
    function show() {
        setShowForm(!showForm);
    }


    const AnimatedTextField = animated(TextField);
    // navigation
    const navigate = useNavigate();
    // restorant list
    type Restorant = {
        'manager_restorant': [],
        'staffs': [],
        'created_by': [],
    }

    const [restorants, setRestorants] = useState<Restorant>();

    useEffect(() => {
        let yourToken = localStorage.getItem('token');
        fetch(`${API_HOST}/restorants/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${yourToken}`
            }
        })
            .then(response => response.json())
            .then(data => setRestorants(data))
            .catch((error) => console.error('Error:', error));

    }, []);

    function onSubmit(e: any) {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('name', name);
        formdata.append('address', address);
        formdata.append('phone', phone);
        formdata.append('email', email);
        formdata.append('website', website);
        formdata.append('description', description);
        // logo append
        if (logo) {
            formdata.append('logo', logo);
        }

        let yourToken = localStorage.getItem('token');
        fetch(`${API_HOST}/restorants/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${yourToken}`
            },
            body: formdata
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => console.error('Error:', error));
    }
    return (
        <StyledDiv>
            <Grid item xs={12} sm={8} md={6} style={{
                margin: 'auto',
                padding: '20px',
                borderRadius: '9px',
                backgroundColor: theme.colors.white,
                color: theme.colors.text,
            }}>
                <StyledPaper style={{
                    backgroundColor: theme.colors.white,
                    color: theme.colors.text,
                }}>
                    <Typography variant="h4" align="center" style={{
                        marginBottom: '20px',
                        fontSize: '1.3rem',
                        color: theme.colors.primary,
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: 'bold',
                        backgroundColor: theme.colors.white,
                    }}
                        color='primary'
                    >
                        My Restaurants
                    </Typography>
                    {restorants?.manager_restorant.length && restorants?.manager_restorant.length > 0 ? <StyledList>
                        {restorants?.manager_restorant.map((restorant: any) => (
                            <ListItem key={restorant.id}>
                                <ListItemText primary={restorant.name} />
                                <ListItemText primary={restorant.logo} />
                            </ListItem>
                        ))}
                    </StyledList> :
                        <Typography variant="h5" style={{
                            marginBottom: '20px',
                            fontSize: '0.58rem',
                            color: theme.colors.gray
                        }}>No restorant as meanager</Typography>}
                    <Typography variant="h5" style={{
                        marginBottom: '0px',
                        fontSize: '1rem',
                        color: `${({ theme }: any) => theme.colors.primary}`

                    }}>Staff</Typography>
                    {restorants?.staffs.length && restorants.staffs.length > 0 ? <StyledList>
                        {restorants?.staffs.map((staff: any) => (
                            <ListItem key={staff.id}>
                                <ListItemText primary={staff.name} />
                            </ListItem>
                        ))}
                    </StyledList> :
                        <Typography variant="h5" style={{
                            marginBottom: '20px',
                            marginTop: '10px',
                            fontSize: '0.59rem',
                            color: theme.colors.gray,
                        }}>No restorant as staff</Typography>}
                    <Typography variant="h5" style={{
                        marginBottom: '20px',
                        fontSize: '1rem',
                        color: `${({ theme }: any) => theme.colors.primary}`
                    }}>Created by</Typography>
                    <StyledList style={{
                        backgroundColor: theme.colors.background,
                        marginBottom: '30px',
                    }} >
                        {restorants?.created_by.map((created_by: any) => (
                            <StyledButton2 style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '10px',
                                borderRadius: '9px',
                                border: `1px solid ${theme.colors.primary}`,
                                backgroundColor: `${({ theme }: any) => theme.colors.white}`,
                                color: `${({ theme }: any) => theme.colors.text}`,
                            }} key={created_by.id}
                                onClick={() => navigate(`/restorant/${created_by.id}`, { state: { created_by } })}
                            >
                                <ListImage src={API_HOST + created_by.logo} alt={created_by.name} />
                                <StyledButton2 onClick={() => navigate(`/restorant/${created_by.id}`, { state: { created_by } })} style={{
                                    color: theme.colors.primary,
                                    backgroundColor: `${({ theme }: any) => theme.colors.white}`,

                                    borderRadius: '10px',
                                    padding: '10px',
                                    marginTop: '10px',
                                    boxShadow: `${({ theme }: any) => theme.colors.shadow}`,
                                }}>
                                    {created_by.name}
                                </StyledButton2>
                                {/* <ListItemText primary={API_HOST + created_by.logo} /> */}
                            </StyledButton2>
                        ))}
                    </StyledList>

                    {/* <button onClick={() => show()}>Create</button> */}
                    <Button onClick={() => show()} style={{
                        backgroundColor: `${({ theme }: any) => theme.colors.primary}`,
                        color: `${({ theme }: any) => theme.colors.white}`,
                        borderRadius: '10px',
                        padding: '10px',
                        marginBottom: '20px',
                        boxShadow: `${({ theme }: any) => theme.colors.shadow}`,
                    }}
                        variant="contained"
                        endIcon={<EditIcon />}
                    >Create Restorant</Button>
                    {/* form */}
                    <StyledForm onSubmit={onSubmit} style={{
                        display: showForm ? 'block' : 'none',
                        marginTop: '20px'
                    }}>
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            size="small"
                            type="text"
                            label="Name" variant="outlined"
                            onChange={(e) => {
                                e.preventDefault();
                                setName(e.target.value);
                            }}
                            value={name}
                            style={{
                                ...useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200 }),
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                border: `1px solid ${({ theme }: any) => theme.colors.primary}`,
                                width: '97%',
                                marginLeft: '1.5%',
                            }}
                        />
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="text"
                            size="small"
                            label="Address" variant="outlined"
                            onChange={e => setAddress(e.target.value)}
                            style={{
                                ...useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 400 }),
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                border: `1px solid ${({ theme }: any) => theme.colors.primary}`,
                                width: '97%',
                                marginLeft: '1.5%',
                            }}
                        />
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="text"
                            size="small"
                            label="Phone" variant="outlined"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            style={{
                                ...useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 600 }),
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                border: `1px solid ${({ theme }: any) => theme.colors.primary}`,
                                width: '97%',
                                marginLeft: '1.5%',
                            }}
                        />
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="email"
                            size="small"
                            label="Email" variant="outlined"
                            onChange={e => setEmail(e.target.value)}
                            style={{
                                ...useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 800 }),
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                border: `1px solid ${({ theme }: any) => theme.colors.primary}`,
                                width: '97%',
                                marginLeft: '1.5%',
                            }}
                        />
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="text"
                            size="small"
                            label="Website" variant="outlined"
                            onChange={e => {
                                e.preventDefault()
                                // e.persist();
                                setWebsite(e.target.value)
                            }}
                            style={{
                                ...useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 1000 }),
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                border: `1px solid ${({ theme }: any) => theme.colors.primary}`,
                                width: '97%',
                                marginLeft: '1.5%',
                            }}
                        />
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="text"
                            size="medium"
                            label="Description" variant="outlined"
                            onChange={e => setDescription(e.target.value)}
                            style={{
                                ...useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 1200 }),
                                borderRadius: '10px',
                                border: `1px solid ${theme.colors.primary}`,
                                backgroundColor: 'white',
                                width: '97%',
                                marginLeft: '1.5%',
                            }}
                        />
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="file"
                            onChange={e => setLogo(e.target.files ? e.target.files[0] : '')}
                            style={{
                                ...useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 1400 }),
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                border: `1px solid ${theme.colors.primary}`,
                                width: '27%',
                                marginLeft: '1.5%',
                            }}
                        />
                        {/* show choosen image */}
                        {logo && <img src={URL.createObjectURL(logo)} alt="logo" style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '12px',
                            marginLeft: '1.5%',
                            marginBottom: '20px',
                            display: 'block',
                        }} />}
                        <StyledButton
                            fullWidth
                            type="submit"
                            variant="contained"
                            style={{
                                backgroundColor: theme.colors.primary,
                                borderRadius: '10px',
                                padding: '10px',
                                boxShadow: theme.colors.shadow,
                                width: '67%',
                                marginLeft: '16.5%',
                                marginBottom: '20px',
                                marginTop: '20px',
                            }}
                        >Create Restaurant
                        </StyledButton>
                    </StyledForm>
                </StyledPaper>
            </Grid>
        </StyledDiv>
    )
}
