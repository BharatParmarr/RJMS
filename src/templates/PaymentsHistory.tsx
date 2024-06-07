import { useParams } from "react-router-dom";
import api from "../api";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { Divider, ListItem, ListItemText, Typography } from '@mui/material';
import { useTheme } from "./styles/theme";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    min-height: 100vh;
`;

const StyledPayment = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
`;

const StyledPaymentHolder = styled(ListItem)`
    display: flex;
    margin-bottom: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    padding: 20px;
    flex-direction: column;
`;

const StyledPaymentText = styled(ListItemText)`
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    align-items: left;
    justify-content: left;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;


function PaymentsHistory() {
    const { id } = useParams()
    const { theme } = useTheme()

    type Payment = {
        id: number;
        student_name: string;
        total: number;
        payment_method: string;
        paid: number;
        due: number;
        updated_time: string;
        payment_for?: string;
    }
    const [payments, setPayments] = useState<Payment[]>()

    function onSave(response: any) {
        setPayments(response.data);
    }

    useEffect(() => {
        api.get('/payments?hostel_id=' + id).then(onSave).catch((error) => {
            console.log(error, 'error')
        });
    }, []);

    function ReadableDateTime(datetime: string) {
        const date = new Date(datetime);
        return date.toLocaleString();
    }
    return (
        <StyledContainer>
            <StyledPaymentHolder>
                {payments && payments.length === 0 && <Typography variant="h6">No Payments Found</Typography>}
                {payments && payments.map((payment) => (
                    <StyledPayment key={payment.id}>
                        <StyledPaymentText primary={payment.student_name} secondary={<Typography variant="body2" style={{ color: theme.colors.gray, fontSize: '10px' }}>Student</Typography>} />
                        <Divider color={theme.colors.gray} />
                        <StyledPaymentText primary={payment.total} secondary={<Typography variant="body2" style={{ color: theme.colors.gray, fontSize: '10px' }}>Total</Typography>} />
                        <Divider color={theme.colors.gray} />
                        <StyledPaymentText primary={payment.paid} secondary={<Typography variant="body2" style={{ color: theme.colors.gray, fontSize: '10px' }}>Paid</Typography>} />
                        <Divider color={theme.colors.gray} />
                        <StyledPaymentText >Due: <span style={{
                            color: payment.due < 0 ? 'green' : 'red'
                        }}>{payment.due * (-1)}</span></StyledPaymentText>
                        <Divider color={theme.colors.gray} />
                        <StyledPaymentText>Payment Method: {payment.payment_method}</StyledPaymentText>
                        <Divider color={theme.colors.gray} />
                        {payment.updated_time && <StyledPaymentText>Payment Time: {ReadableDateTime(payment.updated_time)}</StyledPaymentText>}
                    </StyledPayment>
                ))}
            </StyledPaymentHolder>
        </StyledContainer>
    )
}

export default PaymentsHistory