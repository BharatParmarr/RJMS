// waiting list
import { useState, useEffect } from 'react'
import { API_HOST } from '../config';

const Waitinglist = () => {
    const [waitingList, setWaitingList] = useState([]);
    const [page, setPage] = useState(1);
    let token = localStorage.getItem('token');
    useEffect(() => {
        fetch(`${API_HOST}/api/check/user_has_permission/waiting_list/?page=${page}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setWaitingList(data));
    }, [page]);

    const handleApprove = (id: number) => {
        fetch(`${API_HOST}/api/check/user_has_permission/waiting_list_update/${id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(() => {
                setWaitingList(waitingList.filter((user: any) => user.id !== id));
            }).catch(error => {
                console.error('Error:', error);
            });
    }

    const handleReject = (id: number) => {
        fetch(`${API_HOST}/api/check/user_has_permission/waiting_list_update/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then(response => response.json())
            .then(() => {
                setWaitingList(waitingList.filter((user: any) => user.id !== id));
            }).catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw', backgroundColor: '#f0f0f0' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Waiting List</h1>
            <table style={{ width: '80%', border: '1px solid black', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '10px', border: '1px solid black' }}>Name</th>
                        <th style={{ padding: '10px', border: '1px solid black' }}>Email</th>
                        <th style={{ padding: '10px', border: '1px solid black' }}>Approve</th>
                        <th style={{ padding: '10px', border: '1px solid black' }}>Reject</th>
                    </tr>
                </thead>
                <tbody>
                    {waitingList.map((user: any) => (
                        <tr key={user.id}>
                            <td style={{ padding: '10px', border: '1px solid black' }}>{user.name}</td>
                            <td style={{ padding: '10px', border: '1px solid black' }}>{user.email}</td>
                            <td style={{ padding: '10px', border: '1px solid black' }}><button style={{ padding: '5px 10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleApprove(user.id)}>Approve</button></td>
                            <td style={{ padding: '10px', border: '1px solid black' }}><button style={{ padding: '5px 10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleReject(user.id)}>Reject</button></td>
                        </tr>
                    ))}
                </tbody>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                    <button style={{ padding: '5px 10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setPage(page - 1)}>Previous</button>
                    <button style={{ padding: '5px 10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setPage(page + 1)}>Next</button>
                </div>
            </table>
        </div>
    )
}

export default Waitinglist