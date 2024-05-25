import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Paper, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';
import { styled } from 'styled-components';
import { useSpring, animated } from 'react-spring';
import theme from "./styles/theme";

export default function Create_restorant() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState('');

    // theme
    const StyledPaper = styled(Paper)`
  padding: 20px;
  margin: 20px;
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
`;

    const StyledButton = styled(Button)`
  margin-top: 16px;
  background-color: ${theme.colors.primary};
  &:hover {
    background-color: ${theme.colors.secondary};
  }
`;

    const StyledList = styled(List)`
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  margin-bottom: 20px;
`;

    const StyledButton2 = styled(Button)`
  color: ${theme.colors.primary};
  &:hover {
    color: ${theme.colors.secondary};
  }
`;

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
        fetch('http://127.0.0.1:8000/restorants/', {
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
        fetch('http://127.0.0.1:8000/restorants/', {
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
        <div>
            <Grid item xs={12} sm={8} md={6}>
                <StyledPaper>
                    <Typography variant="h4" align="center" style={{
                        marginBottom: '20px',
                        fontSize: '1.1rem',
                        color: theme.colors.primary
                    }}>
                        My Restaurants
                    </Typography>
                    <Typography variant="h6" align="center">
                        Created
                    </Typography>
                    <StyledList>
                        {restorants?.manager_restorant.map((restorant: any) => (
                            <ListItem key={restorant.id}>
                                <ListItemText primary={restorant.name} />
                            </ListItem>
                        ))}
                    </StyledList>

                    <Typography variant="h5">Staff</Typography>
                    <StyledList>
                        {restorants?.staffs.map((staff: any) => (
                            <ListItem key={staff.id}>
                                <ListItemText primary={staff.name} />
                            </ListItem>
                        ))}
                    </StyledList>

                    <Typography variant="h5">Created by</Typography>
                    <StyledList>
                        {restorants?.created_by.map((created_by: any) => (
                            <ListItem key={created_by.id}>
                                <StyledButton2 onClick={() => navigate(`/restorant/${created_by.id}`, { state: { created_by } })}>
                                    {created_by.name}
                                </StyledButton2>
                            </ListItem>
                        ))}
                    </StyledList>

                    <Typography variant="h4">Restaurant</Typography>
                    <Typography variant="body1">create_restorant</Typography>
                    <form onSubmit={onSubmit}>
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="text"
                            placeholder="Name"
                            onChange={e => setName(e.target.value)}
                            style={useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200 })}
                        />
                        {/* <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input type="text" value={website} onChange={e => setWebsite(e.target.value)} placeholder="Website" />
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" /> */}
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="text"
                            placeholder="Address"
                            onChange={e => setAddress(e.target.value)}
                            style={useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 400 })}
                        />
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="text"
                            placeholder="Phone"
                            onChange={e => setPhone(e.target.value)}
                            style={useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 600 })}
                        />
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="email"
                            placeholder="Email"
                            onChange={e => setEmail(e.target.value)}
                            style={useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 800 })}
                        />
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="text"
                            placeholder="Website"
                            onChange={e => setWebsite(e.target.value)}
                            style={useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 1000 })}
                        />
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="text"
                            placeholder="Description"
                            onChange={e => setDescription(e.target.value)}
                            style={useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 1200 })}
                        />
                        {/* <input type="file" onChange={e => setLogo(e.target.files[0])} /> */}
                        {/* <input type="file" onChange={e => setLogo(e.target.files ? e.target.files[0]?.name : '')} /> */}
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="file"
                            onChange={e => setLogo(e.target.files ? e.target.files[0] : '')}
                            style={useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 1400 })}
                        />
                        <StyledButton
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Create Restaurant
                        </StyledButton>
                    </form>
                </StyledPaper>
            </Grid>
        </div>
    )
}
