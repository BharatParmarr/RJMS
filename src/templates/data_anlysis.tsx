import React, { useEffect } from 'react'
import API_HOST from '../config';
import { useParams } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { useTheme } from './styles/theme';

function Data_anlysis() {
    const { id } = useParams();
    const [data, setData] = React.useState(null);
    const { theme } = useTheme();
    useEffect(() => {
        fetch(API_HOST + '/api/Analysis?restorant_id=' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data, "data")
                setData(data);
            })
            .catch((error) => console.error('Error:', error));
    }, []);
    return (
        // <Dashboard data={data} />
        <div style={{
            backgroundColor: theme.colors.background,
            padding: '20px',
            minHeight: '100vh',
        }}>
            {data && <Dashboard data={data} />}
        </div>
    )
}

export default Data_anlysis