import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
import RoomForm from "../RoomForm";
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useTheme } from '../styles/theme';

const BootstrapDialog = styled(Dialog)(() => ({
    '& .MuiDialogContent-root': {
        padding: 10,
    },
    '& .MuiDialogActions-root': {
        padding: 10,
    },
}));

export default function CustomizedDialogs({ name = "Room", From = RoomForm, Hostel_id, rooms }: any) {
    const { theme } = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                New {name}
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" style={{
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text
                }}>
                    {name}
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
                <DialogContent dividers style={{
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text
                }}>
                    {name == "Student" ? <From onSave={handleClose} Hostel_id={Hostel_id} rooms={rooms} /> : <From onSave={handleClose} Hostel_id={Hostel_id} />}
                </DialogContent>
                {/* <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions> */}
            </BootstrapDialog>
        </React.Fragment>
    );
}