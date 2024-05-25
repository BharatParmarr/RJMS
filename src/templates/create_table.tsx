import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function create_table() {

    const { id } = useParams();
    // const location = useLocation();
    // const created_by = location.state.created_by;
    const [tables, settables] = useState([]);
    // navigtation
    const navigate = useNavigate();
    // manu category form submit
    const [manu_category, setManu_category] = useState('');
    const [manu_description, setManu_description] = useState('');
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
    function submit_manu_category(e: any) {
        e.preventDefault();
        let yourToken = localStorage.getItem('token');
        fetch('http://127.0.0.1:8000/categories/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${yourToken}`
            },
            body: JSON.stringify({
                name: manu_category,
                description: manu_description,
                restorant: id
            }),
        })
            .then(response => response.json())
            .then(data => alert(data))
            .catch((error) => console.error('Error:', error));
    }

    function delete_category(category_id: any) {
        let yourToken = localStorage.getItem('token');
        fetch(url + '/categories/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${yourToken}`
            },
            body: JSON.stringify({ category_id: category_id })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => console.error('Error:', error));
    }

    const [tabel_name, setTable_name] = useState('');
    const [table_number, setTable_number] = useState('');
    const [table_capacity, setTable_capacity] = useState('');
    // table form submit
    function submit_form(e: any) {
        e.preventDefault();
        let yourToken = localStorage.getItem('token');
        fetch('http://127.0.0.1:8000/tables/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${yourToken}`
            },
            body: JSON.stringify({
                name: tabel_name,
                numebr: table_number,
                capacity: table_capacity,
                restorant: id
            }),
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => console.error('Error:', error));
    }
    // delete table
    function delete_table(table_id: any) {
        let yourToken = localStorage.getItem('token');
        fetch('http://127.0.0.1:8000/tables', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${yourToken}`
            },
            body: JSON.stringify({
                'table_id': table_id
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => console.error('Error:', error));
    }

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
    const [showform, setShowform] = useState(false);
    function open_creat_table_form() {
        setShowform(!showform);
    }
    const [showmanuform, setShowmanuform] = useState(false);
    function open_creat_manu_form() {
        setShowmanuform(!showmanuform);
    }

    // manu item create, delete, show
    const [manu_item, setManu_item] = useState('');
    const [manu_price, setManu_price] = useState('');
    // const [manu_description, setManu_description] = useState('');
    const [manu_items, setManu_items] = useState([]);
    const [showmanuitemform, setShowmanuitemform] = useState(false);
    const [manu_category_1, setManu_category_1] = useState('');
    const [manu_category_2, setManu_category_2] = useState('')
    const [item_image, setItem_image] = useState<File | null>();
    function open_creat_manu_item_form() {
        setShowmanuitemform(!showmanuitemform);
    }
    function submit_manu_item(e: any) {
        e.preventDefault();
        const form_data_manu_item = new FormData();
        form_data_manu_item.append('name', manu_item);
        form_data_manu_item.append('price', manu_price);
        form_data_manu_item.append('description', manu_description);
        form_data_manu_item.append('category', manu_category_1);
        if (item_image) {
            form_data_manu_item.append('image', item_image);
        }
        else {
            alert('Select Image')
            return
        }
        if (manu_category_1 === '') {
            alert('Select Category')
            return
        }
        let yourToken = localStorage.getItem('token');
        fetch(url + '/items/', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${yourToken}`
            },
            body: form_data_manu_item
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => console.error('Error:', error));
    }
    function delete_manu_item(item_id: any) {
        let yourToken = localStorage.getItem('token');
        fetch(url + '/items', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${yourToken}`
            },
            body: JSON.stringify({
                item_id: item_id
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch((error) => console.error('Error:', error));
    }
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
    return (
        <div style={{ backgroundColor: 'black', color: 'white' }} id="wrapper">
            <h1>Restorant</h1>
            <h3>Details</h3>
            {/* <ul>
                <li>Name: {created_by.name}</li>
                <li>Email: {created_by.email}</li>
                <li>Phone: {created_by.phone}</li>
                <li>{id}</li>
            </ul> */}
            <ul>
                {/* tables */}
                {tables && tables.map((table: any) => (
                    <div key={table.id}><button onClick={() => navigate(`/table/${table.id}`, { state: { table } })}>
                        <li >{table.name}</li>
                        <li key={table.id}>{table.capacity}</li>
                        {/* delete button */}
                    </button>
                        <button onClick={() => { delete_table(table.id) }}>Delete</button></div>
                ))}
                <button onClick={open_creat_table_form}>
                    create table
                </button>
                {showform ? (
                    <form onSubmit={submit_form}>
                        <input type="text" placeholder="Table Name" value={tabel_name} onChange={e => setTable_name(e.target.value)} />
                        <input type="text" placeholder="Table Number" value={table_number} onChange={e => setTable_number(e.target.value)} />
                        <input type="text" placeholder="Table Capacity" value={table_capacity} onChange={e => setTable_capacity(e.target.value)} />
                        <button>Submit</button>
                    </form>
                ) : null}
            </ul>
            {/* manu category list */}
            <h2>Manu Category</h2>
            {manu_category_list && manu_category_list.map((category: any) => (
                // <button key={category.id} onClick={() => navigate(`/manu/${category.id}`, { state: { category } })}>
                <div key={category.id}><li >{category.name}</li>
                    <li >{category.description}</li>
                    {/* delete button */}
                    <button onClick={() => { delete_category(category.id) }}>Delete
                    </button></div>
                // </button>
            ))}
            {/* create manu */}
            <button onClick={open_creat_manu_form}>
                create manu
            </button>
            {showmanuform ? (
                <form onSubmit={submit_manu_category}>
                    <input type="text" placeholder="Manu Category" value={manu_category} onChange={e => setManu_category(e.target.value)} />
                    <input type="text" placeholder="Manu Description" value={manu_description} onChange={e => setManu_description(e.target.value)} />
                    <button>Submit</button>
                </form>
            ) : null}

            {/* items */}
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
                    {/* delete button */}
                    <button onClick={() => { delete_manu_item(item.id) }}>Delete</button>
                </div>
            ))}
            {/* create manu item */}
            <button onClick={open_creat_manu_item_form}>
                create manu item
            </button>
            {showmanuitemform ? (
                <form onSubmit={submit_manu_item}>
                    <section>
                        <select name="manu_category" id="manu_category" value={manu_category_1} onChange={e => setManu_category_1(e.target.value)}>
                            <option value="">Select Category</option>
                            {manu_category_list && manu_category_list.map((category: any) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </section>
                    <input type="text" placeholder="Manu Item" value={manu_item} onChange={e => setManu_item(e.target.value)} />
                    <input type="text" placeholder="Manu Price" value={manu_price} onChange={e => setManu_price(e.target.value)} />
                    <input type="text" placeholder="Manu Description" value={manu_description} onChange={e => setManu_description(e.target.value)} />
                    <input type="file" onChange={e => setItem_image(e.target.files ? e.target.files[0] : null)} />
                    <button>Submit</button>
                </form>
            ) : null}

        </div>
    )
}

export default create_table