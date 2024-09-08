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
import Logo from '../../assets/Static/logo.png'
import { useNavigate } from 'react-router-dom';
import { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Brand_name } from '../../Veriables';

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
function PositionedMenu({ subscription, services_list }: {
  subscription?: boolean,
  services_list: { [key: string]: string }
}) {
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
          display: 'flex', gap: 0.5, justifyContent: 'space-between', color: theme.colors.text,
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
        {Object.keys(services_list).map((key) => (
          <><MenuItem
            key={key}
            onClick={() => {
              if (subscription) {
                navigate(`/${services_list[key]}`)
              } else {
                navigate('/pricing/')
              }
            }}
          >
            {key}
          </MenuItem>
            <Divider variant='middle' component='li' /></>
        ))}

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

  const Services_list = {
    'Coustemer': 'coustemer',
    'Restorant Management': 'create-restaurant',
    // 'Hotels Management': 'hostels',
    // 'Service Shop': 'service-shop',
  }

  console.log(mode)
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
        if (response.status == 401) {
          localStorage.removeItem('token');
          setShowLogin(true);
          return;
        } else if (response.status == 403) {
          localStorage.removeItem('token');
          setShowLogin(true);
          return;
        }
        const data = await response.json();
        setUsername(data.username);
        setSubscription(true);
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
                  Logo
                }
                style={logoStyle}
                alt="logo of sitemark"
              />
              <Typography
                color="text.primary"
                sx={{ ml: 1, }}
                style={{
                  color: '#003bde',
                  cursor: 'pointer',
                  fontSize: '1.52rem',
                  marginRight: '20px',
                  fontFamily: 'Montserrat, Tenor Sans',
                  fontWeight: '600',
                }}
              >
                {Brand_name}
              </Typography>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <PositionedMenu subscription={subscription} services_list={Services_list} />
                <MenuItem
                  onClick={() => window.open('/pricing/', '_self')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color={theme.colors.text}>
                    Pricing
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => navigate('/F&Q/')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color={theme.colors.text}>
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
                href="/auth/"
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
                  {Services_list && <PositionedMenu subscription={subscription} services_list={Services_list} />}
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
                      href="/auth/"
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