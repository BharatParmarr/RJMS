import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSpring, animated } from 'react-spring';
import { Button, List, ListItemText, Typography } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import styled from 'styled-components';
import API_HOST from "../config";
import QRCode from 'react-qr-code';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { useTheme } from "./styles/theme";
import Table_icon from './svg/table_icon.svg'
import Side_pannel_genral from "../src2/component2/Side_pannel_genral";



const Wrapper = styled(animated.div)`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0px;
  height: 100vh;
  display: flex;
  flex-direction: row;
  overflow: hidden;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
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


const Maindiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
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
            <Side_pannel_genral id={id} option={'Dashbord'} type_page="Restorant" />
            <Maindiv >
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
                    {tables && tables.length === 0 && <Typography variant="h6" component="div" style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                        fontSize: '1.5rem',
                        fontFamily: 'Lato',
                        color: theme.colors.secondary,
                        flexDirection: 'column',
                        width: '100%',
                        textAlign: 'center',
                    }}><span style={{
                        color: theme.colors.primary,
                    }}>No tables found</span>
                        <StyledButton style={{
                            marginTop: '20px',
                            textDecoration: 'underline',
                        }} onClick={() => navigate(`/restorant/Manage/${id}`)}>Add Table</StyledButton>
                    </Typography>}
                </List>
            </Maindiv>
        </Wrapper>
    )
}

export default Restorant_table_list