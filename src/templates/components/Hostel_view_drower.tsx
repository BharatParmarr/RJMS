import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useTheme } from '../styles/theme';
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import LocalDiningRoundedIcon from '@mui/icons-material/LocalDiningRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import CustomizedDialogs from "./CustomizedDialogs"
import { useNavigate, useParams } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import { Divider } from '@mui/material';

export default function TemporaryDrawer() {
    const { id } = useParams()
    const [open, setOpen] = React.useState(false);
    const { theme } = useTheme();
    const navigate = useNavigate()


    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250, display: 'flex', flexDirection: 'column', paddingTop: '4px' }} role="presentation" >
            <CustomizedDialogs Hostel_id={id} styleButton={{
                backgroundColor: theme.colors.white,
                padding: '14px',
                color: '#fff'
            }} />
            <Divider sx={{
                backgroundColor: theme.colors.gray + '99'
            }} />
            <Button startIcon={<HistorySharpIcon />} variant="contained" color="primary" onClick={() => navigate(`/hostels/pyments/${id}`)} style={{
                backgroundColor: theme.colors.white,
                padding: '14px',
                color: '#fff'
            }}>
                Payments
            </Button>
            <Divider sx={{
                backgroundColor: theme.colors.gray + '99'
            }} />
            <Button startIcon={<LocalDiningRoundedIcon />} variant="contained" color="primary" onClick={() => navigate(`/hostels/Meals/${id}`)} style={{
                backgroundColor: theme.colors.white,
                color: '#fff',
                padding: '14px',
            }}>
                Meals
            </Button>
            <Divider sx={{
                backgroundColor: theme.colors.gray + '99'
            }} />
            <Button startIcon={<ChecklistRoundedIcon />} variant="contained" color="primary" onClick={() => navigate(`/hostels/NoticeBord/${id}`)} style={{
                backgroundColor: theme.colors.white,
                color: '#fff',
                padding: '14px',
            }}>
                Notice Board
            </Button>
            <Divider sx={{
                backgroundColor: theme.colors.gray + '99'
            }} />
            <Button startIcon={<SettingsIcon />} variant="contained" color="primary" onClick={() => navigate(`/hostels/Settings/${id}`)} style={{
                backgroundColor: theme.colors.white,
                color: '#fff',
                padding: '14px',
            }}>
                Settings
            </Button>
        </Box>
    );

    return (
        <div >
            <Button onClick={toggleDrawer(true)} style={{
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundColor: theme.colors.primary,
                color: '#fff'
            }}><MenuIcon /></Button>
            <Drawer open={open} onClose={toggleDrawer(false)} sx={{
                '& .MuiDrawer-paper': {
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text
                },
                svg: {
                    color: theme.colors.text
                }
            }} >
                {DrawerList}
            </Drawer>
        </div>
    );
}
