import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSpring, animated } from 'react-spring';
import { Badge, Button, List, ListItem, ListItemText, SwipeableDrawer, Typography } from '@mui/material';
import styled from "styled-components";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import API_HOST from "../config";
import { useTheme } from "../templates/styles/theme";
import React from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import useWebSocket from 'react-use-websocket';
// import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Wrapper = styled(animated.div)`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
  min-height: 100vh;
  .selected {
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const StyledButton = styled.div` 
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 50%;
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
  color: ${({ theme }) => theme.colors.text};
  margin-right: 10px;
  font-size: 1.5rem;

  .MuiListItemText-secondary {
    color: ${({ theme }) => theme.colors.gray};
  }
`;

function Restroant_view_shop() {
    const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });
    const { table_id } = useParams();
    const { theme } = useTheme();

    const tableName = 'Table';
    const restorantName = 'Restorant';
    type ManuCategotyList = {
        id: number;
        name: string;
    };
    const manu_category_list = [] as ManuCategotyList[];
    let url = API_HOST


    type ManuItem = {
        id: number;
        name: string;
        price: number;
        description: string;
    };

    const [manu_items, setManu_items] = useState<ManuItem[]>();
    const [manu_category_2, setManu_category_2] = useState('')

    useEffect(() => {
        fetch(url + '/api/service-shop/services?service_table_id=' + table_id, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data, 'dat')
                setManu_items(data);

            })
            .catch((error) => console.error('Error:', error));
    }, []);

    // cart
    const [cart, setCart] = useState<any[]>([]);

    const add_to_cart = (item_id: any) => {
        return () => {
            let item = manu_items?.find((item: any) => item.id === item_id);
            let existingItem = cart.find((cartItem: any) => cartItem.id === item_id);

            if (existingItem) {
                // Item already exists in the cart, increment the quantity
                let updatedCart = cart.map((cartItem: any) =>
                    cartItem.id === item_id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
                setCart(updatedCart);
            } else {
                // Item does not exist in the cart, add it with a quantity of 1
                setCart([...cart, { ...item, quantity: 1 }]);
            }
        }
    }


    async function make_order() {
        const message = cart.map((item) => ({ service: item.id, quantity: item.quantity }));
        // get order key from localStorage and generate a new one if it doesn't exist and check if it's expired
        const order_key = localStorage.getItem('service_order_key');
        let key = '';
        if (order_key) {
            const orderKeyObj = JSON.parse(order_key);
            console.log(orderKeyObj['expires']);
            if (orderKeyObj['expires'] > new Date().getTime()) {
                key = orderKeyObj['value'];
            } else {
                // create new order key
                const expirationTime = new Date().getTime() + (10 * 60 * 1000); // 10 minutes in milliseconds
                key = Math.random().toString(36).substring(7);
                const valueToStore = JSON.stringify({ value: key, expires: expirationTime });
                localStorage.setItem('service_order_key', valueToStore);
            }
        } else {
            // create new order key
            const expirationTime = new Date().getTime() + (10 * 60 * 1000); // 10 minutes in milliseconds
            key = Math.random().toString(36).substring(7);
            const valueToStore = JSON.stringify({ value: key, expires: expirationTime });
            localStorage.setItem('service_order_key', valueToStore);
        }

        fetch(url + '/api/service-shop/Book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                service: message,
                table: table_id,
                order_key: key,
            })
        })
            .then(response => {
                if (response.status === 400) {
                    alert('Please select items to order')
                }
                return response.json()
            })
            .then(data => {
                if (data.error) {
                    alert(data.error);
                    return;
                }
                alert('Order placed successfully');
                setCart([]);
            })
            .catch((error) => console.error('Error:', error));
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


    // drwaer
    const [state, setState] = React.useState({
        bottom: false,
    });
    type Anchor = 'top' | 'left' | 'bottom' | 'right';
    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    // prevent user from going back when the drawer is open
    React.useEffect(() => {
        if (state['bottom']) {
            window.history.pushState(null, '', window.location.href);
            window.onpopstate = () => {
                setState({ ...state, bottom: false });
            };
        }
    }, [state['bottom']]);


    // time in que calculation 
    const [min_time, setMinTime] = useState(0);
    const [max_time, setMaxTime] = useState(0);
    useEffect(() => {
        fetch(url + '/api/service-shop/tables/time?table_id=' + table_id, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                let min = data['min_time'] * 60 * 1000;
                let max = data['max_time'] * 60 * 1000;
                min = new Date().getTime() + min;
                setMinTime(min);
                max = new Date().getTime() + max;
                setMaxTime(max);
            })
            .catch((error) => console.error('Error:', error));
    }, []);
    return (
        <Wrapper style={springProps}>
            <Typography variant="h1" component="div" style={{
                fontSize: restorantName.length > 0 ? (restorantName.length * 0.11) + 'rem' : '2rem',
            }}>
                <RestaurantMenuIcon /> {restorantName.length > 0 ? <>{restorantName.length > 14 ?
                    restorantName.slice(0, 14) + '...' : restorantName}</> : 'Restorant'}
            </Typography>
            <Typography variant="h4" component="div" style={{
                fontSize: '1.2rem',
                marginBottom: '9px',
                marginTop: '20px'
            }}>Menu <span style={{
                color: `${({ theme }: any) => theme.colors.gray}`,
                fontSize: '0.8rem'
            }}> ({tableName.length > 0 ? <>
                {tableName.length > 11 ? tableName.slice(0, 11) + '...' : tableName}
            </> : 'Table'})</span></Typography>
            {manu_category_list && manu_category_list.map((category) => (
                <StyledButton className={(manu_category_2 == category.id.toString()) ? 'selected' : ''} onClick={() => setManu_category_2(category.id.toString())} key={category.id} style={{
                    marginRight: '10px',
                    borderRadius: '30px',
                    padding: '5px 12px',
                    fontFamily: 'Roboto, serif',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    display: 'inline-block',
                    fontSize: '1.05rem',
                }}>
                    {category.name}
                </StyledButton>
            ))
            }
            <List>
                {manu_items && manu_items.map((item) => (
                    <StyledListItem key={item.id}>

                        <StyledListItemText primary={item.name} secondary={`Price: ${item.price}`} style={{
                            fontSize: '2.1rem'
                        }} />
                        <StyledButton style={{
                            border: '0px',
                            fontSize: '1rem',
                            fontFamily: 'Roboto, serif',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            {cart.find((cartItem: any) => cartItem.id === item.id) ? <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',

                                fontSize: '1rem',
                                fontFamily: 'Roboto, serif',
                                position: 'relative',
                                backgroundColor: theme.colors.background,
                                color: theme.colors.text,
                                padding: '4px 15px',
                                borderRadius: '10px',
                                gap: '8px',
                            }}><RemoveIcon style={{
                                fontSize: '1.1rem',
                                color: theme.colors.primary,
                                marginRight: '5px',
                            }}
                                onClick={reduce_quantity(item.id)}
                                />{cart.find((cartItem: any) => cartItem.id === item.id).quantity}<AddIcon style={{
                                    fontSize: '1rem',
                                    color: theme.colors.primary,
                                    marginLeft: '5px',
                                }}
                                    onClick={increase_quantity(item.id)} /></div> : <AddShoppingCartIcon onClick={add_to_cart(item.id)} />}
                        </StyledButton>
                    </StyledListItem>
                ))}
            </List>
            <React.Fragment key={'bottom'}>
                <Button onClick={toggleDrawer('bottom', true)} style={{
                    top: '60px',
                    right: '20px',
                    borderRadius: '10px',
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.white,
                    padding: '10px 0px',
                    position: 'fixed',
                }}><Badge badgeContent={cart.length} sx={{
                    color: 'white',
                }}><ShoppingCartIcon /></Badge></Button>
                <SwipeableDrawer
                    anchor={'bottom'}
                    open={state['bottom']}
                    onClose={toggleDrawer('bottom', false)}
                    onOpen={toggleDrawer('bottom', true)}
                    style={{
                        zIndex: 100,
                        backgroundColor: theme.colors.background,
                    }}
                >{cart.length > 0 ? cart.map((item) => (
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
                    {cart.length > 0 && <Button onClick={make_order} style={{ border: '0px', backgroundColor: theme.colors.primary, color: 'white', borderRadius: '0px' }}>
                        Book
                    </Button>}
                </SwipeableDrawer>
            </React.Fragment>
            <Typography variant="h4" component="div" style={{
                fontSize: '1.1rem',
                marginBottom: '20px',
                position: 'absolute',
                top: '20px',
                backgroundColor: `${({ theme }: any) => theme.colors.primary}`,
                right: '20px',

            }}
            ><span style={{
                color: `${({ theme }: any) => theme.colors.gray}`,
                fontSize: '0.7rem'
            }}>TOTAL:</span> ₹{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</Typography>
            <Typography variant="h4" component="div" style={{
                fontSize: '1.1rem',
                marginBottom: '20px',
                position: 'absolute',
                top: '50px',
                backgroundColor: `${({ theme }: any) => theme.colors.primary}`,
                right: '20px',

            }}
            ><span style={{
                color: `${({ theme }: any) => theme.colors.gray}`,
                fontSize: '0.7rem'
            }}>Your Turn:</span>{new Date(min_time).toLocaleString('en-GB', options as any)} to {new Date(max_time).toLocaleString('en-GB', options as any)}</Typography>
        </Wrapper >
    )
}

let options = {
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour12: false // Use 24-hour time
};


export default Restroant_view_shop
