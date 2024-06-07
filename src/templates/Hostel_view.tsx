import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import API_HOST from "../config"
import { Button } from "@mui/material"
import CustomizedDialogs from "./components/CustomizedDialogs"
import styled from "styled-components"
import RoomList from "./RoomList";
import { useTheme } from "./styles/theme"
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import LocalDiningRoundedIcon from '@mui/icons-material/LocalDiningRounded';
import ChecklistRoundedIcon from '@mui/icons-material/ChecklistRounded';
import TemporaryDrawer from "./components/Hostel_view_drower";
import SettingsIcon from '@mui/icons-material/Settings';

const StyledDiv = styled.div`
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`

function Hostel_view() {
    const { id } = useParams()
    const { theme } = useTheme()
    const navigate = useNavigate()

    const [is_mobile_view, set_is_mobile_view] = useState(false)

    useEffect(() => {
        if (window.innerWidth < 768) {
            set_is_mobile_view(true)
        }
    }, [])

    return (
        <StyledDiv>
            <RoomList hostel_id={id} />
            {!is_mobile_view ? <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginTop: 20,
                position: 'fixed',
                bottom: 20,
                right: 20,
                gap: 20
            }}>
                <CustomizedDialogs Hostel_id={id} />
                <Button startIcon={<HistorySharpIcon />} variant="contained" color="primary" onClick={() => navigate(`/hostels/pyments/${id}`)} style={{
                    backgroundColor: theme.colors.primary,
                    color: '#fff'
                }}>
                    Payments
                </Button>
                <Button startIcon={<LocalDiningRoundedIcon />} variant="contained" color="primary" onClick={() => navigate(`/hostels/Meals/${id}`)} style={{
                    backgroundColor: theme.colors.primary,
                    color: '#fff'
                }}>
                    Meals
                </Button>
                <Button startIcon={<ChecklistRoundedIcon />} variant="contained" color="primary" onClick={() => navigate(`/hostels/NoticeBord/${id}`)} style={{
                    backgroundColor: theme.colors.primary,
                    color: '#fff'
                }}>
                    Notice Board
                </Button>
                <Button startIcon={<SettingsIcon />} variant="contained" color="primary" onClick={() => navigate(`/hostels/Settings/${id}`)} style={{
                    backgroundColor: theme.colors.primary,
                    color: '#fff'
                }}>
                    Settings
                </Button>
            </div> : <div style={{
                display: 'flex',
                position: 'fixed',
                top: 0,
                right: 0,
                backgroundColor: theme.colors.background,
            }}><TemporaryDrawer /></div>}
        </StyledDiv>
    )
}

export default Hostel_view