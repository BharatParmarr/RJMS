import { useState } from 'react';
import axios from 'axios';
import API_HOST from '../config';

const VerifyOTPView = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const verifyOTP = async () => {
        try {
            const response = await axios.post(API_HOST + '/verify-otp/', { email, otp });
            if (response.status === 200) {
                alert(response.data.message);
                localStorage.setItem('token', response.data.token);
                console.log(response.data);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="OTP" />
            <button onClick={verifyOTP}>Verify OTP</button>
        </div>
    );
};

export default VerifyOTPView;