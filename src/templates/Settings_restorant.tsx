import api from "../apirestorant"
import styled from "styled-components"
import { useTheme } from "./styles/theme"
import {
    Button,
    TextField,
    InputLabel,
    Typography,
} from '@mui/material';
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PersonRemoveAlt1RoundedIcon from '@mui/icons-material/PersonRemoveAlt1Rounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import Hospital_Timings from "../src2/component2/Hospital_timings";
import Side_pannel_genral from "../src2/component2/Side_pannel_genral";
import { Card, CardContent, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import GroupIcon from '@mui/icons-material/Group';
import InfoIcon from '@mui/icons-material/Info';

const StyledDiv = styled.div`
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    height: 100vh;
    width: 85%;
    overflow: auto;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        width: 100%;
    }
`
const StyledDivcontainer = styled.div`
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
    padding: 0px;
    }
`
const StyledTypography = styled.h1`
    color: ${({ theme }) => theme.colors.text};
    font-size: 20px;
    display: flex;
    flex-direction: column;
    gap: 9px;
    margin-top: 20px;

    @media (max-width: 768px) {
        font-size: 16px;
        flex-direction: column;
    }
`
const StyledTextfield = styled(TextField)`
    color: ${({ theme }) => theme.colors.text};
    font-size: 20px;
    margin-top: 20px;
`

const Container = styled.div`
  width: 300px;
  margin: 20px auto;
  border: 1px solid ${({ theme }) => theme.colors.text};
  align-items: center;
    justify-content: center;
    display: flex;
    padding: 20px;
`;

const HiddenInput = styled(TextField)`
  display: none;
`;

const StyledSubmitButton = styled(Button)`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    margin-top: 20px;
    `;

const SaveButton = styled(Button)`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    margin-top: 20px;
    `;

const StyldeButton = styled(Button)`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    margin-top: 20px;
    width: 15%;
    @media (max-width: 768px) {
        width: 70%;
    }
    `;

const StyledDivHolder = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.text};
    padding-bottom: 10px;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
    }
    `;

const ContainerHOlder = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;

    @media (max-width: 768px) {
        flex-direction: column;
    }

    `;

const StyledCard = styled(Card)`
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StyledCardHeader = styled(CardContent)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
`;

function Hostel_info_change({ hosteldata }: any) {
    const { theme } = useTheme()
    const { id } = useParams()
    const navigate = useNavigate()
    // let For = "hostel"

    const [hostelDetails, setHostelDetails] = useState({
        name: hosteldata.name ? hosteldata.name : '',
        address: hosteldata.address ? hosteldata.address : '',
        phone: hosteldata.phone ? hosteldata.phone : '',
        email: hosteldata.email ? hosteldata.email : '',
        website: hosteldata.website ? hosteldata.website : '',
    });
    const [image, setImage] = useState<Blob | MediaSource | null>(hosteldata.logo ? hosteldata.logo : null);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setHostelDetails({
            ...hostelDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e: any) => {
        if (e.target.files && e.target.files.length) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('name', hostelDetails.name);
        formData.append('address', hostelDetails.address);
        formData.append('phone', hostelDetails.phone);
        formData.append('email', hostelDetails.email);
        formData.append('website', hostelDetails.website);
        if (id) { formData.append('restorant_id', id); } else {
            navigate('create-restaurant')
        }
        if (image) {
            if (image instanceof Blob) {
                formData.append('logo', image);
            }
        }

        api.put(`/restorant`, formData).then((response) => {
            if (response.status === 200) {
                alert('Hostel details updated successfully')
            }
        }).catch((error) => {
            console.log(error)
        })
    };


    return (
        <StyledDivcontainer style={{
            backgroundColor: theme.colors.white,
            padding: 20,
        }}>
            <StyledTypography>
                <StyledTextfield label="Name" variant="outlined"
                    name="name"
                    value={hostelDetails.name}
                    onChange={handleChange}
                    sx={{
                        label: { color: theme.colors.text },
                        '& .MuiOutlinedInput-root': { color: theme.colors.text },
                        '& .MuiInputLabel-root': { color: theme.colors.text },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.colors.text },
                    }} />
                <StyledTextfield label="Address" variant="outlined"
                    name="address"
                    value={hostelDetails.address}
                    onChange={handleChange}
                    sx={{
                        label: { color: theme.colors.text },
                        '& .MuiOutlinedInput-root': { color: theme.colors.text },
                        '& .MuiInputLabel-root': { color: theme.colors.text },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.colors.text },
                    }} />
                <StyledTextfield label="Phone" variant="outlined"
                    name="phone"
                    value={hostelDetails.phone}
                    onChange={handleChange}
                    sx={{
                        label: { color: theme.colors.text },
                        '& .MuiOutlinedInput-root': { color: theme.colors.text },
                        '& .MuiInputLabel-root': { color: theme.colors.text },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.colors.text },
                    }} />
                <StyledTextfield label="Email" variant="outlined"
                    name="email"
                    value={hostelDetails.email}
                    onChange={handleChange}
                    sx={{
                        label: { color: theme.colors.text },
                        '& .MuiOutlinedInput-root': { color: theme.colors.text },
                        '& .MuiInputLabel-root': { color: theme.colors.text },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.colors.text },
                    }} />
                <StyledTextfield label="Website" variant="outlined"
                    name="website"
                    value={hostelDetails.website}
                    onChange={handleChange}
                    sx={{
                        label: { color: theme.colors.text },
                        '& .MuiOutlinedInput-root': { color: theme.colors.text },
                        '& .MuiInputLabel-root': { color: theme.colors.text },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.colors.text },
                    }} />
                <Container style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 20,

                }}>
                    {/* {image start with /media thenAPI_HOST + image :  URL.createObjectURL(image)} */}
                    <InputLabel htmlFor="upload-photo" style={{
                        color: theme.colors.text,
                    }}>
                        {image ? <img src={image instanceof Blob ? URL.createObjectURL(image) : image.toString()} alt="hostel" style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 10
                        }} /> : 'Upload Hostel Image'}
                        Upload Hostel Image
                    </InputLabel>
                    <HiddenInput
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        onChange={handleImageChange}
                    />
                </Container>
                <StyledSubmitButton variant="contained" onClick={handleSubmit}>
                    Submit
                </StyledSubmitButton>
            </StyledTypography>
        </StyledDivcontainer>
    )
}


function SettingsSection({ title, icon, children }: any) {
    const [expanded, setExpanded] = useState(false);

    return (
        <StyledCard>
            <StyledCardHeader onClick={() => setExpanded(!expanded)}>
                <Typography variant="h6" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {icon}
                    {title}
                </Typography>
                <IconButton
                    onClick={() => setExpanded(!expanded)}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </StyledCardHeader>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>{children}</CardContent>
            </Collapse>
        </StyledCard>
    );
}

function Settings_component() {
    const { theme } = useTheme()
    const { id } = useParams()
    // const navigate = useNavigate()
    // let For = "hostel"

    type Hostel = {
        id: number;
        name: string;
        address: string;
        phone: string;
        email: string;
        website: string;
        logo?: string;
    };
    const [hostels, setHostels] = useState<Hostel>();

    useEffect(() => {
        api.get(`/restorant?restorant_id=${id}`).then((response) => {
            if (response.status === 200) {
                setHostels(response.data);
            }
        });
    }, []);

    const [Manager_name, setManager_name] = useState('');
    const [Staff_name, setStaff_name] = useState('');

    const [Manager, setManager] = useState<string>();
    const [Staff, setStaff] = useState<string[]>();
    useEffect(() => {
        api.get(`/restorant/SetManager?restorant_id=` + id).then((response) => {
            console.log(response, 'response');
            if (response.status === 200) {
                setManager(response.data.manager);
                setStaff(response.data.staffs)
            }
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let data = {
            restorant_id: id,
            username: Manager_name
        }
        if (!Manager_name) {
            alert('Please enter manager name')
            return
        }
        api.put(`/restorant/SetManager`, data).then((response) => {
            if (response.status === 200) {
                setManager(Manager_name)
                setManager_name('')
            }
            if (response.status === 409) {
                alert('User not found')
            }
        }).catch((error) => {
            if (error.response.status === 409) {
                alert('User not found')
            }
        })
    };

    const removeManger = () => {
        api.delete(`/restorant/SetManager?restorant_id=${id}&manager=1&manager_name=${Manager}`).then((response) => {
            if (response.status === 200) {
                setManager('')
            }
        }).catch((error) => {
            console.log(error)
        })
    };
    const removeStaff = (staff: any) => {
        api.delete(`/restorant/SetManager?restorant_id=${id}&manager=0&manager_name=${staff}`).then((response) => {
            if (response.status === 200) {
                setStaff(Staff?.filter((item) => item !== staff))
            }
        }).catch((error) => {
            console.log(error)
        })
    };
    const handleSubmit2 = (e: any) => {
        e.preventDefault();
        if (!Staff_name) {
            alert('Please enter staff name')
            return
        }
        api.post(`/restorant/SetManager`, { restorant_id: id, username: Staff_name }).then((response) => {
            console.log(response.status, 'response');
            if (response.status === 200) {
                setStaff([...Staff!, Staff_name])
                setStaff_name('')
            }
            if (response.status === 409) {
                alert('User not found')
            }
        }).catch((error) => {
            if (error.response.status === 409) {
                alert('User not found')
            }
        })
    };

    const [showManager, setShowManager] = useState(false);
    const [showStaff, setShowStaff] = useState(false);
    return (
        <StyledDivcontainer>
            <SettingsSection title="Manager" icon={<SupervisorAccountIcon />}>
                <StyledTypography style={{
                    backgroundColor: theme.colors.white,
                    padding: '14px',
                    color: theme.colors.text,
                    borderRadius: 10,
                }}>
                    {Manager && <StyledDivHolder>
                        <div style={{ display: 'flex', gap: 20, }}>{Manager}</div>
                        <StyldeButton startIcon={<PersonRemoveAlt1RoundedIcon />} variant="text" color="error" onClick={() => { removeManger() }}>Remove</StyldeButton>
                    </StyledDivHolder>}
                    <StyldeButton style={{
                        marginTop: 20,
                        color: theme.colors.white,
                        borderColor: theme.colors.white,
                        borderWidth: 2
                    }} variant="contained" startIcon={!showManager && <PersonAddAlt1RoundedIcon />} onClick={() => { setShowManager(!showManager) }}>{showManager ? 'Close' : ''}</StyldeButton>
                    {showManager && <>
                        <StyledTextfield label="Manager" variant="outlined"
                            value={Manager_name}
                            required
                            onChange={(e) => setManager_name(e.target.value)}
                            sx={{
                                label: { color: theme.colors.text },
                                '& .MuiOutlinedInput-root': { color: theme.colors.text },
                                '& .MuiInputLabel-root': { color: theme.colors.text },
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.colors.text },
                            }} />
                        <SaveButton style={{
                            width: '10%',
                        }} variant="contained" onClick={handleSubmit}>
                            Save
                        </SaveButton>
                    </>}
                </StyledTypography>
            </SettingsSection>
            <SettingsSection title="Staff" icon={<GroupIcon />}>
                <StyledTypography style={{
                    backgroundColor: theme.colors.white,
                    padding: '14px',
                    color: theme.colors.gray,
                    borderRadius: 10,
                }}>
                    <>
                        {Staff && Staff.map((staff) => {
                            return (
                                <StyledDivHolder>
                                    {staff}
                                    <StyldeButton startIcon={<PersonRemoveAlt1RoundedIcon />} variant="text" color="error" onClick={() => { removeStaff(staff) }}>Remove</StyldeButton>
                                </StyledDivHolder>
                            )
                        })}
                        <StyldeButton style={{
                            marginTop: 20,
                            color: theme.colors.white,
                            borderColor: theme.colors.white,
                            borderWidth: 2
                        }} variant="contained" startIcon={!showStaff && <PersonAddAlt1RoundedIcon />} onClick={() => { setShowStaff(!showStaff) }}>{showStaff ? 'Close' : ''}</StyldeButton>
                    </>
                    {showStaff && <>
                        <StyledTextfield label="Staff" variant="outlined"
                            value={Staff_name}
                            required
                            onChange={(e) => setStaff_name(e.target.value)}
                            sx={{
                                label: { color: theme.colors.text },
                                '& .MuiOutlinedInput-root': { color: theme.colors.text },
                                '& .MuiInputLabel-root': { color: theme.colors.text },
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.colors.text },
                            }} />
                        <SaveButton style={{
                            width: '10%',
                        }} variant="contained" onClick={handleSubmit2}>
                            Save
                        </SaveButton>
                    </>}
                </StyledTypography>
            </SettingsSection>
            <SettingsSection title="Hostel Information" icon={<InfoIcon />}>
                {hostels && <Hostel_info_change hosteldata={hostels} />}
            </SettingsSection>
        </StyledDivcontainer>
    )
}




type SettingsProps = {
    For?: string,
    Settings?: any
}

function Settings_restorant({ For = "restorant", Settings = Settings_component }: SettingsProps) {
    const { theme } = useTheme()
    const { id } = useParams()

    return (
        <ContainerHOlder>
            <Side_pannel_genral id={id} option={'Settings'} type_page="Restorant" />
            <StyledDiv>
                <h1 style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center',
                    color: theme.colors.text,
                    marginBottom: 20,
                    fontSize: 20
                }}>Settings<SettingsRoundedIcon style={{
                    fontSize: 20
                }} /></h1>
                <Settings />
                <Hospital_Timings For={For} sub_id={id as string} />
            </StyledDiv >
        </ContainerHOlder>
    )
}

export default Settings_restorant