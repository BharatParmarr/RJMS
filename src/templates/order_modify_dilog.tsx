import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import API_HOST from '../config';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from 'react-spring';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import styled from "styled-components";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useTheme } from './styles/theme';


const Wrapper = styled(animated.div)`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
  min-height: 100vh;
`;

const StyledButton = styled.div` 
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.primary};
`;

const StyledListItem = styled(ListItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
`;

const StyledListItemText = styled(ListItemText)`
  color: ${({ theme }) => theme.colors.secondary};
  margin-right: 10px;
  font-size: 1.5rem;

  .MuiListItemText-secondary {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Cartdiv = styled.div`
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
`;

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, setOpen, orderId, order, id, modify_order }: any) {
    console.log(orderId, order)
    const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });
    // const { id } = useParams();
    const { theme } = useTheme();
    // const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    type ManuCategotyList = {
        id: number;
        name: string;
    };
    const [manu_category_list, setManu_category_list] = useState<ManuCategotyList[]>();
    let url = API_HOST

    useEffect(() => {
        let yourToken = localStorage.getItem('token');
        fetch(url + '/categories?restorant_id=' + id, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${yourToken}`
            }
        })
            .then(response => {
                if (response.status === 401) {
                    navigate('/login')
                } else {
                    return response.json()
                }
            })
            .then(data => {
                if (data) {
                    setManu_category_list(data.results);
                }
            })
            .catch((error) => console.error('Error:', error));
    }, []);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    type ManuItem = {
        id: number;
        name: string;
        price: number;
        description: string;
    };
    const [manu_items, setManu_items] = useState<ManuItem[]>();
    const [manu_category_2, setManu_category_2] = useState('')

    // useEffect(() => {
    //     async function featchData() {
    //         fetch(`${API_HOST}/order/${orderId}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Token ${localStorage.getItem('token')}`
    //             }
    //         }).then((res) => res.json())
    //             .then((data) => {
    //                 console.log(data)
    //             }).catch((err) => {
    //                 console.log(err)
    //             });
    //     }
    //     featchData();
    // }, [orderId]);
    useEffect(() => {
        let yourToken = localStorage.getItem('token');
        fetch(API_HOST + '/items?category_id=' + manu_category_2, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${yourToken}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setManu_items(data.results);
            })
            .catch((error) => console.error('Error:', error));
    }, [manu_category_2]);

    type cartType = {
        id: number;
        name?: string;
        price: number;
        quantity: number;
        item_name?: string;
    }
    const [cart, setCart] = useState<any[]>(order);
    useEffect(() => {
        setCart(order && order.map((item: any) => ({ id: item.item, name: item.item_name, price: item.price, quantity: item.quantity })))
    }, [order]);
    const add_to_cart = (item_id: any) => {
        return () => {
            let item = manu_items?.find((item: any) => item.id === item_id);
            let existingItem = null;
            if (cart && cart.length !== 0) {
                existingItem = cart.find((cartItem: any) => cartItem.id === item_id);
            }

            if (existingItem) {
                // Item already exists in the cart, increment the quantity
                let updatedCart = cart.map((cartItem: any) =>
                    cartItem.id === item_id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
                setCart(updatedCart);
            } else {
                // Item does not exist in the cart, add it with a quantity of 1
                if (cart && cart.length > 0) {
                    setCart([...cart, { ...item, quantity: 1 }]);
                }
                else {
                    setCart([{ ...item, quantity: 1 }]);
                }
            }
        }
    }

    const increase_quantity = (item_id: any) => {
        return () => {
            let updatedCart = cart.map((cartItem: any) =>
                cartItem.id === item_id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
            setCart(updatedCart);
        }
    }

    const reduce_quantity = (item_id: any) => {
        return () => {
            let updatedCart = cart.map((cartItem: any) =>
                cartItem.id === item_id ? { ...cartItem, quantity: Math.max(0, cartItem.quantity - 1) } : cartItem
            );
            updatedCart = updatedCart.filter(cartItem => cartItem.quantity > 0);
            setCart(updatedCart);
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    function ModifyOrder() {
        let yourToken = localStorage.getItem('token');
        fetch(`${API_HOST}/ModifyOrder/${orderId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${yourToken}`
            },
            body: JSON.stringify({ items: cart.map((item) => ({ item: item.id, quantity: item.quantity })) })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.status === 'success') {
                    modify_order(orderId, { items: cart.map((item) => ({ item: item.id, quantity: item.quantity })) })
                    setOpen(false);
                }
            })
            .catch((error) => console.error('Error:', error));
    }
    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            ><AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        ><CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Modify
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Wrapper style={springProps}>
                    <Typography variant="h1" component="div" style={{
                        fontSize: '1.7rem'
                    }}>
                        <RestaurantMenuIcon /> Restorant
                    </Typography>
                    <Typography variant="h3" component="div" style={{
                        fontSize: '1.1rem'
                    }}>Details</Typography>
                    <Typography variant="h4" component="div" style={{
                        fontSize: '1.1rem',
                        marginBottom: '9px'
                    }}>Menu Items</Typography>
                    {manu_category_list && manu_category_list.map((category) => (
                        <StyledButton onClick={() => setManu_category_2(category.id.toString())} key={category.id} style={{
                            marginRight: '10px',
                            borderRadius: '5px',
                            padding: '5px 12px',
                            fontFamily: 'Roboto, serif',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            display: 'inline-block',
                            fontSize: '1.35rem',
                        }}>
                            {category.name}
                        </StyledButton>
                    ))
                    }
                    <List>
                        {manu_items && manu_items.map((item) => (
                            <StyledListItem key={item.id}>
                                <StyledListItemText primary={item.name} secondary={`Price: ${item.price}, Description: ${item.description}`} style={{
                                    fontSize: '2.1rem'
                                }} />
                                <StyledButton onClick={add_to_cart(item.id)} style={{
                                    border: '0px',
                                    fontSize: '1rem',
                                    fontFamily: 'Roboto, serif',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                    <AddShoppingCartIcon /> Add
                                </StyledButton>
                            </StyledListItem>
                        ))}
                    </List>
                    {/* cart */}
                    <Cartdiv>{cart && cart.length > 0 ? cart.map((item) => (
                        <ListItem key={item.id} style={{ border: '0px', backgroundColor: theme.colors.background }}>
                            <StyledListItemText primary={item.name} secondary={`Price: ${item.price}, Quantity: ${item.quantity}`} />
                            <StyledButton onClick={increase_quantity(item.id)} style={{ border: '0px' }}>
                                <AddCircleIcon />
                            </StyledButton>
                            <StyledButton onClick={reduce_quantity(item.id)} style={{ border: '0px' }}>
                                <RemoveCircleIcon />
                            </StyledButton>
                        </ListItem>
                    )) : <Typography variant="h4" component="div" style={{
                        fontSize: '1.1rem',
                        backgroundColor: theme.colors.primary,
                        textAlign: 'center',
                        color: theme.colors.white,
                        padding: '10px',
                    }}>Cart is empty</Typography>}
                        {cart && cart.length > 0 && <Button onClick={ModifyOrder} style={{ border: '0px', backgroundColor: theme.colors.primary, color: theme.colors.white, borderRadius: '0px' }}>
                            Order
                        </Button>}</Cartdiv>
                    <Typography variant="h4" component="div" style={{
                        fontSize: '1.1rem',
                        marginBottom: '20px',
                        position: 'absolute',
                        top: '20px',
                        backgroundColor: `${({ theme }: any) => theme.colors.primary}`,
                        right: '20px',
                    }}
                    >Total: {cart && cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</Typography>
                </Wrapper >
            </Dialog>
        </React.Fragment>
    );
}
