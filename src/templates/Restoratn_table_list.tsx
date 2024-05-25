import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Restorant_table_list() {

    const { id } = useParams();
    const [tables, settables] = useState([]);
    // navigtation
    const navigate = useNavigate();

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



    return (
        <div style={{ backgroundColor: 'black', color: 'white' }} id="wrapper">
            <h1>Restorant</h1>
            <h3>Details</h3>
            <ul>
                {/* tables */}
                {tables && tables.map((table: any) => (
                    <div key={table.id} onClick={() => navigate(`/restorant/table/${id}/${table.id}`)}>
                        <button onClick={() => navigate(`/table/${table.id}`, { state: { table } })}>
                            <li >{table.name}</li>
                            <li key={table.id}>{table.capacity}</li>
                        </button>
                    </div>
                ))}


            </ul>


        </div>
    )
}

export default Restorant_table_list