import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Paper, Switch, TextField, Typography } from '@mui/material';
import { styled } from 'styled-components';
import { useSpring, animated } from 'react-spring';
import API_HOST from '../config';
import { useTheme } from './styles/theme';
// import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MenuItem, Select } from '@mui/material';
// import { JSX } from "react/jsx-runtime";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useNotification from '../General/useNotification';
import WaitingListJoinForm from "./Waiting_list_join_form";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const StyledPaper = styled(Paper)`
background-color: ${({ theme }) => theme.colors.background};
color: ${({ theme }) => theme.colors.text};
width: 100%;
padding: 20px;
box-shadow: ${({ theme }) => theme.colors.shadow};
border-radius: 10px;

@media (max-width: 600px) {
  padding: 10px;
}

`;

const StyledDiv = styled.div`
  margin: 0;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100vh;
  padding: 20px;

  @media (min-width: 600px) {
    padding: 20px;
  }
`;

const StyledButton = styled(Button)`
margin-top: 16px;
background-color: ${({ theme }) => theme.colors.primary};
color: ${({ theme }) => theme.colors.white};
&:hover {
  background-color: ${({ theme }) => theme.colors.secondary};
}
`;

const StyledList = styled.div`
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 10px;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;

const StyledButton2 = styled.div`
color: ${({ theme }) => theme.colors.primary};
margin: 20px;
padding: 10px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
border-radius: 9px;
background-color: ${({ theme }) => theme.colors.white};

&:hover {
    box-shadow: ${({ theme }) => theme.colors.primary}55 2px 2px 9px 5px;
    color: ${({ theme }) => theme.colors.secondary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    transition: all 0.4s ease-in-out;
}
  & > *:hover {
    box-shadow: 0px 0px 0px 0px;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin: 0px;
    padding: 10px;
  }
`;

const BusinessName = styled.div`
    color: ${({ theme }) => theme.colors.primary};
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 9px;
`;

const DetailsStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 9px;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
`;

const ListImage = styled.img`
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 20px;
`;


function TimeView({ settimedata }: { settimedata: any }) {
    const { theme } = useTheme();
    // start time and end time for each day

    type Time = {
        [key: string]: string,
    }
    type OpenRestoratn = {
        [key: string]: boolean,
    }
    const [timestart, setTimestart] = useState<Time>({ 'monday': '', 'tuesday': '', 'wednesday': '', 'thursday': '', 'friday': '', 'saturday': '', 'sunday': '', });
    const [timeend, setTimeend] = useState<Time>({ 'monday': '', 'tuesday': '', 'wednesday': '', 'thursday': '', 'friday': '', 'saturday': '', 'sunday': '', });
    const [isOpen, setIsOpen] = useState<OpenRestoratn>({ 'monday': true, 'tuesday': true, 'wednesday': true, 'thursday': true, 'friday': true, 'saturday': true, 'sunday': true, });
    // option for set time for each day or same time for all states
    const [opetion, setOpetion] = useState(0);

    function handleChangeopetion(event: any) {
        setOpetion(event.target.value);
    }

    // set time for all days start and end
    function setstarttime(newValue: any) {
        newValue = newValue['$d'].toString();
        setTimestart({ 'monday': newValue, 'tuesday': newValue, 'wednesday': newValue, 'thursday': newValue, 'friday': newValue, 'saturday': newValue, 'sunday': newValue, });
    }
    function setendtime(newValue: any) {
        newValue = newValue['$d'].toString();
        setTimeend({ 'monday': newValue, 'tuesday': newValue, 'wednesday': newValue, 'thursday': newValue, 'friday': newValue, 'saturday': newValue, 'sunday': newValue, });

    }


    // set time for each day start and end sepratly
    function setstarttime1(newValue: any, day: string) {
        let newtime: { [key: string]: string } = { ...timestart };
        newtime[day] = newValue['$d'].toString();
        setTimestart(newtime);
    }
    function setendtime1(newValue: any, day: string) {
        let newtime: { [key: string]: string } = { ...timeend };
        newtime[day] = newValue['$d'].toString();
        setTimeend(newtime);
    }

    useEffect(() => {
        for (let day in timestart) {
            if (timestart[day] === '') {
                return;
            }
        }
        for (let day in timeend) {
            if (timeend[day] === '') {
                return;
            }
        }

        settimedata({ starttime: timestart, endtime: timeend, isOpen: isOpen })
    }, [timestart, timeend, isOpen]);

    const label_for_switch = { inputProps: { 'aria-label': 'Restoratn Closed' } };

    // extract time from date string to show in table as only HH:MM
    function extractTime(dateString: string): string {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        return formattedHours == 'NaN' ? '-' : `${formattedHours}:${formattedMinutes}`;
    }

    let days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

        }}>
            <h2
                style={{
                    color: 'black',
                    marginBottom: '20px',
                    padding: '10px',
                    fontFamily: ' Roboto, Lato, Arial, sans-serif',
                }}
            >Set Restorant Timings</h2>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={opetion}
                label="Age"
                onChange={handleChangeopetion}
                style={{
                    backgroundColor: theme.colors.background,
                    borderRadius: '9px',
                    border: `1px solid ${theme.colors.primary}`,
                    color: theme.colors.text,
                    width: '50%',
                    marginBottom: '20px',
                }}
            >
                <MenuItem value={0}>Same For All</MenuItem>
                <MenuItem value={1}>Select Separately</MenuItem>
            </Select>
            <div>
                {/* time show component */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '10px',
                    gap: '10px',
                    backgroundColor: theme.colors.white,
                }}>
                    <TableContainer style={{
                        backgroundColor: theme.colors.background,
                        borderRadius: '9px',
                        boxShadow: theme.colors.shadow,
                        color: theme.colors.text,
                    }} component={Paper}
                        sx={{ color: theme.colors.text }}
                    >
                        <Table aria-label="simple table" style={{
                            color: theme.colors.text,
                        }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{
                                        color: theme.colors.text,
                                    }}>Day</TableCell>
                                    <TableCell style={{
                                        color: theme.colors.text,
                                    }} align="right">Opening Time</TableCell>
                                    <TableCell style={{
                                        color: theme.colors.text,
                                    }} align="right">Closing Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    days.map((day) => (
                                        <TableRow key={day}>
                                            <TableCell style={{
                                                color: theme.colors.text,
                                            }} component="th" scope="row">
                                                {day}
                                            </TableCell>
                                            <TableCell style={{
                                                color: theme.colors.text,
                                            }} align="right">{extractTime(timestart[day])}</TableCell>
                                            <TableCell style={{
                                                color: theme.colors.text,
                                            }} align="right">{extractTime(timeend[day])}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                width: '100%',
            }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {opetion === 0 ? <>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: '10px',
                            gap: '10px',
                            backgroundColor: theme.colors.background,
                        }}>
                            <TimePicker
                                label="Opening Time"
                                onChange={setstarttime}
                                sx={{
                                    color: theme.colors.text,
                                    backgroundColor: theme.colors.background,
                                    'input': {
                                        color: theme.colors.text,
                                    },
                                    'label': {
                                        color: theme.colors.text,
                                    },
                                }}
                            />
                            <TimePicker
                                label="Closing Time"
                                onChange={setendtime}
                                sx={{
                                    color: theme.colors.text,
                                    backgroundColor: theme.colors.background,
                                    'input': {
                                        color: theme.colors.text,
                                    },
                                    'label': {
                                        color: theme.colors.text,
                                    },
                                    'icon': {
                                        color: theme.colors.text,
                                    }
                                }}
                            />
                        </div>
                    </> : <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        width: '100%',
                        padding: '10px',
                        marginTop: '20px',
                    }}>
                        {
                            days.map((day) => (
                                <div key={day} style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '10px',
                                    backgroundColor: theme.colors.background,
                                    borderRadius: '9px',
                                    color: theme.colors.text,
                                    minWidth: '70%',
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                }}>
                                    {isOpen[day] ? <> <Typography variant="h6" style={{
                                        color: theme.colors.primary,
                                        fontSize: '1rem',
                                    }}>{day.toLocaleUpperCase()}</Typography>
                                        <TimePicker
                                            sx={{
                                                color: theme.colors.text,
                                                backgroundColor: theme.colors.background,
                                                'input': {
                                                    color: theme.colors.text,
                                                },
                                                'label': {
                                                    color: theme.colors.text,
                                                },
                                            }}
                                            label="Opening Time"
                                            onChange={(newValue) => setstarttime1(newValue, day)}
                                        />
                                        <TimePicker
                                            sx={{
                                                color: theme.colors.text,
                                                backgroundColor: theme.colors.background,
                                                'input': {
                                                    color: theme.colors.text,
                                                },
                                                'label': {
                                                    color: theme.colors.text,
                                                },

                                            }}
                                            label="Closing Time"
                                            onChange={(newValue) => setendtime1(newValue, day)}
                                        />
                                        <Switch defaultChecked onChange={() => setIsOpen({ ...isOpen, [day]: !isOpen[day] })} /></> :
                                        <>
                                            <Typography variant="h6" style={{
                                                color: `${({ theme }: any) => theme.colors.primary}`,
                                                fontSize: '1rem',
                                            }}>{day}</Typography>
                                            <Switch {...label_for_switch} onChange={() => setIsOpen({ ...isOpen, [day]: !isOpen[day] })} />
                                        </>}
                                </div>
                            ))
                        }
                    </div>
                    }
                </LocalizationProvider>
            </div>
        </div>
    )
}




export default function Create_restorant() {
    const { openNotification } = useNotification();
    const { theme } = useTheme();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [description, setDescription] = useState('');
    const [logo, setLogo] = useState<any>('');
    const [timedata, setTimedata] = useState<any>(); // store time data for each day
    const [backdrop, setBackdrop] = useState(false)

    const [showForm, setShowForm] = useState(false);
    const [UserHaspermission, setUserHaspermission] = useState(false);
    const [waitingList, setWaitingList] = useState(false);
    function show() {
        setShowForm(!showForm);
    }
    useEffect(() => {
        if (showForm) {
            window.history.pushState(null, '', window.location.href);
        }
    }, [showForm]);
    window.addEventListener('popstate', () => {
        if (showForm) {
            setShowForm(false);
        }
    });
    // spring animation for the form
    const nameSpring = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 200 });
    const addressSpring = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 400 });
    const phoneSpring = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 600 });
    const emailSpring = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 800 });
    const websiteSpring = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 1000 });
    const descriptionSpring = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 1200 });
    const logoSpring = useSpring({ from: { opacity: 0 }, to: { opacity: 1 }, delay: 1400 });

    const AnimatedTextField = animated(TextField);
    // navigation
    const navigate = useNavigate();
    // restorant list
    type Restorant = {
        'manager_restorant': [],
        'staffs': [],
        'created_by': [],
    }
    const [restorants, setRestorants] = useState<Restorant>();

    useEffect(() => {
        setBackdrop(true)
        let yourToken = localStorage.getItem('token');
        fetch(`${API_HOST}/restorants/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${yourToken}`
            }
        })
            .then(response => {
                if (response.status === 401) {
                    openNotification('error', 'Error', 'Your account is not verified.')
                } else if (response.status === 403) {
                    openNotification('error', 'Error', 'You are not authorized to access this page.')
                } else {
                    return response.json()
                }
            })
            .then(data => {
                setRestorants(data)
                let posistion_obj: any = {
                    'restorant': {}
                }
                data.staffs.forEach((business: any) => {
                    posistion_obj.restorant[business.id] = 'staff'
                })
                data.manager_restorant.forEach((business: any) => {
                    posistion_obj.restorant[business.id] = 'manager'
                })
                data.created_by.forEach((business: any) => {
                    posistion_obj.restorant[business.id] = 'owner'
                })
                localStorage.setItem('position', JSON.stringify(posistion_obj));
            })
            .catch((error) => {
                openNotification('error', 'Error', 'Error: ' + error.message)
            })
            .finally(() => setBackdrop(false))

    }, []);
    useEffect(() => {
        let yourToken = localStorage.getItem('token');
        fetch(`${API_HOST}/api/check/user_has_permission/`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${yourToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setUserHaspermission(data.permission);
                setWaitingList(data.waiting_list);
            })
            .catch(error => console.error('Error:', error));
    }, [])

    function onSubmit(e: any) {
        setBackdrop(true)
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('name', name);
        formdata.append('address', address);
        formdata.append('phone', phone);
        formdata.append('email', email);
        formdata.append('website', website);
        formdata.append('description', description);
        // logo append
        if (logo) {
            formdata.append('logo', logo);
        }
        if (!name || !address || !phone || !email || !website || !description) {
            openNotification('warning', 'Warning', 'Please fill all the fields');
            setBackdrop(false)
            return;
        }
        if (logo.size > 2000000) {
            openNotification('warning', 'Warning', 'Image size should be less than 1MB');
            setBackdrop(false)
            return;
        }
        if (logo.type !== 'image/jpeg' && logo.type !== 'image/png') {
            openNotification('warning', 'Warning', 'Image should be in jpeg or png format');
            setBackdrop(false)
            return;
        }
        if (website && !website.includes('https')) {
            openNotification('warning', 'Warning', 'Website should start with https://');
            setBackdrop(false)
            return;
        }

        let yourToken = localStorage.getItem('token');
        fetch(`${API_HOST}/restorants/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${yourToken}`
            },
            body: formdata
        })
            .then(response => {
                console.log(response, 'response');
                if (response.status === 201) {

                    openNotification('success', 'Success', 'Congratulations! Restorant Is Online.');
                    setName('');
                    setAddress('');
                    setPhone('');
                    setEmail('');
                    setWebsite('');
                    setDescription('');
                    setLogo('');
                    setShowForm(false);

                } else {
                    openNotification('error', 'Error', 'Error: ' + response.statusText);
                    setBackdrop(false)
                    return;
                }
                return response.json();
            }).then((data) => {
                fetch(`${API_HOST}/api/restorants/timeings/${data.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${yourToken}`
                    },
                    body: JSON.stringify({
                        'timedata': timedata
                    }),

                }).then(res => res.json()).then(data => {
                    console.log(data);
                }).catch(_err => {
                    openNotification('error', 'Error', 'Something went wrong! Please try again later.');
                    setBackdrop(false)
                })
            })
            .catch((_error) => {
                openNotification('error', 'Error', 'Something went wrong! Please try again later.');
                setBackdrop(false)
            })
    }
    return (
        <StyledDiv>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid item xs={12} sm={8} md={6} style={{
                margin: 'auto',
                padding: '20px',
                borderRadius: '9px',
                background: theme.colors.gradiant1,
                color: theme.colors.text,
            }}>
                <StyledPaper style={{
                    color: theme.colors.text,
                    background: '#ffffff00',
                    boxShadow: 'none'
                }}>
                    <Typography variant="h4" align="center" style={{
                        marginBottom: '20px',
                        fontSize: '1.3rem',
                        color: theme.colors.text,
                        fontFamily: 'Arial, sans-serif',
                        fontWeight: 'bold',
                    }}>
                        My Restaurants
                    </Typography>
                    <StyledList style={{
                        backgroundColor: '#ffffff00',
                        marginBottom: '30px',
                    }} >
                        {restorants?.created_by.length === 0 && restorants?.manager_restorant.length === 0 && restorants?.staffs.length === 0 && <h2 style={{
                            color: theme.colors.text,
                            textAlign: 'center',
                            marginTop: '20px',
                        }}>No restaurants found.</h2>}
                        {restorants?.created_by.map((created_by: any) => (
                            <StyledButton2 key={created_by.id}
                                onClick={() => navigate(`/restorant/${created_by.id}`, { state: { created_by } })}
                            >
                                <ListImage src={created_by.logo} alt={created_by.name} />
                                <BusinessName>
                                    {created_by.name}
                                </BusinessName>
                                <DetailsStyled>
                                    <Typography variant="body1" style={{
                                        color: theme.colors.text + 99,
                                        fontSize: '0.8rem',
                                        textAlign: 'left',
                                    }}>
                                        {created_by.address}
                                        <br />
                                        {created_by.phone}
                                        <br />
                                        {created_by.email}
                                    </Typography>
                                </DetailsStyled>
                            </StyledButton2>
                        ))}
                    </StyledList>
                    {restorants?.manager_restorant && restorants?.manager_restorant.length > 0 && <StyledList>
                        {restorants?.manager_restorant.map((restorant: any) => (
                            <StyledButton2 key={restorant.id}
                                onClick={() => navigate(`/restorant/${restorant.id}`, { state: { restorant } })}
                            >
                                <ListImage src={restorant.logo} alt={restorant.name} />
                                <BusinessName>
                                    {restorant.name}
                                </BusinessName>
                                <DetailsStyled>
                                    <Typography variant="body1" style={{
                                        color: theme.colors.text + 99,
                                        fontSize: '0.8rem',
                                        textAlign: 'left',
                                    }}>
                                        {restorant.address}
                                        <br />
                                        {restorant.phone}
                                        <br />
                                        {restorant.email}
                                    </Typography>
                                </DetailsStyled>
                            </StyledButton2>
                        ))}
                    </StyledList>}
                    {restorants?.staffs && restorants.staffs.length > 0 &&
                        <StyledList style={{
                            color: theme.colors.primary,
                        }}>
                            {restorants?.staffs.map((staff: any) => (
                                <StyledButton2 key={staff.id}
                                    onClick={() => navigate(`/restorant/${staff.id}`, { state: { staff } })}
                                >
                                    <ListImage src={staff.logo} alt={staff.name} />
                                    <BusinessName>
                                        {staff.name}
                                    </BusinessName>
                                    <DetailsStyled>
                                        <Typography variant="body1" style={{
                                            color: theme.colors.text + 99,
                                            fontSize: '0.8rem',
                                            textAlign: 'left',
                                        }}>
                                            {staff.address}
                                            <br />
                                            {staff.phone}
                                            <br />
                                            {staff.email}
                                        </Typography>
                                    </DetailsStyled>
                                </StyledButton2>
                            ))}
                        </StyledList>}
                    <Button onClick={() => show()} style={{
                        background: `${({ theme }: any) => theme.colors.gradiant1}`,
                        color: `#fff`,
                        borderRadius: '10px',
                        padding: '10px',
                        marginBottom: '20px',
                        boxShadow: `${({ theme }: any) => theme.colors.shadow}`,
                    }}
                        sx={{
                            '&:hover': {
                                background: `${({ theme }: any) => theme.colors.gradiant1}`,
                                scale: '1.02',
                            },
                        }}
                        endIcon={<AddIcon />}
                        variant="contained"
                    >
                        {UserHaspermission ? 'Create Restorant' : 'Waiting List'}
                    </Button>
                    {/* form */}
                    {UserHaspermission ? <StyledForm onSubmit={onSubmit} style={{
                        display: showForm ? 'block' : 'none',
                        paddingTop: '20px',
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        overflow: 'auto',
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                        backgroundColor: theme.colors.white,
                    }}>
                        <h2
                            style={{
                                color: theme.colors.primary,
                                marginBottom: '20px',
                                padding: '10px',
                                fontFamily: ' Roboto, Lato, Arial, sans-serif',
                            }}
                        >Create Restaurant</h2>
                        <Button onClick={() => show()} style={{
                            backgroundColor: `${({ theme }: any) => theme.colors.primary}`,
                            color: `${({ theme }: any) => theme.colors.white}`,
                            borderRadius: '10px 0px 0px 10px',
                            padding: '10px',
                            marginBottom: '20px',
                            boxShadow: `${({ theme }: any) => theme.colors.shadow}`,
                            position: 'absolute',
                            top: '12px',
                            right: '0',
                        }}
                            variant="contained"
                        >Close</Button>
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            size="small"
                            type="text"
                            label="Name" variant="outlined"
                            onChange={(e) => {
                                e.preventDefault();
                                setName(e.target.value);
                            }}
                            value={name}
                            style={{
                                ...nameSpring,
                                backgroundColor: theme.colors.background,
                                borderRadius: '10px',
                                border: `1px solid ${({ theme }: any) => theme.colors.primary}`,
                                width: '97%',
                                marginLeft: '1.5%',

                            }}
                            sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }}
                        />
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="text"
                            size="small"
                            label="Address" variant="outlined"
                            onChange={e => setAddress(e.target.value)}
                            style={{
                                ...addressSpring,
                                backgroundColor: theme.colors.background,
                                borderRadius: '10px',
                                border: `1px solid ${({ theme }: any) => theme.colors.primary}`,
                                width: '97%',
                                marginLeft: '1.5%',
                            }}
                            sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }}
                        />
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="text"
                            size="small"
                            label="Phone" variant="outlined"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            style={{
                                ...phoneSpring,
                                backgroundColor: theme.colors.background,
                                borderRadius: '10px',
                                border: `1px solid ${({ theme }: any) => theme.colors.primary}`,
                                width: '97%',
                                marginLeft: '1.5%',
                            }}
                            sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }}
                        />
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="email"
                            size="small"
                            label="Email" variant="outlined"
                            onChange={e => setEmail(e.target.value)}
                            style={{
                                ...emailSpring,
                                backgroundColor: theme.colors.background,
                                borderRadius: '10px',
                                border: `1px solid ${({ theme }: any) => theme.colors.primary}`,
                                width: '97%',
                                marginLeft: '1.5%',
                            }}
                            sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }}
                        />
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="text"
                            size="small"
                            label="Website" variant="outlined"
                            onChange={e => {
                                e.preventDefault()
                                setWebsite(e.target.value)
                            }}
                            style={{
                                ...websiteSpring,
                                backgroundColor: theme.colors.background,
                                borderRadius: '10px',
                                border: `1px solid ${({ theme }: any) => theme.colors.primary}`,
                                width: '97%',
                                marginLeft: '1.5%',
                            }}
                            sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }}
                        />
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="text"
                            size="medium"
                            label="Description" variant="outlined"
                            onChange={e => setDescription(e.target.value)}
                            style={{
                                ...descriptionSpring,
                                borderRadius: '10px',
                                backgroundColor: theme.colors.background,
                                width: '97%',
                                marginLeft: '1.5%',
                            }}
                            sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }}
                        />
                        <AnimatedTextField
                            fullWidth
                            margin="normal"
                            type="file"
                            onChange={(e: any) => setLogo(e.target.files ? e.target.files[0] : '')}
                            style={{
                                ...logoSpring,
                                backgroundColor: theme.colors.background,
                                borderRadius: '10px',
                                width: '27%',
                                marginLeft: '1.5%',
                            }}
                            sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text } }}
                        />
                        {logo && <img src={URL.createObjectURL(logo)} alt="logo" style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: '12px',
                            marginLeft: '1.5%',
                            marginBottom: '20px',
                            display: 'block',
                        }} />}
                        <TimeView settimedata={setTimedata} />
                        <StyledButton
                            fullWidth
                            type="submit"
                            variant="contained"
                            style={{
                                backgroundColor: !(name && address && phone && email && website && description && timedata) ? theme.colors.gray : theme.colors.primary,
                                borderRadius: '10px',
                                padding: '10px',
                                boxShadow: theme.colors.shadow,
                                width: '67%',
                                marginLeft: '16.5%',
                                marginBottom: '20px',
                                marginTop: '20px',
                            }}
                            disabled={!(name && address && phone && email && website && description && timedata)}
                        >Create Restaurant
                        </StyledButton>
                    </StyledForm> :
                        <StyledForm
                            style={{
                                display: showForm ? 'block' : 'none',
                                position: 'fixed',
                                top: '0',
                                left: '0',
                                overflow: 'auto',
                                width: '100%',
                                height: '100%',
                                zIndex: 1,
                            }}
                        >
                            <Button onClick={() => show()} style={{
                                backgroundColor: `${({ theme }: any) => theme.colors.white}`,
                                color: `${({ theme }: any) => theme.colors.primary}`,
                                borderRadius: '10px',
                                padding: '10px',
                                marginBottom: '20px',
                                boxShadow: `${({ theme }: any) => theme.colors.shadow}`,
                                position: 'absolute',
                                top: '12px',
                                right: '0',
                                fontSize: '1.5rem',
                            }}
                                variant="text"
                            >X</Button>
                            <WaitingListJoinForm waitingList={waitingList} setWaitingList={(value: any) => setWaitingList(value)} />
                        </StyledForm>
                    }
                </StyledPaper>
            </Grid>
        </StyledDiv>
    )
}