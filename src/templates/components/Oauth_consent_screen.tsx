// src/App.js

import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from './GoogleLoginButton';
import { useTheme } from '../styles/theme';
import { useState } from 'react';

function App() {
    const { theme } = useTheme();
    const [isChecked, setIsChecked] = useState(false);

    return (
        <GoogleOAuthProvider clientId="832147856109-ccam6ota60vaghr87gc1hnd65sv75v61.apps.googleusercontent.com">
            <div className="App" style={{
                alignItems: 'center',
                display: 'flex',
                height: '100vh',
                backgroundColor: theme.colors.background,
                flexDirection: 'column',
                paddingTop: '20vh',
            }}>
                <h1 style={{
                    color: theme.colors.text,
                    fontSize: '1.4rem',
                    display: 'block',
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: '50px',
                }}>Login/Signup</h1>
                <header className="App-header" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    {isChecked ? <GoogleLoginButton /> : <div>Please agree to the terms and conditions</div>}
                </header>
                {/* link to terms and conditions aggrement check box */}
                <div style={{
                    color: theme.colors.text,
                    fontSize: '0.8rem',
                    display: 'block',
                    textAlign: 'center',
                    marginTop: '20px',
                    width: '80%',
                }}>
                    <input style={{
                        marginRight: '10px',
                        cursor: 'pointer',
                    }} type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                    <label>I agree to the <a style={{
                        color: theme.colors.text,
                    }} href="/legals/terms-and-conditions" target="_blank">terms and conditions</a></label>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
