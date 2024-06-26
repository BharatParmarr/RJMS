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
import contect_ilustration from './svg/contact_ilustration.svg';

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


const NavA = styled.a`
    text-decoration: none;
    font-size: 1.5rem;
    display: block;
    padding: 10px;
    transition: 0.3s;
    font-family: "Lato", sans-serif;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    color: '#ffffff';
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

const Herodiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 5px;
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    @media (max-width: 768px) {
        width: 100%;
        height: 50vh;
        margin-top: 50px;
    }
`;

const StyledTableItem = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 20px 0;
    padding: 10px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 30%;
    list-style-type: none;
    @media (max-width: 768px) {
        width: 100vw;
    }
`;

const StyledImage = styled.img`
    width: 120px;
    object-fit: cover;
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
            color: '#fff',
        }}>
            <NavA href="#timing"> </NavA>
            <NavA href="#timing">Timing</NavA>
            <NavA href="#tables">Tables</NavA>
            <NavA href="#contecs">contects</NavA>
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
            zIndex: 10,
            backgroundColor: theme.colors.white,
            color: theme.colors.text,
        }}>
            <a>{restorantname}</a>
            <ul className="list">
                <li><a href="#timing">Timing</a></li>
                <li><a href="#tables">Tables</a></li>
                <li><a href="#contecs">Contact</a></li>
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
    const quotes = [
        "People who love to eat are always the best people.",
        "The secret of success in life is to eat what you like and let the food fight it out inside.",
        "A restaurant is a fantasy—a kind of living fantasy in which diners are the most important members of the cast.",
        "Food is symbolic of love when words are inadequate.",
        "Cooking is an art, but all art requires knowing something about the techniques and materials.",
        "One cannot think well, love well, sleep well, if one has not dined well.",
        "Good food is the foundation of genuine happiness.",
        "A recipe has no soul. You, as the cook, must bring soul to the recipe.",
        "Dining is and always was a great artistic opportunity.",
        "You don’t need a silver fork to eat good food.",
        "Food is our common ground, a universal experience.",
        "Life is uncertain. Eat dessert first."
    ];
    return (
        <Herodiv style={{
            backgroundImage: `url(${API_HOST + '/' + restorantLogo})`
        }}>
            <Typography variant="h3" component="div" style={{
                fontSize: '1.5rem',
                color: theme.colors.black,
                textAlign: 'center',
                width: '60%',
                padding: '10px',
                backgroundColor: theme.colors.gray + '69',
                borderRadius: '5px',
                margin: 'auto'
            }}>{
                    quotes[Math.floor(Math.random() * quotes.length)]

                }</Typography>
        </Herodiv>
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
    const { theme } = useTheme();

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
                console.log(data, 'data')
                settables(data.results);
            })
            .catch((error) => console.error('Error:', error));

        fetch(`${API_HOST}/api/restorant/restorant?restorant_id=${id}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                UseRestrontDetails(data);
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
                {/* <Contectlist>
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

                </Contectlist> */}
                <div id="contecs" className="gradient-cards">
                    <div className="card" >
                        <div className="container-card bg-green-box" style={{
                            background: 'linear-gradient(90deg, ' + theme.colors.background + ' 0%, ' + theme.colors.white + ' 100%)',
                            color: theme.colors.text,
                            boxShadow: '0 0 10px ' + theme.colors.shadow,
                        }}>
                            <img src={contect_ilustration} alt="restorant image" style={{
                                width: '100px',
                                objectFit: 'cover',
                                backgroundColor: 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)'
                            }} />
                            <p className="card-title"><PhoneIcon />
                                <a href={`tel:${RestrontDetails.phone}`}> Call us</a></p>
                            <p className="card-title">
                                <SendRoundedIcon /> <a href={`https://wa.me/${RestrontDetails.phone}`}>Whatsapp</a>
                            </p>
                            <p className="card-title"><EmailRoundedIcon /> <a href={`mailto:${RestrontDetails.email}`}>Mail us</a></p>
                            <p className="card-description"><BusinessRoundedIcon />{RestrontDetails.address}</p>
                        </div>
                    </div>
                </div>
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
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '20px',
                padding: '20px',
                listStyleType: 'none',
                margin: '0',
            }}>
                {tables && tables.map((table) => (
                    <StyledTableItem key={table.id}
                        onClick={() => navigate(`/restorant/table/${id}/${table.id}`)} >
                        <Typography variant="h3" component="div" style={{
                            fontSize: '1.2rem',
                            textAlign: 'center',
                            padding: '10px',
                            color: theme.colors.text,
                            borderRadius: '5px',
                        }}>{table.name}</Typography>
                        <StyledImage src={table_icon} alt="table icon" />
                    </StyledTableItem>
                ))}
            </List>
        </Wrapper>
    )
}


export default Restorant_home_view