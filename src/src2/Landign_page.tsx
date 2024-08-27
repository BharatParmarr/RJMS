// src/components/LandingPage.js
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import hospital from '../Static/hospital.png'
// import { apis2 } from '../apis';
import { useParams } from 'react-router-dom';
// ... existing imports ...
// import RoomIcon from '@mui/icons-material/Room';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
// import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import { CardContent, Typography, Avatar } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import axios from 'axios';
import API_HOST from '../config';

const Container = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-family: Arial, sans-serif;
background: linear-gradient(81deg, rgba(0,41,71,0.4132644268644958) 0%, rgba(0,23,178,0.3460375361081933) 99%);
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const NavLogo = styled.img`
  width: 50px;
  height: 50px;
    object-fit: cover;
    border-radius: 8px;
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 60px;
    left: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: all 0.3s ease-in;
    height: calc(100vh - 60px);
  }
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  margin: 0 1rem;
  
  @media (max-width: 768px) {
    padding: 0.5rem 0;
  }

  &::after {
    content: '';
    width: 0;
    height: 2px;
    display: block;
    background: white;
    transition: width 0.3s;
  }

    &:hover::after {
        width: 100%;
    }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const HeroSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  width: 100%;


  @media (max-width: 768px) {
    flex-direction: column;
    min-height: 90vh; 
  }
`;

const HeroContent = styled.div`
  flex: 1;
    padding: 2rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    width: 100%;
    @media (max-width: 768px) {
        text-align: center;
    }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    width: 100%;
    text-align: center;
    text-transform: capitalize;
    overflow-wrap: break-word;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const HeroCanvas = styled.div`
  width: 50%;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    margin-top: 2rem;
  }
`;

const DetailsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
  margin-top: 2rem;

`;

const DetailCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px ${({ theme }) => theme.colors.shadow};
  transition: all 0.3s ease-in;
  height: fit-content;  
`;

const DetailsSection2 = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  gap: 2rem;
  padding: 2rem;
  margin-top: 2rem;
  min-height: 100vh;
  
`;

// ... existing styled components ...

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 5px 0;
`;


const TimingRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

const Contact = styled.p`
  font-size: 1em;
  margin: 20px 0;
  color: #fff;
`;

const Containerdivimage = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        width: 200px;
        height: 200px;
    }
`;

const Image = styled.img`
    width: 65%;
    height: 65%;
    object-fit: cover;
    transform: rotateY(180deg);
    animation: filter_animation 10s infinite;

    @keyframes filter_animation {
        0% {
            filter: hue-rotate(0deg);
        }
        100% {
            filter: hue-rotate(360deg);
        }
    }

    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
    }
`;

const FooterSection = styled.footer`
    background-color: ${({ theme }) => theme.colors.footerBg};
    color: black;
    padding: 1rem;
    text-align: center;
    min-height: 30vh;
    border-top: 1px solid ${({ theme }) => theme.colors.primary};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(315deg, rgba(101,0,94,1) 3%, rgba(60,132,206,1) 38%, rgba(48,238,226,1) 68%, rgba(255,25,25,1) 98%);
    background-size: 300% 300%;
    animation: gradient 10s ease infinite;
    position: relative;
    z-index: 1;
    overflow: hidden;


    @keyframes gradient {
    0% {
        background-position: 0% 0%;
    }
    50% {
        background-position: 100% 100%;
    }
    100% {
        background-position: 0% 0%;
    }
}

.wave {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 1000% 1000% 0 0;
    position: absolute;
    width: 200%;
    height: 12em;
    animation: wave 10s -3s linear infinite;
    transform: translate3d(0, 0, 0);
    opacity: 0.8;
    bottom: 0;
    left: 0;
    z-index: -1;
}

.wave:nth-of-type(2) {
    bottom: -1.25em;
    animation: wave 18s linear reverse infinite;
    opacity: 0.8;
}

.wave:nth-of-type(3) {
    bottom: -2.5em;
    animation: wave 20s -1s reverse infinite;
    opacity: 0.9;
}

@keyframes wave {
    2% {
        transform: translateX(1);
    }

    25% {
        transform: translateX(-25%);
    }

    50% {
        transform: translateX(-50%);
    }

    75% {
        transform: translateX(-25%);
    }

    100% {
        transform: translateX(1);
    }
}
`;

const LinePera = styled.p`
    margin: 0.5rem 0;
`;

const SectionTitle = styled(Typography)({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
});

const CustomListItem = styled(ListItem)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
});

const CustomAvatar = styled(Avatar)({
    marginRight: '10px',
});

const iconStyle = { marginRight: '10px' };

// saprate design for room list and bed list

// const RoomList = styled(List)`
//     padding-left: 20px;
//     font-size: 1.2rem;
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
// `;

// const RoomItem = styled(ListItem)`
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
// `;

// const BedListHolder = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//     padding-left: 20px;
//     border-left: 2px solid ${({ theme }) => theme.colors.primary};
//     margin-top: 10px;
//     background-color: ${({ theme }) => theme.colors.background};
//     margin-left: 20px;
//     padding: 10px;
// `

// const BedListItem = styled(ListItem)`
//     display: flex;
//     flex-direction: column;
//     gap: 5px;
//     padding-left: 20px;
//     border-left: 2px solid ${({ theme }) => theme.colors.primary};
//     background-color: ${({ theme }) => theme.colors.background};
//     margin-left: 20px;
//     padding: 10px;
// `;

const HospitalInfo = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    padding: 2rem;
    margin-top: 2rem;
    gap: 2rem;
    min-height: 100vh;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const HospitalInfoCard = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px ${({ theme }) => theme.colors.shadow};
    transition: all 0.3s ease-in;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 30%;

    @media (max-width: 768px) {
        width: 90%;
    }
`;

const HospitalIcon = styled.div`
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.primary};
`;

const HospitalInfoCardHeading = styled.h2`
    color: ${({ theme }) => theme.colors.primary};
`;

// const HospitalInfoCardText = styled.p`
//     color: ${({ theme }) => theme.colors.text};
// `;

// const HospitalInfoCardList = styled.ul`
//     list-style-type: none;
//     padding: 0;
// `;


// review section

const Syledsection = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
    margin-top: 2rem;
`;

const ReviewCard = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px ${({ theme }) => theme.colors.shadow};
    transition: all 0.3s ease-in;
    height: fit-content;
background: rgba(255, 255, 255, 0.2);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
backdrop-filter: blur(5px);
-webkit-backdrop-filter: blur(5px);
border: 1px solid rgba(255, 255, 255, 0.3);
color: #fff;
`;

const ReviewRating = styled.p`
    font-size: 2rem;
    color: yellow;
    margin-bottom: 1rem;
`;

const ReviewContent = styled.p`
    font-size: 1.2rem;
    margin-bottom: 1rem;
`;

const ReviewAuthor = styled.p`
    font-size: 1rem;
    font-weight: bold;
`;



function HospitalReviews() {
    const reviews = [
        {
            id: 1,
            name: 'John Doe',
            review: 'The hospital is very clean and the staff is very friendly. I would highly recommend this hospital to anyone looking for quality healthcare services.',
            rating: 5,
        },
        {
            id: 2,
            name: 'Jane Doe',
            review: 'I had a great experience at this hospital. The doctors were very knowledgeable and the nurses were very caring. I would definitely go back if I ever need medical care again.',
            rating: 4,
        },
        {
            id: 3,
            name: 'Alice Smith',
            review: 'The hospital is very well maintained and the staff is very professional. I was very impressed with the level of care I received. I would definitely recommend this hospital to my friends and family.',
            rating: 5,
        },
    ]
    return (
        <Syledsection>
            {
                reviews.map((review) => (
                    <ReviewCard key={review.id}>
                        <ReviewRating>{'⋆'.repeat(review.rating)}</ReviewRating>
                        <ReviewContent>{review.review}</ReviewContent>
                        <ReviewAuthor>{review.name}</ReviewAuthor>
                    </ReviewCard>
                ))
            }
        </Syledsection>
    );
}


type Key = string | number | null | undefined;


function HospitalBuilding3D() {
    // 
    return (
        <Containerdivimage>
            <Image src={hospital} alt="Hospital Building" />
        </Containerdivimage>
    );
}

type Hospiatl_data = {
    business: {
        name: string;
        address: string;
        phone: string;
        email: string;
        logo: string;
    };
    specialties: string;
    facilities_available: string;
    number_of_beds: number;
    number_of_rooms: number;
    opening_hours: string;
    timings: Array<{ day: string; opening_time: string; closing_time: string }>;
};

const LandingPage = ({ hospital }: any) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // ... existing destructuring ...
    const {
        business: { name, address, phone, email, logo },
        specialties,
        facilities_available,
        number_of_beds,
        number_of_rooms,
        opening_hours,
        timings,
    } = hospital as Hospiatl_data;

    return (
        <Container>
            <NavBar>
                <NavLogo src={logo} alt={`${name} Logo`} />
                <MenuButton onClick={toggleMenu}>☰</MenuButton>
                <NavLinks isOpen={isMenuOpen}>
                    <NavLink href="#specialties">Specialties</NavLink>
                    <NavLink href="#facilities">Facilities</NavLink>
                    <NavLink href="#details">Details</NavLink>
                    <NavLink href="#timings">Timings</NavLink>
                </NavLinks>
            </NavBar>
            <HeroSection>
                <HeroContent>
                    <HeroTitle
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    > lskd djlks
                        {'' + name.toUpperCase()}
                    </HeroTitle>
                    <HeroSubtitle
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {address}
                    </HeroSubtitle>
                    <Contact>Email: {email} | Phone: {phone}</Contact>
                </HeroContent>
                <HeroCanvas>
                    {/* something 3d without any library */}
                    <HospitalBuilding3D />
                </HeroCanvas>
            </HeroSection>
            {/* info section */}
            <HospitalInfo>
                <HospitalInfoCard>
                    <HospitalIcon><MedicalServicesIcon /></HospitalIcon>
                    <HospitalInfoCardHeading>Advanced Technology</HospitalInfoCardHeading>
                    All the latest technology and equipment are available in the hospital. The hospital is equipped with the latest technology and equipment to provide the best possible care to the patients.
                </HospitalInfoCard>
                <HospitalInfoCard>
                    <HospitalIcon><EventAvailableIcon /></HospitalIcon>
                    <HospitalInfoCardHeading>24/7 Availability</HospitalInfoCardHeading>
                    The hospital is open 24 hours a day, 7 days a week. The hospital is always available to provide care to the patients.
                </HospitalInfoCard>
                <HospitalInfoCard>
                    <HospitalIcon><NotificationImportantIcon /></HospitalIcon>
                    <HospitalInfoCardHeading>Emergency Services</HospitalInfoCardHeading>
                    The hospital provides emergency services to the patients. The hospital is equipped to handle all kinds of emergencies.
                </HospitalInfoCard>
                <HospitalInfoCard>
                    <HospitalIcon><LocalHospitalIcon /></HospitalIcon>
                    <HospitalInfoCardHeading>Specialized Care</HospitalInfoCardHeading>
                    The hospital provides specialized care to the patients. The hospital has a team of highly skilled and experienced doctors who are experts in their respective fields.
                </HospitalInfoCard>
            </HospitalInfo>
            {/* Hospital Revies section */}
            <HospitalReviews />
            {/* Hospital Details section */}
            <DetailsSection>
                <DetailCard
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <SectionTitle id="specialties">Specialties</SectionTitle>
                    <List>
                        {specialties.split(',').map((specialty: string, index: Key | null | undefined) => (
                            <ListItem key={index}>{specialty.trim()}</ListItem>
                        ))}
                    </List>
                </DetailCard>

                <DetailCard
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <SectionTitle id="facilities">Facilities Available</SectionTitle>
                    <p>{facilities_available}</p>
                </DetailCard>

                <DetailCard
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <SectionTitle id="details">Details</SectionTitle>
                    <List>
                        <ListItem>Number of Beds: {number_of_beds}</ListItem>
                        <ListItem>Number of Rooms: {number_of_rooms}</ListItem>
                    </List>
                </DetailCard>
                <DetailCard
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <SectionTitle id="timings">Opening Hours</SectionTitle>
                    <p>{opening_hours}</p>
                    {timings && timings.length > 0 && (
                        <>
                            <SectionTitle>Timings</SectionTitle>
                            {timings.map((timing: { day: string; opening_time: string; closing_time: string }, index: Key | null | undefined) => (
                                <TimingRow key={index}>
                                    <span>{timing.day}</span>
                                    <span>
                                        {timing.opening_time} - {timing.closing_time}
                                    </span>
                                </TimingRow>
                            ))}
                        </>
                    )}
                </DetailCard>
            </DetailsSection>
            <DetailsSection2>
                {/* <DetailCard transition={{ type: 'spring', stiffness: 300 }}>
                    <CardContent>
                        <SectionTitle><RoomIcon style={iconStyle} />Rooms</SectionTitle>
                        <RoomList>
                            {hospital.rooms && hospital.rooms.map((room: { room_number: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; room_type: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; beds: any[]; }, index: Key | null | undefined) => (
                                <RoomItem key={index}>
                                    <strong>Room Number:</strong> {room.room_number} | <strong>Room Type:</strong> {room.room_type}
                                    <BedListHolder>
                                        {room.beds.map((bed, index) => (
                                            <BedListItem key={index}>
                                                <strong>Bed Number:</strong> {bed.bed_number} | <strong>Occupied:</strong> {bed.bed_occupied ? 'Yes' : 'No'}
                                            </BedListItem>
                                        ))}
                                    </BedListHolder>
                                </RoomItem>
                            ))}
                        </RoomList>
                    </CardContent>
                </DetailCard> */}

                <DetailCard transition={{ type: 'spring', stiffness: 300 }}>
                    <CardContent>
                        <SectionTitle><LocalHospitalIcon style={iconStyle} />Doctors</SectionTitle>
                        <List>
                            {hospital.doctors.map((doctor: { profile_picture: string | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; specialties: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; phone: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; email: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
                                <CustomListItem key={index}>
                                    <CustomAvatar src={doctor.profile_picture} alt={`${doctor.name} Profile`} />
                                    <div>
                                        <strong>Name:</strong> {doctor.name} | <strong>Specialties:</strong> {doctor.specialties} | <strong>Phone:</strong> {doctor.phone} | <strong>Email:</strong> {doctor.email}
                                    </div>
                                </CustomListItem>
                            ))}
                        </List>
                    </CardContent>
                </DetailCard>

                <DetailCard transition={{ type: 'spring', stiffness: 300 }}>
                    <CardContent>
                        <SectionTitle><PersonIcon style={iconStyle} />Nurses</SectionTitle>
                        <List>
                            {hospital.nurses.map((nurse: { profile_picture: string | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
                                <CustomListItem key={index}>
                                    <CustomAvatar src={nurse.profile_picture} alt={`${nurse.name} Profile`} />
                                    <div>
                                        <strong>Name:</strong> {nurse.name}
                                    </div>
                                </CustomListItem>
                            ))}
                        </List>
                    </CardContent>
                </DetailCard>

                {/* <DetailCard transition={{ type: 'spring', stiffness: 300 }}>
                    <CardContent>
                        <SectionTitle><PeopleIcon style={iconStyle} />Staffs</SectionTitle>
                        <List>
                            {hospital.staffs.map((staff: { profile_picture: string | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
                                <CustomListItem key={index}>
                                    <CustomAvatar src={staff.profile_picture} alt={`${staff.name} Profile`} />
                                    <div>
                                        <strong>Name:</strong> {staff.name}
                                    </div>
                                </CustomListItem>
                            ))}
                        </List>
                    </CardContent>
                </DetailCard> */}

                <DetailCard transition={{ type: 'spring', stiffness: 300 }}>
                    <CardContent>
                        <SectionTitle><BuildIcon style={iconStyle} />Facilities</SectionTitle>
                        <List>
                            {hospital.facilities.map((facility: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
                                <CustomListItem key={index}>
                                    <strong>Name:</strong> {facility.name} | <strong>Price:</strong> {facility.price}
                                </CustomListItem>
                            ))}
                        </List>
                    </CardContent>
                </DetailCard>

            </DetailsSection2>
            <FooterSection>
                <div className="wave"></div>
                <div className="wave"></div>
                <div className="wave"></div>
                <LinePera>
                    All rights reserved &copy; {new Date().getFullYear()}
                </LinePera>
                <LinePera>
                    <a href="https://example.com">Terms & Conditions</a>
                </LinePera>
                <LinePera>
                    <a href="https://example.com">Privacy Policy</a>
                </LinePera>
            </FooterSection>
        </Container>
    );
};


// ... existing HomePage_Landingpage component ...

export default function HomePage_Landingpage() {

    // const hospital = {
    //     business: {
    //         name: 'Hospital Name',
    //         address: 'Hospital Address',
    //         phone: '1234567890',
    //         email: 'ajlkjds lkjlkj.com',
    //         logo: 'https://via.placeholder.com/150',
    //     },
    //     specialties: 'Specialty 1, Specialty 2, Specialty 3',
    //     facilities_available: 'Facility 1, Facility 2, Facility 3',
    //     number_of_beds: 100,
    //     number_of_rooms: 50,
    //     opening_hours: 'Monday - Sunday',
    //     timings: [
    //         {day: 'Monday', opening_time: '9:00 AM', closing_time: '5:00 PM' },
    //         {day: 'Tuesday', opening_time: '9:00 AM', closing_time: '5:00 PM' },
    //         {day: 'Wednesday', opening_time: '9:00 AM', closing_time: '5:00 PM' },
    //         {day: 'Thursday', opening_time: '9:00 AM', closing_time: '5:00 PM' },
    //         {day: 'Friday', opening_time: '9:00 AM', closing_time: '5:00 PM' },
    //         {day: 'Saturday', opening_time: '9:00 AM', closing_time: '5:00 PM' },
    //         {day: 'Sunday', opening_time: '9:00 AM', closing_time: '5:00 PM' },
    //     ],
    // };

    const [hospital, setHospital] = useState({});
    const { sub_id } = useParams();
    useEffect(() => {
        // fetch hospital data
        async function datafeatch() {
            const res = await axios.get(API_HOST + '/api2/req' + '/webview/' + sub_id);
            console.log(res.data);
            setHospital(res.data.data);
        }
        datafeatch();
    }, []);

    return (
        <>
            {hospital && Object.keys(hospital).length > 0 && <LandingPage hospital={hospital} />}
        </>
    );
}
