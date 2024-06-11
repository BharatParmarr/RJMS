// src/App.js

import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from './GoogleLoginButton';
import { useTheme } from '../styles/theme';

function App() {
    const { theme } = useTheme();
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
                <header className="App-header" >
                    <GoogleLoginButton />
                </header>
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
