import React, { useState, useEffect } from 'react';
import { Dialog, List, ListItemText, Avatar } from '@mui/material';
import { useParams } from 'react-router-dom';
import apis, { apis2 } from '../apis';
import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import CreateAppointment from './Appointment_book';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import HotelIcon from '@mui/icons-material/Hotel';
import deepOrange from '@mui/material/colors/deepOrange';
import { useTheme } from '../templates/styles/theme';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Container = styled.div`
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const Heading = styled.h2`
    padding: 20px;
    color: ${({ theme }) => theme.colors.text};
`;

const StyledList = styled(List)`
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const StyledListItem = styled.li`
    cursor: pointer;
    margin: 10px;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    width: 30%;

    &:hover {
        box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};
    }

    @media (max-width: 768px) {
        width: 80%;
    }
`;

const StyledAvatar = styled(Avatar)`
    margin-right: 10px;

`;

const PersonStyledAvatar = styled(Avatar)`
    margin-right: 10px;
    width: 150px;
    margin-bottom: 10px;
`;

const PersonStyledListItem = styled.li`
     cursor: pointer;
    margin: 10px;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    flex-direction: column;
    width: 30%;

    &:hover {
        box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary};
    }

    @media (max-width: 768px) {
        width: 80%;
    }
`;

const StyledListItemText = styled(ListItemText)`
    color: ${({ theme }) => theme.colors.text};
`;


const StyledContainerContent = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100vh;
`;


const AppointmentManager = () => {
    const { theme } = useTheme();
    const { sub_id } = useParams();
    const [data, setData] = useState({
        doctors: [],
        rooms: [],
        beds: [],
        facilities: [],
    });
    const [selectedType, setSelectedType] = useState<any>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [target_id, setTarget_id] = useState(0);
    const [name_of_selected, setName_of_selected] = useState('');

    // Fetch data for each type
    const fetchData = async () => {
        try {
            const doctors = await apis2.get(`/manage/doctor/${sub_id}`);
            let beds_data = [] as any;
            const rooms = await apis.get(`/rooms?business_id=${sub_id}`).then((res) => {
                for (let room of res.data.results) {
                    apis2.get(`/manage/beds/${room.id}/${sub_id}`).then((res) => {
                        beds_data.push(res.data);
                    });
                }
                return res;
            });
            const facilities = await apis2.get(`/manage/facilities/${sub_id}`)

            setData({
                doctors: doctors.data,
                rooms: rooms.data.results,
                beds: beds_data.flat(),
                facilities: facilities.data,
            });
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchData();

    }, []);

    // Open dialog and set selected type
    const handleOpenDialog = (type: string | React.SetStateAction<null>, target_id: number, name_of_selected: string) => {
        setSelectedType(type);
        setOpenDialog(true);
        setTarget_id(target_id);
        setName_of_selected(name_of_selected);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedType(null);
        setTarget_id(0);
        setName_of_selected('');
    };

    // Render list based on the selected type
    const renderList = (type: string, items: any[]) => (
        <StyledList>
            {items.map((item: { name: any; room_number: any; bed_number: any; user: { first_name: any; }; id: number }, index: React.Key | null | undefined) => (
                <>{type === 'doctors' ? <PersonStyledListItem key={index} onClick={() => handleOpenDialog(type, item.id, item.name)}>
                    <PersonStyledAvatar sx={{ bgcolor: deepOrange[500], width: 80, height: 80, fontSize: '1.85rem' }}>{item.name[0].toUpperCase()}</PersonStyledAvatar>
                    <StyledListItemText primary={item.name} />
                </PersonStyledListItem> :
                    <StyledListItem key={index} onClick={() => handleOpenDialog(type, item.id, item.name || item.room_number || item.bed_number || item.user.first_name)}>
                        {type === 'rooms' && <StyledAvatar sx={{ bgcolor: 'blue' }}><MeetingRoomIcon /></StyledAvatar>}
                        {type === 'beds' && <StyledAvatar sx={{ bgcolor: '#948500' }}><HotelIcon /></StyledAvatar>}
                        {type === 'facilities' && <StyledAvatar sx={{ bgcolor: 'green' }}><LocalHospitalIcon /></StyledAvatar>}
                        <StyledListItemText primary={item.name || item.room_number || item.bed_number || item.user.first_name} />
                    </StyledListItem>}</>
            ))}
        </StyledList>
    );

    return (
        <Container>
            <Heading>Doctors</Heading>
            {renderList('doctors', data.doctors)}
            <Heading>Rooms</Heading>
            {renderList('rooms', data.rooms)}
            {/* <Heading>Beds</Heading> */}
            {/* {renderList('beds', data.beds)} */}
            <Heading>Facilities</Heading>
            {renderList('facilities', data.facilities)}

            {data.doctors.length === 0 && <p>No data available</p>}

            <Dialog
                fullScreen
                open={openDialog}
                onClose={handleCloseDialog}
                TransitionComponent={Transition}
                sx={{ backgroundColor: theme.colors.background }}
                style={{
                    backgroundColor: theme.colors.background,
                    width: '100%',
                }}
            >
                <AppBar sx={{ position: 'relative', background: theme.colors.white }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCloseDialog}
                            aria-label="close"
                            sx={{ color: theme.colors.text }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{
                            ml: 2, flex: 1,
                            color: theme.colors.text
                        }} variant="h6" component="div">
                            Appointment
                        </Typography>
                    </Toolbar>
                </AppBar>
                <StyledContainerContent>
                    {/* Here you can add a form component based on the selectedType */}
                    {selectedType === 'doctors' && <CreateAppointment type="doctor" target_id={target_id} name_of_selected={name_of_selected} />}
                    {selectedType === 'rooms' && <CreateAppointment type="room" target_id={target_id} name_of_selected={name_of_selected} />}
                    {selectedType === 'beds' && <CreateAppointment type="bed" target_id={target_id} name_of_selected={name_of_selected} />}
                    {selectedType === 'facilities' && <CreateAppointment type="facility" target_id={target_id} name_of_selected={name_of_selected} />}
                </StyledContainerContent>
            </Dialog>
        </Container>
    );
};


export default AppointmentManager;
