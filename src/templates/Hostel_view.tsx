import { useEffect } from "react"
import { useParams } from "react-router-dom"
import API_HOST from "../config"
// import { Button } from "@mui/material"
import CustomizedDialogs from "./components/CustomizedDialogs"
import styled from "styled-components"

import RoomList from "./RoomList";
// import StudentForm from "./StudentForm";
// import StudentList from "./StudentList";

const StyledDiv = styled.div`
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`

function Hostel_view() {
    const { id } = useParams()

    // useEffect(() => {
    //     fetch(API_HOST+`/api/hostels/${id}`,{
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Token '+localStorage.getItem('token') || ''
    //         }
    //     }).then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // }, [])

    return (
        <StyledDiv>
            <RoomList hostel_id={id} />
            <CustomizedDialogs Hostel_id={id} />
        </StyledDiv>
    )
}

export default Hostel_view