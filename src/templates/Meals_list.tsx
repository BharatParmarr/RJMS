import { useEffect, useState } from "react"
import api from "../api"
import { useParams } from "react-router-dom"
import styled from "styled-components";
import { Button } from "@mui/material";
import FullScreenDialog from "./components/Full_screen_dilog_create_manu";

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.background};
    min-height: 100vh;
    width: 100%;
`

const StyledButton = styled(Button)`
    margin: 20px;
`

const StyledBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    margin: 20px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    width: 50%;

    @media (max-width: 768px) {
        width: 90%;
    }
`
const StyledSubBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding: 10px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 8px;
`
const StyledTitle = styled.h3`
    color: ${({ theme }) => theme.colors.text};
`

const StyledSeconTitle = styled.h4`
    color: ${({ theme }) => theme.colors.text};
`
const StyldeSeconTitle = styled.h4`
    color: ${({ theme }) => theme.colors.text};
`


function Meals_list() {
    const { id } = useParams()
    const [meals, setMeals] = useState([])

    useEffect(() => {
        // Add your code here
        api.get('/meals?hostel_id=' + id).then((response) => {
            setMeals(response.data)
            console.log(response.data, 'meals');
        }).catch(() => {
            alert('Something went wrong! try again later');
        });
    }, [])

    function convet_to_readeble(Datetiem: string) {
        let date = new Date(Datetiem)
        return date.toLocaleString()
    }
    return (
        <StyledDiv>
            {meals && meals.map((meal: any) => (
                <StyledBox key={meal.id}>
                    <StyledTitle>{meal.name}</StyledTitle>
                    <StyledSeconTitle>{convet_to_readeble(meal.MealTime)}</StyledSeconTitle>
                    <StyldeSeconTitle>{meal.price}</StyldeSeconTitle>
                    {meal.MealItems.map((item: any) => (
                        <StyledSubBox key={item.id}>
                            <StyledTitle>{item.name}</StyledTitle>
                            {item.unlimited ? <StyledSeconTitle>Unlimited</StyledSeconTitle> : <StyledSeconTitle>{item.quantity}</StyledSeconTitle>}
                            <StyledSeconTitle>{item.price}</StyledSeconTitle>
                        </StyledSubBox>
                    ))}
                </StyledBox>
            ))}
            <span style={{
                margin: '20px',
                position: 'fixed',
                bottom: '0',
                right: '10px',
            }}>
                <FullScreenDialog />
            </span>

            {/* <StyledButton variant="contained">Create Meal item</StyledButton> */}

        </StyledDiv>
    )
}

export default Meals_list