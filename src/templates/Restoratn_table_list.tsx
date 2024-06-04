import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSpring, animated } from 'react-spring';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PeopleIcon from '@mui/icons-material/People';
import styled from 'styled-components';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import API_HOST from "../config";
import QRCode from 'react-qr-code';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { useTheme } from "./styles/theme";

const Wrapper = styled(animated.div)`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
  min-height: 100vh;
`;

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.colors.white};
  margin: 10px 0;
    background-color: ${({ theme }) => theme.colors.secondary};
`;

const TableHolder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: 768px) {
        flex-direction: column;
    }

    svg {
        margin-right: 10px;
    }
`;

const StyledTypograpy = styled(Typography)`
  color: ${({ theme }) => theme.colors.gray};
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
                downloadLink.href = `${pngFile}`;
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
                size={128}
                level="L"
                ref={qrRef}
            />
            <Button onClick={downloadQR}><DownloadForOfflineIcon /></Button>
        </div>
    );
}
function Restorant_table_list() {
    const { theme } = useTheme();
    const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });
    const CurrentUrl = window.location.origin;

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
            <Typography variant="h1" component="div" style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                fontSize: '1.7rem'
            }}>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between'
                }}>
                    <span><RestaurantMenuIcon style={{ marginRight: '12px' }} /> Restorant</span>
                    <span>
                        <StyledButton onClick={() => navigate(`/Orders_view/${id}`)}>Orders</StyledButton>
                        <StyledButton onClick={() => navigate(`/restorant/Manage/${id}`)}>Manage</StyledButton>
                        <StyledButton onClick={() => navigate(`/data-analysis/${id}`)}>Data Analysis</StyledButton>
                        <StyledButton onClick={() => navigate(`/inventory/${id}`)}>Inventory</StyledButton>
                    </span>
                </div>
            </Typography>
            <Typography variant="h3" component="div" style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                fontSize: '1.5rem'
            }}>Tables</Typography>
            <List>
                {tables && tables.map((table) => (
                    <ListItem key={table.id} button style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                        margin: '10px 0',
                        borderRadius: '5px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                        backgroundColor: theme.colors.white,
                        color: '#000'
                    }}>
                        <TableHolder>
                            <TableRestaurantIcon style={{
                                color: `${({ theme }: any) => theme.colors.primary}`,
                                marginRight: '10px'
                            }} />
                            <ListItemText
                                primary={table.name}
                                secondary={<StyledTypograpy>Capacity: {table.capacity}</StyledTypograpy>}
                            />
                            {/* make qr code form link API_HOST+`/table/${table.id}` */}
                            <DownloadableQRCode value={`${CurrentUrl}/restorant/table/${id}/${table.id}`} />
                            <StyledButton onClick={() => navigate(`/restorant/table/${id}/${table.id}`)}
                                style={{ border: '1px solid #000', backgroundColor: '#fff', color: '#000' }}
                            >
                                <PeopleIcon /> View Table
                            </StyledButton>
                        </TableHolder>
                    </ListItem>
                ))}
            </List>
        </Wrapper>
    )
}

export default Restorant_table_list