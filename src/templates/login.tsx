import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import Alert from '@mui/material/Alert';
import React from 'react';
import { useTheme } from './styles/theme';
import API_HOST from '../config';

const StyledGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 60%;
  background-color: ${({ theme }) => theme.colors.background};
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledGrid_2 = styled(Grid)`
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 19px;
    @media (max-width: 768px) {
        width: 100%;
    }
    `;

const StyledPaper = styled(Paper)`
padding: 16px;
margin-top: 50px;
background-color: 'transparent';
boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              borderRadius: '10px',
`;

const StyledButton = styled(Button)`
margin-top: 16px;
background-color: ${({ theme }) => theme.colors.primary};
&:hover {
  background-color: ${({ theme }) => theme.colors.secondary};
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

const StyledDiv = styled.div`
margin: 0;
background-color: ${({ theme }) => theme.colors.background};
color: ${({ theme }) => theme.colors.tex};
padding: 0;
min-height: 100vh;
padding: 20px;
`;


const Signup = () => {
    const { theme } = useTheme();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const history = useHistory();

    // aleart
    const [is_alart_visible, setAlartVisible] = useState(false);
    const [aleart_message, setAleartMessage] = useState('');

    const ref = React.useRef(2);
    useEffect(() => {
        if (ref.current) {
            ref.current -= 1;
            return;
        }
        if (aleart_message) {
            setAlartVisible(true);
            const timer = setTimeout(() => {
                setAlartVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [aleart_message]);

    useEffect(() => {
        if (aleart_message) {
            const timer = setTimeout(() => {
                setAleartMessage(''); // clear the aleart_message
            }, 2200);
            return () => clearTimeout(timer);
        }
    }, [aleart_message]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (username === '' || email === '' || password === '') {
            setAleartMessage('Please fill all the fields');
            return;
        }
        try {
            const response = await axios.post(`${API_HOST}/signup/`, {
                username: username,
                email: email,
                password: password
            });
            if (response.status !== 201) {
                setAleartMessage('Email already exists');
                return;
            }
            if (response.status === 201) {
                setAleartMessage('User created successfully');
            }
        } catch (error) {
            setAleartMessage('Email or Username already exists');
        }
    };

    const AnimatedTextField = animated(TextField);

    const formVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };
    return (
        <StyledDiv>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={formVariants}
                transition={{ duration: 0.5 }}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                    width: '100%',
                    backgroundColor: theme.colors.background,
                    margin: 0,
                    padding: 0
                }}
            >
                <StyledGrid container >
                    <StyledGrid_2 item xs={12} sm={8} md={6}>
                        <StyledPaper style={{
                            backgroundColor: theme.colors.white,
                            boxShadow: theme.colors.shadow,
                        }}>
                            <Typography
                                style={{ fontSize: '1.5rem', marginBottom: '16px', backgroundColor: theme.colors.white, color: theme.colors.primary }}
                                variant="h3"
                                align="center"
                            >
                                Bizztrow
                            </Typography>
                            <StyledForm onSubmit={handleSubmit}>
                                <AnimatedTextField
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    type="text"
                                    placeholder="Name"
                                    onChange={e => setUsername(e.target.value)}
                                    style={{
                                        ...useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200 }),
                                        backgroundColor: 'white',
                                        borderRadius: '10px',
                                        border: `1px solid ${theme.colors.primary}`,
                                    }}
                                />
                                <AnimatedTextField
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    type="email"
                                    placeholder="Email"
                                    onChange={e => setEmail(e.target.value)}
                                    style={{
                                        ...useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 400 }),
                                        backgroundColor: 'white',
                                        borderRadius: '10px',
                                        border: `1px solid ${theme.colors.primary}`,
                                    }}
                                />
                                <AnimatedTextField
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    type="password"
                                    placeholder="Password"
                                    onChange={e => setPassword(e.target.value)}
                                    style={{
                                        ...useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 600 }),
                                        backgroundColor: 'white',
                                        borderRadius: '10px',
                                        border: `1px solid ${theme.colors.primary}`,
                                    }}
                                />
                                <StyledButton
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Sign Up
                                </StyledButton>
                            </StyledForm>
                            {/* link to login */}
                            <Typography
                                style={{ fontSize: '0.9rem', marginTop: '16px', color: theme.colors.primary }}
                                variant="h4"
                                align="center"
                            >
                                Already have an account? <a href="/login">Login</a>
                            </Typography>
                        </StyledPaper>
                    </StyledGrid_2>
                </StyledGrid>
                {is_alart_visible && <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                    position: 'absolute',
                    borderRadius: '10px',
                }}><Alert severity="error">{aleart_message}</Alert></div>}
            </motion.div>
        </StyledDiv>
    );
}


const Login = () => {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const history = useHistory();

    // aleart
    const [is_alart_visible, setAlartVisible] = useState(false);
    const [aleart_message, setAleartMessage] = useState('');

    const ref = React.useRef(2);
    useEffect(() => {
        if (ref.current) {
            ref.current -= 1;
            return;
        }
        if (aleart_message) {
            setAlartVisible(true);
            const timer = setTimeout(() => {
                setAlartVisible(false);
            }, 2200);
            return () => clearTimeout(timer);
        }
    }, [aleart_message]);

    useEffect(() => {
        if (aleart_message) {
            const timer = setTimeout(() => {
                setAleartMessage(''); // clear the aleart_message
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [aleart_message]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAleartMessage('Please fill all the fields');
            return;
        }
        try {
            const response = await axios.post(`${API_HOST}/login/`, {
                email: email,
                password: password
            });
            if (response.status !== 200) {
                setAleartMessage('Invalid email or password');
                return;
            }
            // save token in local storage
            localStorage.setItem('token', response.data.token);
            window.location.href = '/';
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const AnimatedTextField = animated(TextField);

    const formVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <StyledDiv>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={formVariants}
                transition={{ duration: 0.5 }}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', width: '100%', backgroundColor: theme.colors.background, margin: 0, padding: 0 }}
            ><StyledGrid container >
                    <Grid item xs={12} sm={8} md={6}>
                        <StyledPaper style={{
                            backgroundColor: theme.colors.white,
                            boxShadow: theme.colors.shadow,
                        }}>
                            <Typography
                                style={{ fontSize: '1.5rem', marginBottom: '16px', backgroundColor: theme.colors.white, color: theme.colors.primary }}
                                variant="h3"
                                align="center"
                            >
                                Bizztrow
                            </Typography>
                            {/* <Typography style={{ fontSize: '0.9rem' }} variant="h4" align="center">
                            Login
                        </Typography> */}
                            <StyledForm onSubmit={handleSubmit}>
                                <AnimatedTextField
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    type="email"
                                    placeholder="Email"
                                    onChange={e => setEmail(e.target.value)}
                                    style={{
                                        ...useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200 }),
                                        backgroundColor: 'white',
                                        borderRadius: '10px',
                                        border: `1px solid ${theme.colors.primary}`,
                                    }}
                                />
                                <AnimatedTextField
                                    fullWidth
                                    margin="normal"
                                    size="small"
                                    type="password"
                                    placeholder="Password"
                                    onChange={e => setPassword(e.target.value)}
                                    style={{
                                        ...useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 500 }),
                                        backgroundColor: 'white',
                                        borderRadius: '10px',
                                        border: `1px solid ${theme.colors.primary}`,
                                    }}
                                />
                                <StyledButton
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Login
                                </StyledButton>
                            </StyledForm>
                            {/* link to login */}
                            <Typography
                                style={{ fontSize: '0.9rem', marginTop: '16px', color: theme.colors.primary }}
                                variant="h4"
                                align="center"
                            >
                                Don't have an account? <a href="/signup">Sign Up</a>
                            </Typography>
                        </StyledPaper>
                    </Grid>
                </StyledGrid>
                {is_alart_visible && <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                    position: 'absolute',
                    borderRadius: '10px',
                }}><Alert severity="error">{aleart_message}</Alert></div>}
            </motion.div>
        </StyledDiv>
    );
};



export { Signup, Login };