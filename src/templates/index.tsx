import React, { useEffect, useState } from 'react';
import { useTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import Footer from './components/Footer';
import SimpleAlert from './components/succes_aleart';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  // alert stats
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Loading...');
  const [type, setType] = useState('success');

  type Theme = 'light' | 'dark';
  // const [colorMode, setColorMode] = useState<Theme>('light');
  // change theme localstorage value
  // const toggleColorMode = () => {
  //   if (colorMode === 'light') {
  //     setColorMode('dark');
  //     localStorage.setItem('color-mode', 'dark');
  //   } else {
  //     setColorMode('light');
  //     localStorage.setItem('color-mode', 'light');
  //   }
  // };

  // check for internet connection
  useEffect(() => {
    const isOnline = window.navigator.onLine;
    if (!isOnline) {
      setMessage('No internet connection');
      setType('error');
      setOpen(true);
    }
  }, []);


  let colorMode = 'light' as Theme;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header toggleColorMode={toggleTheme} mode={colorMode} />
      <HeroSection />
      <ServicesSection />
      <Footer />
      <div style={{
        position: 'fixed',
        bottom: 10,
        right: 10,
        minWidth: '300px',
        zIndex: 1000,
      }}>
        <SimpleAlert
          message={message}
          type={type}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;


// const HomePage = () => {
//   const [username, setUsername] = useState('');
//   const [showLogin, setShowLogin] = useState(false);

//   useEffect(() => {
//     async function fetchData() {
//       let token = await localStorage.getItem('token');
//       if (!token) {
//         setShowLogin(true);
//         return;
//       }
//       fetch(`http://127.0.0.1:8000/api/user`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Token ${token}`,
//         }
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setUsername(data.username);
//         }).catch((error) => {
//           console.error('There was an error!', error);
//           setShowLogin(true);
//         }
//         );
//     }
//     fetchData();
//   }, []);

//   return (
//     <div className="homepage">

//       {
//         showLogin ? (
//           <a color="inherit" href="/login">Login</a>
//         ) : (
//           <a color="inherit" href="/dashboard">{username}</a>
//         )
//       }

//       <footer className="footer">
//         <p>&copy; 2024 BizManage. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }
// export default HomePage;
