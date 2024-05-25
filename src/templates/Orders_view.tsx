import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Orders_view() {
    let url = 'http://127.0.0.1:8000'

    type Order = {
        table: number,
        status: boolean,
        order_time: string,
        order_number: number,
        order_details: {
            item: number,
            quantity: number,
            price: number,
            total: number,
            item_name: string,
            is_completed: boolean
        }[],
    }[]
    const [orders, setOrders] = useState<Order>();

    console.log('Orders_view')
    const { id } = useParams();

    useEffect(() => {
        let yourToken = localStorage.getItem('token');
        fetch(url + '/orders?restorant_id=' + id, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${yourToken}`
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.results)
                setOrders(data.results);
            })
            .catch((error) => console.error('Error:', error));
    }, []);

    const markAsPartial = (orderId: string, itemId: string) => {
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
            .catch((error) => console.error('Error:', error));
    }

    function markAsComplete(orderId: string) {
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
                    setOrders(newOrders);
                }
            })
            .catch((error) => console.error('Error:', error));
    }

    return (
        <div>
            <h1>Order View</h1>
            <h3>Details</h3>
            <ul>
                {/* tables */}
                {orders && orders.map((order: any) => (
                    <div key={order.id}>
                        <li >{order.order_number}</li>
                        <li key={order.id}>{order.order_time}</li>
                        <li key={order.id}>{order.table}</li>
                        <li key={order.id}>{order.status ? 'Completed' : 'Pending'}</li>
                        <ul>
                            <h3>Completed Items</h3>
                            {order.order_details.filter((item: any) => item.is_completed).map((item: any) => (
                                <li key={item.id}>
                                    <li>{item.item_name}</li>
                                    <li>{item.quantity}</li>
                                    <li>{item.price}</li>
                                    <li>{item.total}</li>
                                    {/* <button onClick={() => markAsPartial(order.id, item.id)}>Mark as Partial</button> */}
                                </li>
                            ))}
                            <button onClick={() => { markAsComplete(order.id) }}>Record Payment</button>
                        </ul>
                        <ul>
                            <h3>Incomplete Items</h3>
                            {order.order_details.filter((item: any) => !item.is_completed).map((item: any) => (
                                <li key={item.id}>
                                    <li>{item.item_name}</li>
                                    <li>{item.quantity}</li>
                                    <li>{item.price}</li>
                                    <li>{item.total}</li>
                                    <li>{item.is_completed ? 'true' : 'false'}</li>
                                    <button onClick={() => markAsPartial(order.id, item.id)}>Mark as Partial</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </ul>

        </div>
    )
}

export default Orders_view