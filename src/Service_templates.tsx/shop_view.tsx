import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSpring, animated } from 'react-spring';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import PeopleIcon from '@mui/icons-material/People';
import styled from 'styled-components';
// import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import API_HOST from "../config";
import QRCode from 'react-qr-code';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import EventSeatRoundedIcon from '@mui/icons-material/EventSeatRounded';

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
  flex-direction: column;
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

const StyledList = styled(List)`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 10px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
    `;

const StyledListItem = styled(ListItem)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin: 10px 0;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
    width: 26%;

    @media (max-width: 768px) {
        width: 100%;
    }
    `


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
function Shop_view() {
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
        fetch(`${API_HOST}/api/service-shop/Table?service_shop_id=` + id, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${yourToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data, 'k');
                settables(data);
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
                    <span><StoreRoundedIcon style={{ marginRight: '12px' }} />Shop</span>
                    <span>
                        <StyledButton onClick={() => navigate(`/Shop/Orders/${id}`)}>Bookings</StyledButton>
                        <StyledButton onClick={() => navigate(`/Shop/Manage/${id}`)}>Manage</StyledButton>
                        <StyledButton onClick={() =>
                            window.location.href = `/data-analysis/${id}`
                        }>Data Analysis</StyledButton>
                        <StyledButton onClick={() => navigate(`/inventory/${id}`)}>Inventory</StyledButton>
                        <StyledButton onClick={() => navigate(`/Shop/Settings/${id}`)}>Settings</StyledButton>
                    </span>
                </div>
            </Typography>
            <Typography variant="h3" component="div" style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                fontSize: '1.5rem'
            }}>Platforms</Typography>
            <StyledList style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                gap: '10px',
            }}>
                {tables && tables.map((table) => (
                    <StyledListItem key={table.id} >
                        <TableHolder>
                            <div style={{
                                display: 'flex',
                                width: '100%',
                                flexDirection: 'column',
                                alignItems: 'center',
                                alignContent: 'center'
                            }}>
                                <EventSeatRoundedIcon style={{
                                    color: `${({ theme }: any) => theme.colors.primary}`,
                                    marginRight: '10px'
                                }} />
                                <ListItemText
                                    primary={table.name}
                                    secondary={<StyledTypograpy>Capacity: {table.capacity}</StyledTypograpy>}
                                />
                                {/* make qr code form link API_HOST+`/table/${table.id}` */}
                                <DownloadableQRCode value={`${CurrentUrl}/Shop/table/${id}/${table.id}`} />
                            </div>
                            <StyledButton onClick={() => navigate(`/Shop/table/${id}/${table.id}`)}
                                style={{ border: '1px solid #000', backgroundColor: '#fff', color: '#000' }}
                            >
                                <PeopleIcon /> View Table
                            </StyledButton>
                        </TableHolder>
                    </StyledListItem>
                ))}
            </StyledList>
        </Wrapper>
    )
}

export default Shop_view