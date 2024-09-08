import styled from 'styled-components'
import { Typography, Button, Divider } from '@mui/material'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import HistoryIcon from '@mui/icons-material/History';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from '../../templates/styles/theme';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';

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
    border-radius: 0 0 0 5px;

    @media (max-width: 768px) {
        display: flex;
    }
    `;

const Burgerlayer = styled.div`
    width: 30px;
    height: 3px;
    margin: 3px;
    border-bottom: 3px solid ${({ theme }) => theme.colors.text};
    transition: all 0.3s;
    border-radius: 10px;

    &:nth-child(1) {
    margin-top: 0;
    }
    `;

const Maindiv = styled.div`
    width: 18%;
    max-height: 100vh;
    overflow: auto;

    @media (max-width: 768px) {
        width: 100%;
    }

    // scrollbar
    &::-webkit-scrollbar {
        width: 7px;
    }
    &::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.colors.white};
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.colors.gray}32;
        border-radius: 10px;
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
    const { theme } = useTheme();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const option = params.option;
    const type_page = params.type_page as keyof typeof links_obj;



    const { id, sub_id } = useParams();
    type links_obj_type = {
        [key: string]: {
            [key: string]: {
                [key: string]: [string, JSX.Element];
            };
        };
    };
    const [links_obj, setLinks_obj] = useState<links_obj_type>({
        'Restorant': {
            'Web Page': {
                'Restorant': ['/restorant/home/${sub_id}', <HomeRoundedIcon />],
            },
            'Work': {
                'Home': ['/', <HomeRoundedIcon />],
                'Orders': ['/Orders_view', <ReceiptLongRoundedIcon />],
                'Dashbord': ['/restorant', <DashboardIcon />],
                'Inventory': ['/inventory', <InventoryRoundedIcon />]
            },
            'Data': {
                'Data Analysis': ['/data-analysis', <AutoGraphRoundedIcon />],
                'Order History': ['/order-history', <HistoryIcon />],
            },
            'Manage': {
                'Products': ['/restorant/Manage', <SettingsRoundedIcon />],
                'Settings': ['/restorant/Settings', <ManageAccountsRoundedIcon />],
            }
        },
        'hospital': {
            'Web Page': {
                'Hospital': [`/Hospital/${sub_id}`, <HomeRoundedIcon />],
            },
            'Work': {
                'Home': ['/', <HomeRoundedIcon />],
                'Appointments': [`/Manage/Appointments_que/hospital/${id}/${sub_id}`, <ReceiptLongRoundedIcon />],
                'Dashbord': [`/Manage/hospital/${id}/${sub_id}`, <DashboardIcon />],
                'Inventory': [`/Manage/Inventory/hospital/${id}/${sub_id}`, <InventoryRoundedIcon />],
            },
            'Data': {
                'Data Analysis': [`/Manage/Data_analysis/hospital/${id}/${sub_id}`, <AutoGraphRoundedIcon />],
                'Appointments History': [`/Manage/Appointments_history/hospital/${id}/${sub_id}`, <HistoryIcon />]
            },
            'Staff': {
                'Staff': [`/Manage/staff/hospital/${id}/${sub_id}`, <GroupsRoundedIcon />],
                'Attendance': [`/Manage/staff/attendance/hospital/${id}/${sub_id}`, <BadgeRoundedIcon />],
            },
            'Manage': {
                'Products': [`/Manage/functionalitys/hospital/${id}/${sub_id}`, <SettingsRoundedIcon />],
                'Settings': [`/Manage/Edit/hospital/${id}/${sub_id}`, <ManageAccountsRoundedIcon />],
            },
        },
        'Education': {
            'Web Page': {
                'Education': [`/Education/${sub_id}`, <HomeRoundedIcon />],
            },
            'Work': {
                'Home': ['/', <HomeRoundedIcon />],
                'Courses': ['/Manage/Courses', <ReceiptLongRoundedIcon />],
                'Dashbord': ['/Education', <DashboardIcon />],
                'Inventory': ['/Manage/Inventory', <InventoryRoundedIcon />],
            },
            'Data': {
                'Data Analysis': ['/Manage/Data_analysis', <AutoGraphRoundedIcon />],
                'Courses History': ['/Manage/Courses_history', <HistoryIcon />],
            },
            'Manage': {
                'Courses': ['/Manage/Courses', <SettingsRoundedIcon />],
                'Settings': ['/Manage/Edit', <ManageAccountsRoundedIcon />],
            }
        }
    });
    useEffect(() => {
        let position_obj: any = JSON.parse(localStorage.getItem('position') || '{}');
        console.log(position_obj, 'position_obj');
        if (!sub_id) return;
        if (position_obj[type_page] && position_obj[type_page][sub_id]) {
            if (position_obj[type_page][sub_id] === 'owner') {
                // dont remove any links
            } else if (position_obj[type_page][sub_id] === 'manager') {
                // remove Settings link 
                let new_links_obj = links_obj;
                delete new_links_obj[type_page]['Manage'].Settings;
                setLinks_obj(new_links_obj);
            } else if (position_obj[type_page][sub_id] === 'staff') {
                // remove all settings,staff, data analysis
                let new_links_obj = links_obj;
                delete new_links_obj[type_page]['Manage'].Settings;
                delete new_links_obj[type_page]['Manage'].Staff;
                delete new_links_obj[type_page]['Data']['Data Analysis'];
                setLinks_obj(new_links_obj);
            } else {
                let new_links_obj = links_obj;
                delete new_links_obj[type_page]['Manage'].Settings;
                delete new_links_obj[type_page]['Manage'].Staff;
                delete new_links_obj[type_page]['Data']['Data Analysis'];
                setLinks_obj(new_links_obj);
            }
        }
    }, [id, type_page]);


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
                        {Object.keys(links_obj[type_page]).map((key, _index) => (
                            <>
                                <DividerBar textAlign="left">{key}</DividerBar>
                                {Object.keys(links_obj[type_page][key]).map((key2, index2) => (
                                    <StyledButton style={{
                                        color: option === key2 ? theme.colors.primary : theme.colors.text,
                                        backgroundColor: option === key2 ? theme.colors.gray + '32' : theme.colors.white,
                                    }} key={index2} onClick={() => navigate(links_obj[type_page][key][key2][0])} startIcon={links_obj[type_page][key][key2][1]}
                                    >
                                        {key2}
                                    </StyledButton>
                                ))}
                            </>
                        ))}
                    </NavigationWrap>
                </div>
            </TypographyDiv></Maindiv>
    )
}

export default Side_pannel_genral