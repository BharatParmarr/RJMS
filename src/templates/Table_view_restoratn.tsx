import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSpring, animated } from 'react-spring';
import { Badge, Button, List, ListItem, ListItemText, SwipeableDrawer, Typography } from '@mui/material';
import styled from "styled-components";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import API_HOST, { API_HOST_Websocket } from "../config";
import { useTheme } from "./styles/theme";
import React from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useWebSocket from 'react-use-websocket';


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

function Restroant_view() {
    const springProps = useSpring({ opacity: 1, from: { opacity: 0 } });
    const { id, table_id } = useParams();
    const { theme } = useTheme();
    // const [tables, settables] = useState([]);
    // navigtation
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


    // useEffect(() => {
    //     let yourToken = localStorage.getItem('token');
    //     fetch(url + '/tables?restorant_id=' + id, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Token ${yourToken}`
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             settables(data.results);
    //         })
    //         .catch((error) => console.error('Error:', error));
    // }, []);


    // manu item create, delete, show
    type ManuItem = {
        id: number;
        name: string;
        price: number;
        description: string;
    };
    const [manu_items, setManu_items] = useState<ManuItem[]>();
    const [manu_category_2, setManu_category_2] = useState('')


    useEffect(() => {
        let yourToken = localStorage.getItem('token');
        fetch(url + '/items?category_id=' + manu_category_2, {
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

    // function make_order() {
    //     console.log(cart.map((item) => ({ item: item.id, quantity: item.quantity })))
    //     fetch(url + '/order/', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Token ${localStorage.getItem('token')}`
    //         },
    //         body: JSON.stringify({
    //             items: cart.map((item) => ({ item: item.id, quantity: item.quantity })),
    //             table: table_id,
    //         })
    //     })
    //         .then(response => {
    //             if (response.status === 400) {
    //                 alert('Please select items to order')
    //             }
    //             return response.json()
    //         })
    //         .then(data => {
    //             if (data.error) {
    //                 alert(data.error);
    //                 return;
    //             }
    //             alert('Order placed successfully');
    //             // setCart([]);
    //         })
    //         .catch((error) => console.error('Error:', error));
    // }

    // Create WebSocket connection.
    const { sendMessage, lastMessage, readyState } = useWebSocket('ws://' + API_HOST_Websocket + '/ws/orders/0/');

    const [LastOrdersent, setLastOrdersent] = useState('');
    useEffect(() => {
        if (lastMessage !== null) {
            console.log('Received a message', lastMessage.data);
            setLastOrdersent(lastMessage.data);
            if (lastMessage.data.message) {
                return;
            }
            if (lastMessage.data && cart.length > 0) {
                alert('Order placed successfully');
                setCart([]);
            }
        }
    }, [lastMessage]);
    async function make_order() {
        const message = cart.map((item) => ({ item: item.id, quantity: item.quantity }));

        // Check if WebSocket is connected before sending message.

        console.log('sending message');
        if (readyState === WebSocket.OPEN) {
            // let yourToken = localStorage.getItem('token');
            sendMessage(JSON.stringify({
                items: message,
                table: table_id,
            }));
        }
    }

    // fetch(url + '/order/', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Token ${localStorage.getItem('token')}`
    //     },
    //     body: JSON.stringify({
    //         items: message,
    //         table: table_id,
    //     })
    // })
    //     .then(response => {
    //         if (response.status === 400) {
    //             alert('Please select items to order')
    //         }
    //         return response.json()
    //     })
    //     .then(data => {
    //         if (data.error) {
    //             alert(data.error);
    //             return;
    //         }
    //         alert('Order placed successfully');
    //         setCart([]);
    //     })
    //     .catch((error) => console.error('Error:', error));


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

    // const [cart_show, setCart_show] = useState(false);

    // const cartSpring = useSpring({
    //     from: { transform: 'translate3d(0, 100%, 0)' },
    //     to: { transform: 'translate3d(0, 0, 0)' },
    //     reverse: !cart_show,
    //     config: { tension: 210, friction: 20 },
    // });

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
    return (
        <Wrapper style={springProps}>
            <Typography variant="h1" component="div" style={{
                fontSize: '1.7rem'
            }}>
                <RestaurantMenuIcon /> Restorant
            </Typography>
            <Typography variant="h3" component="div" style={{
                fontSize: '1.1rem'
            }}>Details</Typography>
            {/* <Typography variant="h4" component="div" style={{
                fontSize: '1.1rem'
            }}>Tables</Typography>
            {tables && tables.map((table: any) => (
                <StyledButton key={table.id} variant="contained" style={{
                    marginRight: '10px',
                    backgroundColor: `${({ theme }: any) => theme.colors.primary}`
                }}>
                    {table.name}
                </StyledButton>
            ))} */}
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
            <React.Fragment key={'bottom'}>
                <Button onClick={toggleDrawer('bottom', true)} style={{
                    top: '60px',
                    right: '20px',
                    borderRadius: '10px',
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.white,
                    padding: '10px 0px',
                    position: 'fixed',
                }}><Badge badgeContent={cart.length} color="secondary"><ShoppingCartIcon /></Badge></Button>
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
                    {cart.length > 0 && <Button onClick={make_order} style={{ border: '0px', backgroundColor: theme.colors.primary, color: theme.colors.white, borderRadius: '0px' }}>
                        Order
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
            >Total: {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</Typography>
            {/* <StyledButton onClick={make_order} style={{
                border: '0px'
            }}>
                <ShoppingCartIcon />Order
            </StyledButton> */}
        </Wrapper >
    )
}

export default Restroant_view

// <div style={{ backgroundColor: 'black', color: 'white' }} id="wrapper">
//     <h1>Restorant</h1>
//     <h3>Details</h3>
//     <h2>Manu Items</h2>
//     <select name="manu_category" id="manu_category" value={manu_category_2} onChange={e => setManu_category_2(e.target.value)}>
//         <option value="">Select Category</option>
//         {manu_category_list && manu_category_list.map((category: any) => (
//             <option key={category.id} value={category.id}>{category.name}</option>
//         ))}
//     </select>
//     {manu_items && manu_items.map((item: any) => (
//         <div key={item.id}>
//             <li >{item.name}</li>
//             <li key={item.id}>{item.price}</li>
//             <li key={item.id}>{item.description}</li>
//             <button onClick={add_to_cart(item.id)}>
//                 Add to cart
//             </button>
//         </div>
//     ))}
//     <h2>Cart</h2>
//     {cart && cart.map((item: any) => (
//         <div key={item.id}>
//             <li >{item.name}</li>
//             <li key={item.id}>{item.price}</li>
//             <li key={item.id}>{item.quantity}</li>
//             {/* increase quantity button */}
//             <button onClick={() => {
//                 let updatedCart = cart.map((cartItem: any) =>
//                     cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
//                 );
//                 setCart(updatedCart);
//             }}> + </button>
//             {/* reduce quantity button */}
//             <button onClick={() => {
//                 if (item.quantity === 1) {
//                     let updatedCart = cart.filter((cartItem: any) => cartItem.id !== item.id);
//                     setCart(updatedCart);
//                     return;
//                 }
//                 let updatedCart = cart.map((cartItem: any) =>
//                     cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
//                 );
//                 setCart(updatedCart);
//             }}>
//                 -
//             </button>
//             {/* make order button */}
//         </div>
//     ))}
//     <h4>total</h4>
//     {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
//     <button onClick={make_order}>Make Order</button>
// </div>