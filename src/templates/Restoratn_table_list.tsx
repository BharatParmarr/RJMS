import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSpring, animated } from 'react-spring';
import { Button, Divider, List, ListItemText, Typography } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PeopleIcon from '@mui/icons-material/People';
import styled from 'styled-components';
import API_HOST from "../config";
import QRCode from 'react-qr-code';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { useTheme } from "./styles/theme";
import Table_icon from './svg/table_icon.svg'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import HistoryIcon from '@mui/icons-material/History';
import PublicIcon from '@mui/icons-material/Public';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardIcon from '@mui/icons-material/Dashboard';



const Wrapper = styled(animated.div)`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0px;
  height: 100vh;
    display: flex;
    flexDirection: column;
    overflow: hidden;

    @media (max-width: 768px) {
        display: flex;
        flexDirection: column;
        overflow: hidden
    }
`;

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.colors.white};
  margin: 10px 0;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const StyledListItem = styled.li`
    display: flex;
    justifyContent: space-between;
    alignItems: center;
    padding: 10px;
    margin: 10px 10px;
    borderRadius: 5px;
    boxShadow: 0 0 10px rgba(0, 0, 0, 0.1);
    backgroundColor: ${({ theme }) => theme.colors.white};
    flexDirection: column;
    width: 30%;
    
    @media (max-width: 768px) {
        width: 100%;
        }
        `;

const TableHolder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-radius: 8px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: 768px) {
        flex-direction: column;
    }

    svg {
        margin-right: 10px;
    }
`;

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
    letter-spacing: 0.51px;

    &::before,
    &::after {
    border: 1px solid ${({ theme }) => theme.colors.gray};
    }
    `;

const TypographyDiv = styled(Typography)`
    alignItems: center;
    justifyContent: center;
    width: 15.2%;
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
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100vh;
    overflow: auto;

    @media (max-width: 768px) {
        width: 100%;
    }
`;



function DownloadableQRCode({ value }: any) {


    const qrRef = useRef(null);

    const downloadQR = () => {
        const svg = document.getElementById("qrcode");
        const svgData = svg ? new XMLSerializer().serializeToString(svg) : '';
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                const pngFile = canvas.toDataURL("image/png");

                const downloadLink = document.createElement("a");
                downloadLink.download = "qrcode";
                downloadLink.href = `${pngFile} `;
                downloadLink.click();
            }
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '200px',
            flexDirection: 'column'
        }}>
            <QRCode
                id="qrcode"
                value={value}
                size={1024}
                level="L"
                ref={qrRef}
                style={{
                    display: 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '90%',
                    height: '90%',
                }}
            />
            <Button onClick={downloadQR}>Qr Code <DownloadForOfflineIcon /></Button>
        </div>
    );
}


function Menuburger(params: any) {
    console.log(params);

    return (
        <MenuburgerDiv onClick={() => {
            params.setopen(!params.open);
            console.log(params.open);
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


function Restorant_table_list() {
    const { theme } = useTheme();
    const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });
    const CurrentUrl = window.location.origin;

    // open nav
    const [open, setOpen] = useState(false);
    // window size for responsive
    useEffect(() => {
        if (window.innerWidth > 768) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [window.innerWidth]);

    const { id } = useParams();
    type Table = {
        id: number;
        name: string;
        capacity: number;
    };
    const [tables, settables] = useState<Table[]>();
    // navigtation
    const navigate = useNavigate();

    useEffect(() => {
        let yourToken = localStorage.getItem('token');
        fetch(`${API_HOST}/tables?restorant_id=` + id, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${yourToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                settables(data.results);
            })
            .catch((error) => console.error('Error:', error));
    }, []);


    return (
        <Wrapper style={springProps}>
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
                    }}><RestaurantMenuIcon style={{ marginRight: '12px' }} /> Dashbord</span>
                    <NavigationWrap >
                        <StyledButton onClick={() => navigate(`/restorant/home/${id}`)} startIcon={<PublicIcon />}>Restorant</StyledButton>
                        <DividerBar textAlign="left">Work</DividerBar>
                        <StyledButton onClick={() => navigate(`/`)} startIcon={<HomeRoundedIcon />}>Home</StyledButton>
                        <StyledButton onClick={() => navigate(`/Orders_view/${id}`)} startIcon={<ReceiptLongRoundedIcon />}>Orders</StyledButton>
                        <StyledButton
                            disabled
                            style={{
                                color: theme.colors.primary,
                            }}
                            onClick={() => navigate(`/Orders_view/${id}`)} startIcon={<DashboardIcon />}>Dashbord</StyledButton>
                        <StyledButton startIcon={<InventoryRoundedIcon />} onClick={() => window.location.href = `/inventory/${id}`}>Inventory</StyledButton>
                        <DividerBar textAlign="left">Data</DividerBar>
                        <StyledButton startIcon={<AutoGraphRoundedIcon />} onClick={() =>
                            window.location.href = `/data-analysis/${id}`
                        }>Data Analysis</StyledButton>
                        <StyledButton onClick={() => navigate(`/order-history/${id}`)} startIcon={<HistoryIcon />}>Orders History</StyledButton>
                        <DividerBar textAlign="left">Manage</DividerBar>
                        <StyledButton startIcon={<SettingsRoundedIcon />} onClick={() => navigate(`/restorant/Manage/${id}`)}>Products</StyledButton>
                        <StyledButton startIcon={<ManageAccountsRoundedIcon />} onClick={() => navigate(`/restorant/Settings/${id}`)}>Settings</StyledButton>
                    </NavigationWrap>
                </div>
            </TypographyDiv>
            <Maindiv >
                <Typography variant="h3" component="div" style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    fontSize: '1.5rem',
                    fontFamily: 'Lato',
                    color: theme.colors.secondary,
                }}>Tables</Typography>
                <List style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                }}>
                    {tables && tables.map((table) => (
                        <StyledListItem key={table.id} >
                            <TableHolder style={{
                                flexDirection: 'column',
                            }}>
                                <ListItemText
                                    primary={table.name}
                                />
                                <img src={Table_icon} alt="table" style={{ width: '100px' }} />
                                {/* make qr code form link API_HOST+`/table/${table.id}` */}
                                <DownloadableQRCode value={`${CurrentUrl}/restorant/table/${id}/${table.id}`} />
                                <StyledButton onClick={() => navigate(`/restorant/table/${id}/${table.id}`)}
                                    style={{ border: '1px solid #000', backgroundColor: '#fff', color: '#000' }}
                                >
                                    <PeopleIcon /> Order
                                </StyledButton>
                            </TableHolder>
                        </StyledListItem>
                    ))}
                </List>
            </Maindiv>
        </Wrapper>
    )
}

export default Restorant_table_list