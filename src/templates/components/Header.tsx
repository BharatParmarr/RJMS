import * as React from 'react';
import { Badge, PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ToggleColorMode from './ToggleColorMode';
import { useEffect, useState } from 'react';
import API_HOST from '../../config';
import { useTheme } from '../styles/theme';
import '../css/style.css'
// import Logo from '../../assets/Static/logo.jpg'
import Logo from '../../assets/Static/bizzwin.png'
import { useNavigate } from 'react-router-dom';
import { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -30,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    opacity: 1,
    animation: 'blinker 1.6s linear 2 alternate-reverse',
  },

  // animation
  '@keyframes blinker': {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  '@keyframes border': {
    from: { border: `2px solid red` },
    to: { border: `2px solid ${theme.palette.background.paper}` },
  },
}));
function PositionedMenu({ subscription }: { subscription?: boolean }) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{
          display: 'flex', gap: 0.5, justifyContent: 'space-between', color: 'black',
        }}
      >
        Services <ArrowDropDownIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          style: {
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
          },
        }}
      >
        <MenuItem onClick={() => {
          if (subscription) {
            navigate('/coustemer/')
          } else {
            navigate('/pricing/')
          }
          handleClose()
        }} style={{
          color: theme.colors.text,
          backgroundColor: theme.colors.background,
          minWidth: '300px',
        }}>Coustemer</MenuItem>
        <Divider variant="middle" component="li" />
        <MenuItem onClick={() => {
          if (subscription) {
            navigate('/create-restaurant/')
          } else {
            navigate('/pricing/')
          }
          handleClose()
        }} style={{
          color: theme.colors.text,
          backgroundColor: theme.colors.background,
          minWidth: '300px',
        }}>Restorant Management</MenuItem>
        <Divider variant="middle" component="li" />
        <MenuItem onClick={() => {
          if (subscription) {
            navigate('/hostels')
          } else {
            navigate('/pricing/')
          }
          handleClose()
        }} style={{
          color: theme.colors.text,
          backgroundColor: theme.colors.background
        }}>Hotels Management</MenuItem>
        <Divider variant="middle" component="li" />
        <MenuItem onClick={() => {
          if (subscription) {
            navigate('/service-shop')
          } else {
            navigate('/pricing/')
          }
          handleClose()
        }} style={{
          color: theme.colors.text,
          backgroundColor: theme.colors.background
        }}>Service Shop</MenuItem>
        <Divider variant="middle" component="li" />
        <MenuItem onClick={() => {
          window.open('https://fitwayn.com', 'new')
        }} style={{
          color: theme.colors.text,
          backgroundColor: theme.colors.background,
          marginRight: '60px',
        }}>
          <StyledBadge color="secondary" badgeContent="app">
            Gym Mangment & Workout Planner
          </StyledBadge>
        </MenuItem>
        <Divider variant="middle" component="li" />
        <MenuItem onClick={() => {
          alert('New tools cooming soon.')
        }} style={{
          color: theme.colors.text,
          backgroundColor: theme.colors.background,
          marginRight: '60px'
        }}>
          <StyledBadge color="secondary" badgeContent="coming soon">
            New Tools  . .
          </StyledBadge>
        </MenuItem>
      </Menu>
    </div>
  );
}



const logoStyle = {
  width: '50px',
  height: 'auto',
  cursor: 'pointer',
  borderRadius: '50%',
};

interface AppAppBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

function Header({ mode, toggleColorMode }: AppAppBarProps) {

  const { theme } = useTheme();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [subscription, setSubscription] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let token = localStorage.getItem('token');
      if (!token) {
        setShowLogin(true);
        return;
      }
      try {
        const response = await fetch(`${API_HOST}/api/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setUsername(data.username);
        setSubscription(data.subscription);
        console.log(data.subscription, 'subscription');
      } catch (error) {
        console.error('There was an error!', error);
        setShowLogin(true);
      }
    }
    fetchData();
  }, []);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <img
                src={
                  // 'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                  Logo
                }
                style={logoStyle}
                alt="logo of sitemark"
              />
              <Typography
                color="text.primary"
                sx={{ ml: 1, }}
                style={{
                  color: theme.colors.primary,
                  cursor: 'pointer',
                  fontSize: '1.7rem',
                  marginRight: '20px',
                }}
              >
                BizzWin
              </Typography>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {/* <MenuItem
                  onClick={() => window.open('/create-restaurant/', '_self')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Restorant
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => window.open('/hostels', '_self')}
                  sx={{ py: '6px', px: '12px' }}
                ><Typography variant="body2" color="text.primary">
                    Hostels
                  </Typography>
                </MenuItem> */}
                <PositionedMenu subscription={subscription} />
                <MenuItem
                  onClick={() => window.open('/pricing/', '_self')}
                  sx={{ py: '6px', px: '12px' }}
                ><Typography variant="body2" color="text.primary">
                    Pricing
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => navigate('/F&Q/')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode mode={theme.colors.white == '#fff' ? 'light' : 'dark'} toggleColorMode={toggleColorMode} />
              {showLogin ? <Button
                color="primary"
                variant="contained"
                size="small"
                component="a"
                href="/login/"
                target="_blank"
                style={{
                  backgroundColor: theme.colors.primary,
                }}
                className='login-button'
              >
                Login
              </Button> : <Button
                color="primary"
                variant="contained"
                size="small"
                component="a"
                href="/app/"
                target="_blank"
                style={{
                  backgroundColor: theme.colors.primary,
                }}
                className='login-button'
              >
                {username}
              </Button>}
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }} >
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)} >
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: theme.colors.white,
                    flexGrow: 1,
                    color: theme.colors.text,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={theme.colors.white == '#fff' ? 'light' : 'dark'} toggleColorMode={toggleColorMode} />
                  </Box>
                  <MenuItem onClick={() => {
                    navigate('/coustemer/')
                  }}>
                    Coustemer
                  </MenuItem>
                  <MenuItem onClick={() => {
                    if (subscription) {
                      navigate('/create-restaurant/')
                    } else {
                      navigate('/pricing/')
                    }
                  }}>
                    Restotant
                  </MenuItem>
                  <MenuItem onClick={() => {
                    if (subscription) {
                      navigate('/hostels')
                    } else {
                      navigate('/pricing/')
                    }
                  }}>
                    Hostels
                  </MenuItem>
                  <MenuItem onClick={() => {
                    if (subscription) {
                      navigate('/service-shop')
                    } else {
                      navigate('/pricing/')
                    }
                  }}>
                    Service Shop
                  </MenuItem>
                  <MenuItem onClick={() => {
                    window.open('https://fitwayn.com', 'new')
                  }}>
                    Gym Mangment & Workout Planner
                  </MenuItem>
                  <MenuItem onClick={() => {
                    navigate('/pricing/')
                  }} >
                    Pricing
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/F&Q/')}>
                    F & Q
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    {showLogin ? <Button
                      color="primary"
                      variant="contained"
                      size="small"
                      component="a"
                      href="/login/"
                      target="_blank"
                      className='login-button'
                    >
                      Login
                    </Button> : <Button
                      color="primary"
                      variant="contained"
                      size="small"
                      component="a"
                      href="/app/"
                      target="_blank"
                      style={{ display: 'flex', gap: 0.5, justifyContent: 'space-between' }}
                      className='login-button'
                    >
                      <AccountCircle />{username}
                    </Button>}
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;

// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { motion } from 'framer-motion';

// const Header: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [showLogin, setShowLogin] = useState(false);
//   const [isNavVisible, setNavVisible] = useState(false);

//   useEffect(() => {
//     async function fetchData() {
//       let token = await localStorage.getItem('token');
//       if (!token) {
//         setShowLogin(true);
//         return;
//       }
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/user`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Token ${token}`,
//           },
//         });
//         const data = await response.json();
//         setUsername(data.username);
//       } catch (error) {
//         console.error('There was an error!', error);
//         setShowLogin(true);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <StyledHeader>
//       <Logo initial={{ x: -200 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
//         Bizztrow
//       </Logo>
//       <Hamburger onClick={() => setNavVisible(!isNavVisible)}>
//         <span></span>
//         <span></span>
//         <span></span>
//       </Hamburger>
//       <Nav
//         initial={{ x: 200 }}
//         animate={{ x: isNavVisible ? 0 : 200 }}
//         transition={{ duration: 0.5 }}
//         isNavVisible={isNavVisible}
//       >
//         <NavItem href="#home">Home</NavItem>
//         <NavItem href="#services">Services</NavItem>
//         <NavItem href="#contact">Contact</NavItem>
//         {showLogin ? (
//           <NavItem style={{ backgroundColor: 'black', color: 'white', padding: '5px' }} href="#login">Login</NavItem>
//         ) : (
//           <NavItem href="#dashboard" style={{ backgroundColor: 'black', color: 'white', paddingLeft: '5px', paddingRight: '5px', borderRadius: '7px', paddingTop: '2px', paddingBottom: '2px' }}>{username.length > 8 ? `${username.substring(0, 8)}...` : username}</NavItem>
//         )}
//       </Nav>
//     </StyledHeader>
//   );
// };

// const StyledHeader = styled.header`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem 2rem;
//   position: sticky;
//   top: 0;
//   z-index: 1000;
// `;

// const Logo = styled(motion.h1)`
//   font-size: 1.5rem;
//   color: ${({ theme }) => theme.colors.primary};
// `;

// const Nav = styled(motion.nav) <{ isNavVisible: boolean }>`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   position: fixed;
//   top: 0;
//   right: 0;
//   height: 100vh;
//   width: 70%;
//   background-color: ${({ theme }) => theme.colors.primary};
//   padding: 2rem;
//   transform: translateX(${({ isNavVisible }) => (isNavVisible ? '0' : '100%')});
//   transition: transform 0.3s ease-in-out;

//   @media (min-width: 768px) {
//     position: static;
//     flex-direction: row;
//     height: auto;
//     width: auto;
//     background-color: transparent;
//     padding: 0;
//     transform: none;
//   }
// `;

// const NavItem = styled.a`
//   color: ${({ theme }) => theme.colors.text};
//   font-size: 1rem;
//   position: relative;
//   text-decoration: none;

//   &::after {
//     content: '';
//     display: block;
//     width: 0;
//     height: 2px;
//     background: #fff;
//     transition: width 0.3s;
//     position: absolute;
//     bottom: -2px;
//     left: 0;
//   }

//   &:hover::after {
//     width: 100%;
//   }
// `;

// const Hamburger = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-around;
//   width: 2rem;
//   height: 2rem;
//   cursor: pointer;
//   z-index: 1000;

//   span {
//     width: 2rem;
//     height: 0.25rem;
//     background: #fff;
//     transition: all 0.3s ease;
//   }

//   @media (min-width: 768px) {
//     display: none;
//   }
// `;

// export default Header;
