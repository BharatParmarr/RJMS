import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useTheme } from '../styles/theme';
import styled from 'styled-components';
import FormDialog from './Form_dilog_create_manu_item';
import api from '../../api';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';


const StyledListsHolder = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    min-height: 100vh;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const StyledButton = styled(Button)`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: black;
`;

const StyledTextField = styled(TextField)`
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    width: 100%;
    margin-bottom: 10px;
`;

const StyledList = styled(List)`
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    width: 50%;

    @media (max-width: 768px) {
        width: 90%;
    }
`;

const StyledListItemText = styled(ListItemText)`
    color: ${({ theme }) => theme.colors.text};
    max-width: 50%;

    @media (max-width: 768px) {
        max-width: 90%;
    }
`;

const StyledListItemButton = styled(ListItemButton)`
    display: flex;
    flex-direction: row;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function CartView({ item, RemoveButton, setCart, cart }: any) {
    const { theme } = useTheme()
    // const [showQuntity, setShowQuntity] = useState(false)

    return (
        <StyledListItemButton key={item.id} style={{
            border: '1px solid ' + theme.colors.primary + '99',
            borderRadius: '5px',
            margin: '10px',
            gap: '10px',
        }}>
            <StyledListItemText primary={item.name} secondary={<Typography variant="body2" style={{ color: theme.colors.gray }}>{item.description}</Typography>} />
            {/* <ListItemText primary={item.price} /> */}
            {!item.unlimited && <ListItemText primary={item.quntity} secondary={<Typography variant="body2" style={{ color: theme.colors.gray }}>quantity</Typography>} />}
            <FormControlLabel
                label="Unlimited" control={<Checkbox defaultChecked={item.unlimited} onChange={(e) => {
                    const newCart = [...cart];
                    const index = newCart.findIndex((cartItem) => cartItem.id === item.id);
                    newCart[index].unlimited = e.target.checked;
                    setCart(newCart);
                }} sx={{
                    svg: { color: theme.colors.text },
                }} />} />
            <RemoveButton />
        </StyledListItemButton>
    )
}


function BasicDateTimePicker({ date, setDate }: any) {
    const { theme } = useTheme()
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker label="Tiem of Menu" sx={{
                    label: { color: theme.colors.text, borderRadius: '5px' },
                    border: '1px solid ' + theme.colors.primary + '99',
                    color: theme.colors.text,
                    input: { color: theme.colors.text, borderRadius: '5px' },
                    svg: { color: theme.colors.text },
                    width: '10%',
                }}
                    value={date}
                    onChange={(newValue) => {
                        setDate(newValue);
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}

export default function FullScreenDialog() {
    const { id } = useParams()
    const { theme } = useTheme()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    type MealsItem = {
        id: number;
        name: string;
        description: string;
        price: number;
    }
    const [mealsItems, setMealsItems] = useState<MealsItem[]>([])
    type CartItem = {
        id: number;
        name: string;
        description: string;
        price: number;
        quntity: number;
        unlimited: boolean;
    }
    const [cart, setCart] = useState<CartItem[]>([])

    useEffect(() => {
        api.get('/mealsitem?hostel_id=' + id).then((response) => {
            setMealsItems(response.data)
            console.log(response.data, 'meals');
        }).catch(() => {
            alert('Something went wrong! try again later');
        }
        );
    }, [])

    function AddItemToCart(item: any) {
        const newCart = [...cart];
        const index = newCart.findIndex((cartItem) => cartItem.id === item.id);
        if (index === -1) {
            newCart.push({ ...item, quntity: 1, unlimited: true });
        } else {
            newCart[index].quntity += 1;

        }
        setCart(newCart);
    }
    const [manuName, setManuName] = useState('')
    const [manuTime, setManuTime] = useState(dayjs())
    function HandleSave() {
        const data: any = {};
        data.name = manuName;
        data.time = manuTime;
        data.mealItems = cart.map((item) => {
            return {
                meal: item.id,
                quantity: item.quntity,
                unlimited: item.unlimited,
            }
        })
        api.post('/meals?hostel_id=' + id, data).then((response) => {
            console.log(response.data);
        }).catch(() => {
            alert('Something went wrong! try again later');
        }).finally(() => {
            handleClose();
        });
    }
    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Creat Manu
            </Button>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', backgroundColor: theme.colors.gray }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Manu
                        </Typography>

                    </Toolbar>
                </AppBar>
                <StyledListsHolder>
                    <StyledList>
                        {mealsItems && mealsItems.map((meal: any) => (
                            <StyledListItemButton key={meal.id} style={{
                                border: '1px solid ' + theme.colors.primary + '59',
                                borderRadius: '5px',
                                margin: '10px',

                            }}>
                                <ListItemText primary={meal.name} secondary={<Typography variant="body2" style={{ color: theme.colors.gray }}>{meal.description}</Typography>} />
                                <StyledButton variant="contained" onClick={() => AddItemToCart(meal)} startIcon={<AddCircleRoundedIcon />}>add</StyledButton>
                            </StyledListItemButton>
                        ))}
                    </StyledList>
                    <StyledList>
                        {cart && cart.map((item: any) => (
                            <CartView item={item} RemoveButton={() => {
                                return (
                                    <Button variant="contained" onClick={() => {
                                        const newCart = [...cart];
                                        const index = newCart.findIndex((cartItem) => cartItem.id === item.id);
                                        newCart.splice(index, 1);
                                        setCart(newCart);
                                    }
                                    } startIcon={<CancelRoundedIcon />} >remove</Button>)
                            }}
                                cart={cart} setCart={setCart}
                            />
                        ))}
                        <StyledTextField variant="outlined" label="Name" sx={{
                            label: { color: theme.colors.text },
                            input: { color: theme.colors.text, borderRadius: '5px' },
                            border: '1px solid ' + theme.colors.primary + '99',
                            borderRadius: '8px',
                            marginBottom: '10px',
                            marginTop: '10px',
                        }}
                            value={manuName}
                            required
                            onChange={(e) => {
                                setManuName(e.target.value);
                            }}
                        />
                        <BasicDateTimePicker date={manuTime} setDate={setManuTime} />
                        <Button variant="contained" style={{
                            backgroundColor: theme.colors.secondary,
                            color: 'black',
                            float: 'right',
                        }}
                            onClick={HandleSave}>Save</Button>
                    </StyledList>
                    <span style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '40px'
                    }}>
                        <FormDialog />
                    </span>
                </StyledListsHolder>
            </Dialog>
        </React.Fragment>
    );
}
