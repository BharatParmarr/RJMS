import styled from 'styled-components'
import { Typography, Button, Divider } from '@mui/material'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import HistoryIcon from '@mui/icons-material/History';
import PublicIcon from '@mui/icons-material/Public';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from '../../templates/styles/theme';

const NavigationWrap = styled.div`
    display: flex;
    alignItems: center;
    padding: 10px;
    flex-direction: column;
    width: 100%;
    flex: 1;
    padding-top: 20px;
    background-color: ${({ theme }) => theme.colors.white};

    & > button {
        margin: 5px 0;
        border-bottom: 0px solid #000;
        border-radius: 0;
        transition: all 0.2s;
        color: ${({ theme }) => theme.colors.text};
        align-items: left;
        padding: 7px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        text-align: left;

            &::after {
                content: '';
                width: 100%;
                height: 0%;
                position: absolute;
                background-color: ${({ theme }) => theme.colors.primary}32;
                transition: all 0.6s;
            }
            &:hover::after {
                height: 100%;

            }
        }
        `;


const DividerBar = styled(Divider)`
    color: ${({ theme }) => theme.colors.gray};
    width: 100%;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 5px 0;
    text-align: center;
    letter-spacing: 0.51px;

    &::before,
    &::after {
    border: 1px solid ${({ theme }) => theme.colors.gray};
    }
    `;

const TypographyDiv = styled(Typography)`
    alignItems: center;
    justifyContent: center;
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.white};
    transition: all 0.3s;
    left: 0;

     @media (max-width: 768px) {
        position: fixed;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        z-index: 100;

    }
    `;



const MenuburgerDiv = styled.div`
    display: none;
    flex-direction: column;
    justify-content: space-around;
    height: 5vh;
    padding: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1001;

    @media (max-width: 768px) {
        display: flex;
    }
    `;

const Burgerlayer = styled.div`
    width: 30px;
    height: 3px;
    margin: 3px;
    border-bottom: 1.5px solid ${({ theme }) => theme.colors.text};
    transition: all 0.3s;
    `;

const Maindiv = styled.div`
    width: 18%;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.colors.white};
  margin: 10px 0;
  background-color: ${({ theme }) => theme.colors.secondary};
`;


function Menuburger(params: any) {

    return (
        <MenuburgerDiv onClick={() => {
            params.setopen(!params.open);
        }} >
            <Burgerlayer style={{
                transform: params.open ? 'rotate(-45deg)' : 'none',
                position: params.open ? 'absolute' : 'relative',
            }} ></Burgerlayer>
            <Burgerlayer style={{
                transition: 'all 0.1s',
                opacity: params.open ? '0' : '1',
            }} ></Burgerlayer>
            <Burgerlayer style={{
                transform: params.open ? 'rotate(45deg)' : 'none',
                position: params.open ? 'absolute' : 'relative',
            }} ></Burgerlayer>
        </MenuburgerDiv >
    );
}
function Side_pannel_genral(params: any) {
    console.log(params);
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);
    const id = params.id;
    const navigate = useNavigate();
    const option = params.option;
    const type_page = params.type_page

    type links_type = {
        [key: string]: Array<string>
    }

    const { sub_id } = useParams();

    const Links = {
        'Restorant': ['Orders', 'Dashbord', 'Inventory', 'Data Analysis', 'Order History', 'Products', 'Settings', 'Restorant'],
        'Restorant-links': ['/Orders_view', '/restorant', '/inventory', '/data-analysis', '/order-history', '/restorant/Manage', '/restorant/Settings', `/restorant/home/${sub_id}`],
        'hospital': ['Appointments', 'Dashbord', 'Inventory', 'Data Analysis', 'Appointments History', 'Resources', 'Settings', 'Hospital'],
        'hospital-links': [`/Manage/Appointments_que/${type_page}/${id}/${sub_id}`, `/Manage/${type_page}/${id}/${sub_id}`, `/Manage/Inventory/${type_page}/${id}/${sub_id}`, `/Manage/Data_analysis/${type_page}/${id}/${sub_id}`, `/Manage/Appointments_history/${type_page}/${id}/${sub_id}`, `/Manage/functionalitys/${type_page}/${id}/${sub_id}`, `/Manage/Edit/${type_page}/${id}/${sub_id}`, `/Hospital/${sub_id}`],
    } as links_type




    return (
        <Maindiv>
            <Menuburger open={open} setopen={setOpen} />
            <TypographyDiv variant="h1"
                style={{
                    display: 'flex',
                    left: open ? '0%' : `${window.innerWidth > 768 ? '-15.2%' : '-100%'}`,
                }}
            >
                <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    flexDirection: 'column',
                    height: '100vh',
                    backgroundColor: theme.colors.white,
                }}>
                    <span style={{
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.colors.secondary,
                        fontSize: '1.5rem',
                    }}>{option}</span>
                    <NavigationWrap >
                        <StyledButton style={{
                            color: option === 'Restorant' ? theme.colors.primary : theme.colors.text,
                        }} onClick={() => navigate(Links[`${type_page}-links`][7])} startIcon={<PublicIcon />}>{type_page}</StyledButton>
                        <DividerBar textAlign="left">Work</DividerBar>
                        <StyledButton style={{
                            color: option === 'Home' ? theme.colors.primary : theme.colors
                        }} onClick={() => navigate(`/`)} startIcon={<HomeRoundedIcon />}>Home</StyledButton>
                        <StyledButton style={{
                            color: option === 'Orders' ? theme.colors.primary : theme.colors
                        }} onClick={() => navigate(Links[`${type_page}-links`][0])} startIcon={<ReceiptLongRoundedIcon />}>
                            {Links[type_page][0]}
                        </StyledButton>
                        <StyledButton style={{
                            color: option === 'Dashbord' ? theme.colors.primary : theme.colors
                        }} onClick={() => navigate(
                            Links[`${type_page}-links`][1]
                        )} startIcon={<DashboardIcon />}>Dashbord</StyledButton>
                        <StyledButton style={{
                            color: option === 'Inventory' ? theme.colors.primary : theme.colors
                        }} startIcon={<InventoryRoundedIcon />} onClick={() => window.location.href = Links[`${type_page}-links`][2]}>Inventory</StyledButton>
                        <DividerBar textAlign="left">Data</DividerBar>
                        <StyledButton style={{
                            color: option === 'Data Analysis' ? theme.colors.primary : theme.colors
                        }} startIcon={<AutoGraphRoundedIcon />} onClick={() => window.location.href = Links[`${type_page}-links`][3]}>Data Analysis</StyledButton>
                        <StyledButton style={{
                            color: option === 'Order History' ? theme.colors.primary : theme.colors
                        }} onClick={() => navigate(Links[`${type_page}-links`][4])} startIcon={<HistoryIcon />}>
                            {
                                Links[type_page][4]
                            }
                        </StyledButton>
                        <DividerBar textAlign="left">Manage</DividerBar>
                        <StyledButton
                            disabled={option === 'Products'}
                            style={{
                                color: option === 'Products' ? theme.colors.primary : theme.colors
                            }} startIcon={<SettingsRoundedIcon />} onClick={() => navigate(Links[`${type_page}-links`][5])}>Products</StyledButton>
                        <StyledButton style={{
                            color: option === 'Settings' ? theme.colors.primary : theme.colors
                        }} startIcon={<ManageAccountsRoundedIcon />} onClick={() => navigate(Links[`${type_page}-links`][6])}>Settings</StyledButton>
                    </NavigationWrap>
                </div>
            </TypographyDiv></Maindiv>
    )
}

export default Side_pannel_genral