import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_HOST from "../config";
import styled from 'styled-components';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useTheme } from './styles/theme';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import React from "react";
import useWebSocket from 'react-use-websocket';
import { motion, AnimatePresence } from 'framer-motion';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';


const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// const OrderDetails = styled.div`
//   width: 80%;
//   margin: 20px auto;
//   border-radius: 5px;
//   background-color: ${({ theme }) => theme.colors.background};
//   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
//   padding: 20px;
// `;

const OrderList = styled(List)`
  background-color: transparent; /* Remove unnecessary background color */
  color: ${({ theme }) => theme.colors.text};
  padding: 0;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const OrderListItem = styled(ListItem)`
  background-color: transparent; /* Remove unnecessary background color */
  color: ${({ theme }) => theme.colors.text};
  padding: 10px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}20;
  &:last-child {
    border-bottom: none;
  }
  width: 100%;
  display: flex;
    justify-content: space-between;
    align-items: center;
    
`;

const Tablesnamelist = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
    width: 100%;
    padding: 10px;


    &::-webkit-scrollbar {
        background: ${({ theme }) => theme.colors.background};
        height: 7px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: ${({ theme }) => theme.colors.primary};
    }
    &::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => theme.colors.secondary};
    }
    &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.colors.background};
    }
`;

// const OrderTitle = styled(Typography)`
//   font-weight: bold;
//   margin-bottom: 10px;
// `;

// const OrderStatus = styled(Typography)`
//   color: ${({ theme }) => theme.colors.primary}; /* Dynamic color based on status */
// `;
const StyledButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;

    &:hover {
        cursor: pointer;
        box-shadow: 0px 4px 8px ${({ theme }) => theme.colors.primary}80;
    }
        `;


function Orders_view() {
    const { theme } = useTheme();
    let url = API_HOST

    type Order = {
        table: number,
        status: boolean,
        order_time: string,
        order_number: number,
        id: number,
        table_name: string,
        table_id?: number,
        order_details: {
            item: number,
            quantity: number,
            price: number,
            total: number,
            item_name: string,
            is_completed: boolean,
            id: number
        }[]
    };

    // Initialize states
    const [orders, setOrders] = useState<Order[]>([]);
    const [tables, setTables] = useState<string[]>([]);
    const [tablesId, setTablesId] = useState<number[]>([]);
    const [selectedTable, setSelectedTable] = useState<number | null>(null);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

    useEffect(() => {
        // Filter the orders based on the selected table id
        if (selectedTable !== null) {
            setFilteredOrders(orders.filter((order) => order.table_id === selectedTable));
        } else {
            setFilteredOrders(orders);
        }
    }, [selectedTable, orders]);

    const { id } = useParams<{ id: string }>();
    const { sendMessage, lastMessage, readyState } = useWebSocket('ws://192.168.181.82:8000/ws/orders/' + id + '/');

    useEffect(() => {
        if (lastMessage !== null) {
            const data = JSON.parse(lastMessage.data);
            console.log(data);
            if (data.incomplete_orders) {
                setOrders(oldOrders => [...(oldOrders || []), ...data.incomplete_orders]);
                let tables_list_id: number[] = []
                let tables_list: string[] = []
                data.incomplete_orders.map((order: any) => {
                    if (!tables_list_id.includes(order.table_id)) {
                        tables_list_id.push(order.table_id);
                        tables_list.push(order.table_name);
                    }
                });
                setTables(oldTables => [...oldTables, ...tables_list]);
                setTablesId(oldTablesId => [...oldTablesId, ...tables_list_id]);
            } else if (data.order) {
                setOrders(oldOrders => [data.order, ...(oldOrders || [])]);
                if (data.order.table_id) {
                    if (!tablesId.includes(data.order.table_id)) {
                        setTablesId(oldTablesId => [...oldTablesId, data.order.table_id]);
                        setTables(oldTables => [...oldTables, data.order.table_name]);
                    }
                }
            }
        }
    }, [lastMessage]);
    // useEffect(() => {
    //     if (readyState === WebSocket.OPEN) {
    //         console.log('sending message'); 6
    //         let yourToken = localStorage.getItem('token');
    //         sendMessage(JSON.stringify({
    //             action: 'get_orders',
    //             token: yourToken,
    //             restorant_id: id
    //         }));
    //     }
    // }, [readyState, sendMessage]);
    // useEffect(() => {
    //     let yourToken = localStorage.getItem('token');
    //     fetch(url + '/orders?restorant_id=' + id, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Token ${yourToken}`
    //         },
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data.results)
    //             setOrders(data.results);
    //         })
    //         .catch((error) => console.error('Error:', error));
    // }, []);

    const markAsPartial = (orderId: number, itemId: number) => {
        handleOpen()
        // Create a new copy of the orders
        let newOrders = orders ? [...orders] : [];
        let orderIndex = newOrders.findIndex((order: any) => order.id === orderId);
        let itemIndex = newOrders[orderIndex].order_details.findIndex((item: any) => item.id === itemId);

        // Send a get request to the server
        fetch(url + '/order_complete/order_details/' + itemId, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then(data => {
                console.log(data);
                if (itemIndex !== -1) {
                    // Change the status of the item
                    newOrders[orderIndex].order_details[itemIndex].is_completed = !newOrders[orderIndex].order_details[itemIndex].is_completed;
                    // Update the state with the new orders
                    setOrders(newOrders);
                }
            })
            .catch((error) => console.error('Error:', error))
            .finally(() => {
                handleClose()
            });
    }

    function markAsComplete(orderId: number) {
        handleOpen()
        // Create a new copy of the orders
        let newOrders = orders ? [...orders] : [];
        let orderIndex = newOrders.findIndex((order: any) => order.id === orderId);

        // Send a get request to the server
        fetch(url + '/order_complete/record_payment/' + orderId, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .then(data => {
                console.log(data);
                if (orderIndex !== -1) {
                    // Change the status of the order
                    newOrders[orderIndex].status = !newOrders[orderIndex].status;
                    // Update the state with the new orders
                    // remove the order from the list 
                    newOrders.splice(orderIndex, 1);
                    setOrders(newOrders);
                }
            })
            .catch((error) => console.error('Error:', error))
            .finally(() => {
                handleClose()
            });
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Container>
            <Tablesnamelist>
                {tables && tables.map((table: any) => (
                    <StyledButton onClick={() => setSelectedTable(tablesId[tables.indexOf(table)])} key={table}>
                        <TableRestaurantIcon style={{ fontSize: '2.1rem', color: theme.colors.secondary }} />
                        <Button variant="text" style={{
                            fontSize: '0.75rem', color: theme.colors.text,
                            fontFamily: 'Roboto, sans-serif',
                            textTransform: 'capitalize',
                        }} >{table}</Button>
                    </StyledButton>
                ))}
            </Tablesnamelist>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    style={{
                        backgroundColor: theme.colors.primary + '35',

                        fontFamily: 'Roboto, sans-serif',
                        borderRadius: '5px 5px 0 0',
                    }}
                >
                    <span style={{
                        fontFamily: 'Roboto, sans-serif',
                        borderRadius: '5px 5px 0 0',
                    }}>Orders</span>
                </AccordionSummary>
                <AccordionDetails style={{
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                    fontFamily: 'Roboto, sans-serif',
                    borderRadius: '5px 5px 0 0',
                }}>
                    {orders?.length === 0 && <Typography variant="h3" style={{ fontSize: '1.5rem' }}>No orders found</Typography>}
                    <AnimatePresence >
                        {filteredOrders && filteredOrders.map((order) => (
                            <motion.div key={order.id} style={{
                                marginBottom: '10px',
                                padding: '10px',
                                backgroundColor: theme.colors.white,
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                marginTop: '5px',
                            }}
                                whileHover={{ boxShadow: '0px 4px 8px ' + theme.colors.primary + '80' }}
                                exit={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <OrderList>
                                    <OrderListItem>
                                        <ListItemText primary={order.table_name} secondary={new Date(order.order_time).toLocaleString('en-US', {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })} />
                                        <ListItemText primary={'Total: ₹' + order.order_details.reduce((acc, item) => acc + item.total, 0)} />
                                        <ListItemText primary={order.status ? <DoneAllIcon /> : <PendingActionsIcon />} />
                                    </OrderListItem>
                                </OrderList>
                                <Typography variant="h3" style={{
                                    marginBottom: '20px',
                                    fontSize: '1.1rem',
                                    color: theme.colors.gray
                                }}>Completed</Typography>
                                <OrderList>
                                    {order.order_details.filter((item) => item.is_completed).map((item) => (
                                        <OrderListItem key={item.id}>
                                            <ListItemText primary={item.item_name} secondary={`Quantity: ${item.quantity}, Price: ${item.price}, Total: ${item.total}`}
                                                primaryTypographyProps={{
                                                    style: {
                                                        textDecoration: 'line-through'
                                                    }
                                                }}
                                                secondaryTypographyProps={{
                                                    style: {
                                                        color: theme.colors.gray
                                                    }
                                                }} />
                                        </OrderListItem>
                                    ))}
                                </OrderList>
                                <Typography variant="h3" style={{
                                    marginBottom: '10px',
                                    fontSize: '1.1rem',
                                    color: theme.colors.gray
                                }}>Incomplete</Typography>
                                <OrderList>
                                    {order.order_details.filter((item) => !item.is_completed).map((item) => (
                                        <motion.div key={item.id} style={{ width: '100%' }} exit={{ opacity: 0, scale: 0 }}>
                                            <OrderListItem key={item.id}>
                                                <ListItemText primary={item.item_name} secondary={`Quantity: ${item.quantity}, Price: ${item.price}, Total: ${item.total}`} />
                                                <Button variant="outlined" color="primary" onClick={() => markAsPartial(order.id, item.id)} startIcon={<TaskAltIcon />} ></Button>
                                            </OrderListItem>
                                        </motion.div>
                                    ))}
                                </OrderList>
                                <Button variant="outlined" color="primary" onClick={() => markAsComplete(order.id)} startIcon={<CurrencyRupeeIcon />}>Record Payment</Button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </AccordionDetails>
            </Accordion>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            ><CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    )
}

export default Orders_view