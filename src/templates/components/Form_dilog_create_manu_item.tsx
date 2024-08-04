import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '../styles/theme';
import { useParams } from 'react-router-dom';
import api from '../../api';

export default function FormDialog() {
    const { id } = useParams()
    const { theme } = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append('hostel', id ?? '')
        api.post('/mealsitem', formData).then((response) => {
            console.log(response.data);
        }).catch(() => {
            alert('Something went wrong! try again later');
        }).finally(() => {
            handleClose();
        });
    }
    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen} style={{
                backgroundColor: theme.colors.secondary,
                color: 'black',
            }}>
                Create Item
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        onSubmit(event);
                    },
                }}

            >
                <DialogTitle style={{
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                }}>New Manu Item</DialogTitle>
                <DialogContent style={{
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                }}>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        sx={{
                            label: { color: theme.colors.text },
                            input: { color: theme.colors.text, borderColor: theme.colors.text, border: '1px solid', borderRadius: '5px' },
                        }}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="outlined" sx={{
                            label: { color: theme.colors.text },
                            input: { color: theme.colors.text, borderColor: theme.colors.text, border: '1px solid', borderRadius: '5px' },
                        }}
                    />
                    <TextField
                        margin="dense"
                        required
                        id="price"
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="outlined"
                        sx={{
                            label: { color: theme.colors.text },
                            input: { color: theme.colors.text, borderColor: theme.colors.text, border: '1px solid', borderRadius: '5px' },
                        }}
                    />
                </DialogContent>
                <DialogActions style={{
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Create</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
