import { useEffect, useState } from 'react'
import service_api from '../service_api'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import {
    Button,
} from '@mui/material';
import API_HOST from '../config';

const Styledcontainer = styled.div`
background-color: ${({ theme }) => theme.colors.background};
color: ${({ theme }) => theme.colors.text};
padding: 20px;
min-height: 100vh;
`;
const Styledcard = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 10px;
    border: 1px solid black;
    width: 300px;
    height: 300px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);
    cursor: pointer;
`

const Styledimg = styled.img`
    width: 100%;
    height: 200px;
    border-radius: 10px;
`

const Styledname = styled.h3`
    text-align: center;
`


function Service_home() {

    const navigate = useNavigate()
    type Service = {
        id: number,
        name: string,
        logo: string
    }

    const [service, setService] = useState<Service[]>([])

    useEffect(() => {
        service_api.get('').then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                setService(res.data)
            } else if (res.status === 401) {
                navigate('/login')
            }
        }).catch((error) => {
            console.log(error)
        })
    }, [])




    return (
        <Styledcontainer>
            {service.map((item, index) => {
                return (
                    <Styledcard key={index} onClick={() => navigate(`/Service-shop/${item.id}`)}>
                        <Styledimg src={API_HOST + item.logo} alt={item.logo} />
                        <Styledname>{item.name}</Styledname>
                    </Styledcard>
                )
            })}

            {/* create ServiceShop form */}
            {/* button to show and hide form */}
            <Button onClick={() => {
                navigate('/Service-shop/create')
            }}>Create ServiceShop</Button>

        </Styledcontainer>
    )
}

export default Service_home