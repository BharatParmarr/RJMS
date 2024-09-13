import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSpring, animated } from 'react-spring';
import { List, Typography } from '@mui/material';
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
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';


const Wrapper = styled(animated.div)`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  padding-bottom: 200px;
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
    width: 42%;
    text-align: center;
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

const Herodiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    border-radius: 5px;
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: ${({ theme }) => theme.colors.background};
    @media (max-width: 768px) {
        width: 100%;
        height: 100vh;
        margin-top: 50px;
        flex-direction: column-reverse;
    }
`;

const StyledTypographyHero = styled.h1`
    font-size: 4.5rem;
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
    width: 50%;
    padding: 10px;
    margin-top: 20px;
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    line-height: 1.2;
    text-align: left;
    padding-left: 50px;
    @media (max-width: 768px) {
        font-size: 2.5rem;
        width: 100%;
    }
    p{
        font-size: 1.5rem;
        font-weight: 400;
        text-align: left;
        padding-left: 5px;
        color: ${({ theme }) => theme.colors.gray};
        margin-top: 10px;

        @media (max-width: 768px) {
            font-size: 1.2rem;
        }
    }
`;

const StyledImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100%;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const StyledImageHero = styled.img`
    width: 90%;
    object-fit: cover;
    height: 100%;
    border-radius: 5px;
    align-self: center;
    justify-self: center;
    display: flex;
    @media (max-width: 768px) {
        width: 90%;
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


const CardsContainerSpeciality = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    margin-top: 40px;
`;


const CardsOFSpeciality = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    width: 25%;
    height: 300px;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    transition: 0.3s all;

    &:hover {
        transform: scale(1.05);
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;


const CardTitle = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    font-size: 1.8rem;
    font-weight: 600;
`;

const CardDescription = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    font-size: 1.5rem;
    font-weight: 400;
`;

const SectionStyled = styled.section`
    position: relative;
`;


function MySideNav() {
    // const { theme } = useTheme();

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
            height: '60px',
        }}>
            <a style={{
                fontWeight: '800',
                fontStyle: 'italic',
                fontSize: '1.2rem',
            }}>{restorantname}</a>
            <ul className="list">
                <li><a className="mask_link_nav" href="#timing">Timing</a></li>
                <li><a className="mask_link_nav" href="#tables">Tables</a></li>
                <li><a className="mask_link_nav" href="#contecs">Contact</a></li>
                <li><a className="mask_link_nav" href="#">Home</a></li>
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


function HeroSection({ restorantLogo }: any) {
    // const { theme } = useTheme();
    // const quotes = [
    //     'Enjoy Our Delicious Meals.',

    // ];
    return (
        <SectionStyled >
            <Herodiv>
                <StyledTypographyHero >
                    Enjoy Our <br />Delicious Meals.
                    <p>
                        For the love of delicious food.
                    </p>
                </StyledTypographyHero>
                <StyledImageContainer>
                    <StyledImageHero src={restorantLogo} alt="restorant image" />
                </StyledImageContainer>
            </Herodiv>
        </SectionStyled>
    )
}


function FoodSection() {

    let speciality = [
        {
            title: 'Expert Chefs',
            description: 'Our chefs are experts in their field and use the freshest ingredients to create delicious meals.',
            icon: <Diversity1Icon />,
        },
        {
            title: 'Quality Food',
            description: 'We use the freshest ingredients to create delicious meals.',
            icon: <PlaylistAddCheckCircleIcon />,
        },
        {
            title: 'Hygiene',
            description: 'We maintain the highest standards of hygiene to ensure that our customers are safe and healthy.',
            icon: <CleaningServicesIcon />,
        },
        {
            title: 'Hygiene',
            description: 'We maintain the highest standards of hygiene to ensure that our customers are safe and healthy.',
            icon: <CleaningServicesIcon />,
        },

    ]
    return (
        <CardsContainerSpeciality>
            {speciality.map((item, index) => (
                <CardsOFSpeciality key={index}>
                    {item.icon}
                    <CardTitle >
                        {item.title}
                    </CardTitle>
                    <CardDescription>
                        {item.description}
                    </CardDescription>
                </CardsOFSpeciality>
            ))}
        </CardsContainerSpeciality>
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

    const [timeings, settimeings] = useState<any>();

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

        fetch(`${API_HOST}/api/restorants/timeings/${id}`, {
            method: 'GET',
        }).then(response => response.json())
            .then(data => {
                settimeings(data);
                console.log(data, 'timeings')
            })
    }, []);

    let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


    return (
        <Wrapper style={springProps}>
            <NavBarRestorant restorantname={RestrontDetails.name} />
            <HeroSection restorantLogo={RestrontDetails.logo} />
            <FoodSection />
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
                            background: 'linear-gradient(90deg, ' + theme.colors.white + ' 0%, ' + '#ffA500' + '40' + ' 100%)',
                            color: theme.colors.text,
                            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'
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
                        <SectionLi key={day}>
                            {timeings && timeings[day] &&
                                <div>
                                    {timeings[day].is_open ?
                                        <>

                                            <Typography variant="h3" component="div" style={{
                                                fontSize: '1.2rem',
                                                textAlign: 'center',
                                                padding: '10px',
                                                color: theme.colors.text,
                                                borderRadius: '5px',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                display: 'flex',
                                            }}>{day[0].toUpperCase() +
                                                day.slice(1)}<AccessTimeFilledRoundedIcon sx={{
                                                    fontSize: '1.5rem',
                                                    marginLeft: '10px',
                                                    color: 'orange'
                                                }} /></Typography>
                                            <Typography variant="h3" component="div" style={{
                                                fontSize: '1.2rem',
                                                textAlign: 'center',
                                                padding: '10px',
                                                color: theme.colors.text,
                                                borderRadius: '5px',
                                            }}>{timeings[day].open_time} - {timeings[day].close_time}</Typography></> :
                                        <Typography variant="h3" component="div" style={{
                                            fontSize: '1.2rem',
                                            textAlign: 'center',
                                            padding: '10px',
                                            color: theme.colors.text,
                                            borderRadius: '5px',
                                        }}>{day[0].toUpperCase() +
                                            day.slice(1)} - Closed</Typography>
                                    }
                                </div>
                            }
                        </SectionLi>
                    ))}
                </SectionUl>
            </ContainerSection>
            <Typography variant="h3" component="div" id='tables' style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                fontSize: '1.5rem',
                color: theme.colors.text,
                justifyContent: 'center',
                marginTop: '70px',
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
                {tables && tables.length === 0 && <Typography variant="h3" component="div" style={{
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    padding: '10px',
                    color: theme.colors.gray,
                    borderRadius: '5px',
                }}>No tables available</Typography>
                }
            </List>
        </Wrapper>
    )
}


export default Restorant_home_view