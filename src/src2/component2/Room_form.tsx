import { useState, useEffect } from 'react';
import styled from 'styled-components';
import GenericForm from './GenericForm';
import apis from '../../apis';
import { useParams } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useTheme } from '../../templates/styles/theme';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import * as React from 'react';
import { styled as styledmui } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import HospitalBed from './Bed_form';
// import Switch from '@mui/material/Switch';

const StyledAccordion = styled(Accordion)`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
    `;

const BootstrapDialog = styledmui(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function Add_Bed({ room_id, room_name }: any) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen}>
                Add Bed
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Add new Bed
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <HospitalBed room_id={room_id} room_name={room_name} />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

const Container = styled.div`
  padding: 20px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
`;

const ListItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  width: 30%;
    margin: 10px 0;
    height: 220px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
    box-shadow: 0 0 5px 0 #ccc;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const DivroomDetails = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    `;

const HospitalRoom = () => {
    const { theme } = useTheme();
    const { sub_id } = useParams();
    type Room = {
        id: number;
        room_number: string;
        bed_count: number;
        is_occupied: boolean;
        room_type: string;
    };
    const [rooms, setRooms] = useState<Room[]>([]);
    const [editingRoom, setEditingRoom] = useState<any>(null);
    // console.log(counter++, editingRoom);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        const response = await apis.get(`/rooms/?business_id=${sub_id}`);
        if (response.data.results) {
            setRooms(response.data.results);
        }
    };

    const handleCreate = async (data: any) => {
        data.hospital = sub_id;
        await apis.post('/rooms/', data);
        fetchRooms();
    };
    const handleEdit = async (data: any) => {
        if (!editingRoom) {
            return;
        }
        let res = await apis.put(`/rooms/${editingRoom.id}/`, data)
        console.log(res);
        if (res.status === 200) {
            setEditingRoom(null);
            fetchRooms();
        }
    };

    const handleDelete = async (id: any) => {
        await apis.delete(`/rooms/${id}/`);
        fetchRooms();
    };

    return (
        <StyledAccordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{
                    backgroundColor: theme.colors.white,
                    color: theme.colors.text
                }}
            >
                <span style={{
                    fontFamily: 'Roboto, sans-serif',

                }}>
                    Rooms
                </span>
            </AccordionSummary>
            <AccordionDetails style={{
                backgroundColor: theme.colors.white,
                color: theme.colors.text
            }}>
                <Container>
                    <h1>Rooms</h1>
                    <Button onClick={() => setEditingRoom({})}>Create Room</Button>
                    <GenericForm
                        initialData={editingRoom ? editingRoom : {}}
                        onSubmit={editingRoom ? handleEdit : handleCreate}
                        fields={[
                            { name: 'room_number', type: 'text', placeholder: 'Room Number' },
                            { name: 'bed_count', type: 'number', placeholder: 'Bed Count', hidden: true, value: 0 },
                            { name: 'is_occupied', type: 'checkbox', placeholder: 'Is Occupied', hidden: true, value: false },
                            { name: 'room_type', type: 'text', placeholder: 'Room Type' },
                        ]}
                    />
                    <List>
                        {rooms.length > 0 && rooms.map((room) => (
                            <ListItem key={room.id}>
                                <DivroomDetails>
                                    <span>{room.room_number}</span>
                                    <span>{room.bed_count}</span>
                                    <span>{room.is_occupied ? 'Occupied' : 'Not Occupied'}</span>
                                </DivroomDetails>
                                <div>
                                    <Button onClick={() => {
                                        setEditingRoom(room);
                                    }}>Edit</Button>
                                    <Button onClick={() => handleDelete(room.id)}>Delete</Button>
                                    {/* add bed button */}
                                    <Add_Bed room_id={room.id} room_name={room.room_number} />
                                </div>
                            </ListItem>
                        ))}
                    </List>
                </Container>
            </AccordionDetails>
        </StyledAccordion>
    );
};

export default HospitalRoom;