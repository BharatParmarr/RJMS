import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import theme from './styles/theme';
import Alert from '@mui/material/Alert';
import React from 'react';
// import { HistoryRouter } from 'react-router-dom';

const StyledGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 60%;
  background-color: #f5f5f5;
  border-radius: 19px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Signup = () => {
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
            }, 3000);
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
            const response = await axios.post('http://127.0.0.1:8000/signup/', {
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
        <motion.div
            initial="hidden"
            animate="visible"
            variants={formVariants}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh', width: '100%' }}
        >
            <StyledGrid container component="div">
                <Grid item xs={12} sm={8} md={6}>
                    <StyledPaper>
                        <Typography
                            style={{ fontSize: '1.5rem', marginBottom: '16px' }}
                            variant="h3"
                            align="center"
                        >
                            Bizztrow
                        </Typography>
                        {/* <Typography style={{ fontSize: '0.9rem' }} variant="h4" align="center">
                            Sign Up
                        </Typography> */}
                        <form onSubmit={handleSubmit}>
                            <AnimatedTextField
                                fullWidth
                                margin="normal"
                                size="small"
                                type="text"
                                placeholder="Name"
                                onChange={e => setUsername(e.target.value)}
                                style={useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200 })}
                            />
                            <AnimatedTextField
                                fullWidth
                                margin="normal"
                                size="small"
                                type="email"
                                placeholder="Email"
                                onChange={e => setEmail(e.target.value)}
                                style={useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 400 })}
                            />
                            <AnimatedTextField
                                fullWidth
                                margin="normal"
                                size="small"
                                type="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                                style={useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 600, padding: '0px' })}
                            />
                            <StyledButton
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Sign Up
                            </StyledButton>
                        </form>
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
    );
}
const StyledPaper = styled(Paper)`
  padding: 16px;
  margin-top: 50px;
  background-color: ${theme.colors.background};
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                borderRadius: '10px',
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
  background-color: #3f51b5;
  &:hover {
    background-color: #303f9f;
  }
`;

const Login = () => {
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
            const response = await axios.post('http://127.0.0.1:8000/login/', {
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
        <motion.div
            initial="hidden"
            animate="visible"
            variants={formVariants}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh', width: '100%' }}
        >
            <StyledGrid container component="div">
                <Grid item xs={12} sm={8} md={6}>
                    <StyledPaper>
                        <Typography
                            style={{ fontSize: '1.5rem', marginBottom: '16px' }}
                            variant="h3"
                            align="center"
                        >
                            Bizztrow
                        </Typography>
                        {/* <Typography style={{ fontSize: '0.9rem' }} variant="h4" align="center">
                            Login
                        </Typography> */}
                        <form onSubmit={handleSubmit}>
                            <AnimatedTextField
                                fullWidth
                                margin="normal"
                                size="small"
                                type="email"
                                placeholder="Email"
                                onChange={e => setEmail(e.target.value)}
                                style={useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200 })}
                            />
                            <AnimatedTextField
                                fullWidth
                                margin="normal"
                                size="small"
                                type="password"
                                placeholder="Password"
                                onChange={e => setPassword(e.target.value)}
                                style={useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 400 })}
                            />
                            <StyledButton
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Login
                            </StyledButton>
                        </form>
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
    );
};



export { Signup, Login };