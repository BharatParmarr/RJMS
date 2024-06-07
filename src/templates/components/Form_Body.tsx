import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '../styles/theme';
// import Typography from '@mui/material/Typography';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function Form_dilog({ Form, title, setData, Data }: any) {
    const { theme } = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    function handleClose() {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen} startIcon={<AddBoxSharpIcon />} style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.text
            }}>
                {title}
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
                    {title}
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
                    <Form setOpen={setOpen} setData={setData} Data={Data} />
                </DialogContent>

            </BootstrapDialog>
        </React.Fragment>
    );
}
