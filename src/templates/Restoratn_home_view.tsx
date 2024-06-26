import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSpring, animated } from 'react-spring';
import { Button, List, ListItem, Typography } from '@mui/material';
import styled from 'styled-components';
import API_HOST from "../config";
import { useTheme } from "./styles/theme";
import './css/nav.css';
import open_svg from './svg/open.svg';
import table_icon from './svg/table_icon.svg';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const Wrapper = styled(animated.div)`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
`;

const StyledListItem = styled(ListItem)`
    color: ${({ theme }) => theme.colors.text};
    border-radius: 5px;
    margin: 10px 0;
    width: 28.0%;

    @media (max-width: 768px) {
        width: 100%;
    }
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
  color: ${({ theme }) => theme.colors.text};

    @media (max-width: 768px) {
        flex-direction: column;
    }
    svg {
        margin-right: 10px;
    }
`;


const NavA = styled.a`
    text-decoration: none;
    font-size: 1.5rem;
    display: block;
    padding: 10px;
    transition: 0.3s;
    font-family: "Lato", sans-serif;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.text};
    // first element border top
    &:first-child {
        margin-top: 20px;
    }
    
    // on hover give sliding underline effect
    &:after {
        content: "";
        display: block;
        margin: auto;
        height: 3px;
        width: 0px;
        background: transparent;
        transition: width 0.5s ease, background-color 0.5s ease;
        }
    &:hover:after {
        width: 100%;
        background: ${({ theme }) => theme.colors.secondary};
    }
`;

const ContainerSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    flex-direction: column;
`;

const SectionUl = styled.ul`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    list-style-type: none;
    padding: 0;
    flex-wrap: wrap;
    flex-direction: column;
`;

const SectionLi = styled.li`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.black};
    font-family: "Lato", sans-serif;
    padding: 10px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 10px 0;
    transition: 0.3s all;
    min-width: 300px;
    @media (max-width: 768px) {
        width: 95.0%;
    }
`;

const ContactDetails = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    flex-direction: column;
`;

const Contectlist = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    list-style-type: none;
    padding: 0;
    gap: 10px;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.black};
    font-family: "Lato", sans-serif;
    padding: 10px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 10px 0;
    transition: 0.3s all;
    min-width: 300px;
    @media (max-width: 768px) {
        width: 95.0%;
    }
        
    & li{
        padding: 10px;
        border-radius: 5px;
        background-color: ${({ theme }) => theme.colors.white};
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        margin: 10px 0;
        transition: 0.3s all;
        align-items: center;
        text-align: center;
        display: flex;
        justify-content: center;
        gap: 10px;
        text-decoration: underline;


        @media (max-width: 768px) {
            width: 95.0%;
        }
    
    }
`;

function MySideNav() {
    const { theme } = useTheme();

    window.onclick = function (event: any) {
        const target = event.target as HTMLElement;
        if (!target.matches('.nav') && !target.matches('.menu') && !target.matches('.bar')) {
            (document.getElementById("mySidenav") as HTMLElement).style.width = "0";
            // transform bar to close
            (document.querySelectorAll('.bar')[0] as HTMLElement).style.transform = 'rotate(0deg)';
            (document.querySelectorAll('.bar')[2] as HTMLElement).style.transform = 'rotate(0deg)';
            (document.querySelectorAll('.bar')[1] as HTMLElement).style.visibility = 'visible';
            (document.querySelectorAll('.bar')[2] as HTMLElement).style.marginTop = '0px';
        }
    }
    return (
        <div id="mySidenav" className="sidenav nav" style={{
            width: '0',
            position: 'fixed',
            zIndex: 5,
            top: '0',
            left: '0',
            overflowX: 'hidden',
            transition: '0.5s',
            height: '100%',
            flexDirection: 'column',
            display: 'flex',
            gap: '20px',
            padding: 0,
            textDecoration: 'none',
            color: theme.colors.black,
        }}>
            <NavA href="#timing"> </NavA>
            <NavA href="#timing">Timing</NavA>
            <NavA href="#tables">Tables</NavA>
            <NavA href="#">contects</NavA>
            <NavA href="#">Home</NavA>
        </div >
    )
}

function NavBarRestorant(
    { restorantname }: any
) {
    const { theme } = useTheme();

    function openNav() {
        console.log(document.getElementById("mySidenav")!.style.width, 'width')
        if (document.getElementById("mySidenav")!.style.width === "100%") {
            document.getElementById("mySidenav")!.style.width = "0%";
            // transform bar to close
            (document.querySelectorAll('.bar')[0] as HTMLElement).style.transform = 'rotate(0deg)';
            (document.querySelectorAll('.bar')[2] as HTMLElement).style.transform = 'rotate(0deg)';
            (document.querySelectorAll('.bar')[1] as HTMLElement).style.visibility = 'visible';
            (document.querySelectorAll('.bar')[2] as HTMLElement).style.marginTop = '0px';
        } else {
            document.getElementById("mySidenav")!.style.width = "100%";
            // transform bar to close
            (document.querySelectorAll('.bar')[0] as HTMLElement).style.transform = 'rotate(45deg)';
            (document.querySelectorAll('.bar')[2] as HTMLElement).style.transform = 'rotate(-45deg)';
            (document.querySelectorAll('.bar')[1] as HTMLElement).style.visibility = 'hidden';
            (document.querySelectorAll('.bar')[2] as HTMLElement).style.marginTop = '-12.9px';
        }


    }


    return (
        <nav className="mask nav" style={{
            color: theme.colors.black,
            zIndex: 10,
        }}>
            <a>{restorantname}</a>
            <ul className="list">
                <li><a href="#timing">Timing</a></li>
                <li><a href="#tables">Tables</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Home</a></li>
            </ul>
            <button className="search" style={{
                visibility: 'hidden'
            }}>Search</button>
            <button className="menu" onClick={openNav}>
                <div className="bar" style={{
                    backgroundColor: theme.colors.black,
                    border: `1px solid ${theme.colors.black}`,
                    width: '24px',
                    marginBottom: '5px'
                }}></div>
                <div className="bar" style={{
                    backgroundColor: theme.colors.black,
                    border: `1px solid ${theme.colors.black}`,
                    width: '24px',
                    marginBottom: '5px'

                }}></div>
                <div className="bar" style={{
                    backgroundColor: theme.colors.black,
                    border: `1px solid ${theme.colors.black}`,
                    width: '24px',
                }}></div>
            </button>
        </nav>
    )
}


function HeroSection({ restorantname, restorantLogo }: any) {
    const { theme } = useTheme();
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh',
            alignContent: 'center',
            backgroundImage: `url(${API_HOST + '/' + restorantLogo})`
        }}>
            <Typography variant="h3" component="div" style={{
                fontSize: '1.5rem',
                color: theme.colors.black,
                textAlign: 'center',
                width: '60%',
                padding: '10px',
                backgroundColor: theme.colors.gray + '19',
                borderRadius: '5px',
                margin: 'auto'
            }}>{restorantname}</Typography>
        </div>
    )
}



function Restorant_home_view() {

    const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });

    const { id } = useParams();
    type Table = {
        id: number;
        name: string;
        capacity: number;
    };
    const [tables, settables] = useState<Table[]>();
    // navigtation
    const navigate = useNavigate();

    type RestorantDetailstype = {
        name: string;
        address: string;
        phone: string;
        email: string;
        logo: string;
    }
    const [RestrontDetails, UseRestrontDetails] = useState<RestorantDetailstype>({
        name: '',
        address: '',
        phone: '',
        email: '',
        logo: '',
    });

    useEffect(() => {
        fetch(`${API_HOST}/tables?restorant_id=` + id, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                settables(data.results);
            })
            .catch((error) => console.error('Error:', error));

        fetch(`${API_HOST}/api/restorant/restorant?restorant_id=${id}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                UseRestrontDetails(data);
                console.log(data, 'data')
            })
    }, []);

    let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


    return (
        <Wrapper style={springProps}>
            <NavBarRestorant restorantname={RestrontDetails.name} />
            <HeroSection restorantname={RestrontDetails.name} restorantLogo={RestrontDetails.logo} />
            <ContactDetails id='contact' >
                <Typography variant="h3" component="div" style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    fontSize: '1.5rem',
                    height: '100%',
                }}>Contact</Typography>
                <Contectlist>
                    <li style={{
                        color: 'blue'
                    }}><PhoneIcon />
                        <a href={`tel:${RestrontDetails.phone}`}>Call us</a>
                    </li>
                    <li style={{
                        color: 'blue'
                    }}><EmailRoundedIcon /><a href={`mailto:${RestrontDetails.email}`}>Mail us</a></li>
                    <li style={{
                        color: 'green'
                    }}><SendRoundedIcon /><a href={`https://wa.me/${RestrontDetails.phone}`}>Whatsapp</a></li>
                    <li style={{
                        textDecoration: 'none',
                        maxWidth: '60%',
                    }}><BusinessRoundedIcon />{RestrontDetails.address}</li>
                </Contectlist>
            </ContactDetails>
            <ContainerSection id="timing" >
                <img src={open_svg} alt="restorant image" style={{
                    width: '100px',
                    objectFit: 'cover',
                }} />
                <SectionUl>
                    {weekdays.map((day) => (
                        <SectionLi key={day}>{day}</SectionLi>
                    ))}
                </SectionUl>
            </ContainerSection>
            <Typography variant="h3" component="div" id='tables' style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                fontSize: '1.5rem'
            }}>Tables</Typography>
            <MySideNav />
            <List style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
                margin: '20px',
                padding: '20px',
                borderRadius: '10px',

            }}>
                {tables && tables.map((table) => (
                    <StyledListItem key={table.id} >
                        <TableHolder style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '20px',
                        }}>
                            <img src={table_icon} alt="table icon" style={{
                                width: '100%',
                                objectFit: 'cover',
                            }} />
                            <StyledButton onClick={() => navigate(`/restorant/table/${id}/${table.id}`)}
                                style={{ border: '1px solid #000', backgroundColor: '#fff', color: '#000', position: 'absolute', bottom: '40px' }}
                            >
                                {table.name}
                            </StyledButton>
                        </TableHolder>
                    </StyledListItem>
                ))}
            </List>
        </Wrapper>
    )
}

export default Restorant_home_view