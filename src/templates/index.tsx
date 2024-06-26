import React from 'react';
import { useTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import Footer from './components/Footer';

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

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

  let colorMode = 'light' as Theme;
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header toggleColorMode={toggleTheme} mode={colorMode} />
      <HeroSection />
      <ServicesSection />
      <Footer />
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
