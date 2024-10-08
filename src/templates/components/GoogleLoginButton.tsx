// src/components/GoogleLoginButton.js

import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import API_HOST from '../../config';
import './component_styles.css';
import useNotification from '../../General/useNotification';

const GoogleLoginButton = () => {
    const { openNotification } = useNotification();
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse: TokenResponse) => {
            console.log('Login success:', tokenResponse);
            try {
                const { access_token } = tokenResponse;
                const response = await axios.post(API_HOST + '/auth2/', {
                    token: access_token,
                });
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    window.location.href = '/app';
                    openNotification('success', 'Success', 'Login successful');
                }
                else {
                    openNotification('error', 'Error', 'Login failed');
                }
            } catch (error) {
                console.error('Error:', error);
                openNotification('error', 'Error', 'Login failed');
            }
        }
    });

    return <button onClick={(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        login()
    }} style={{
        backgroundColor: '#white',
        border: '1px solid blue',
        color: 'black',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        fontSize: '1rem',
        fontWeight: '500'
    }}><img style={{
        width: '30px',
        height: '30px',
    }} src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="" /> Login with Google</button>;
};

export default GoogleLoginButton;
