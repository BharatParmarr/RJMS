import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Restroant_view() {

    const { id, table_id } = useParams();
    const [tables, settables] = useState([]);
    // navigtation
    const navigate = useNavigate();
    const [manu_category_list, setManu_category_list] = useState([]);
    let url = 'http://127.0.0.1:8000'

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
    }
        , []);


    useEffect(() => {
        let yourToken = localStorage.getItem('token');
        fetch('http://127.0.0.1:8000/tables?restorant_id=' + id, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${yourToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                settables(data.results);
            })
            .catch((error) => console.error('Error:', error));
    }, []);


    // manu item create, delete, show
    const [manu_items, setManu_items] = useState([]);
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
            let item = manu_items.find((item: any) => item.id === item_id);
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

    function make_order() {
        console.log(cart.map((item) => ({ item: item.id, quantity: item.quantity })))
        fetch(url + '/order/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                items: cart.map((item) => ({ item: item.id, quantity: item.quantity })),
                table: table_id,
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
                // setCart([]);
            })
            .catch((error) => console.error('Error:', error));
    }
    return (
        <div style={{ backgroundColor: 'black', color: 'white' }} id="wrapper">
            <h1>Restorant</h1>
            <h3>Details</h3>
            <h2>Manu Items</h2>
            <select name="manu_category" id="manu_category" value={manu_category_2} onChange={e => setManu_category_2(e.target.value)}>
                <option value="">Select Category</option>
                {manu_category_list && manu_category_list.map((category: any) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
            {manu_items && manu_items.map((item: any) => (
                <div key={item.id}>
                    <li >{item.name}</li>
                    <li key={item.id}>{item.price}</li>
                    <li key={item.id}>{item.description}</li>
                    <button onClick={add_to_cart(item.id)}>
                        Add to cart
                    </button>
                </div>
            ))}
            <h2>Cart</h2>
            {cart && cart.map((item: any) => (
                <div key={item.id}>
                    <li >{item.name}</li>
                    <li key={item.id}>{item.price}</li>
                    <li key={item.id}>{item.quantity}</li>
                    {/* increase quantity button */}
                    <button onClick={() => {
                        let updatedCart = cart.map((cartItem: any) =>
                            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                        );
                        setCart(updatedCart);
                    }}> + </button>
                    {/* reduce quantity button */}
                    <button onClick={() => {
                        if (item.quantity === 1) {
                            let updatedCart = cart.filter((cartItem: any) => cartItem.id !== item.id);
                            setCart(updatedCart);
                            return;
                        }
                        let updatedCart = cart.map((cartItem: any) =>
                            cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
                        );
                        setCart(updatedCart);
                    }}>
                        -
                    </button>
                    {/* make order button */}
                </div>
            ))}
            <h4>total</h4>
            {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            <button onClick={make_order}>Make Order</button>
        </div>
    )
}

export default Restroant_view