// antd datepicker timing for hospital
import { useState, useEffect } from 'react';
import { DatePicker, message, Space, Button } from 'antd';
import styled from 'styled-components';
import { apis2 } from '../../apis';
import { ClockCircleOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;

const Container = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const StyledTimeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 10px;
    margin-top: 20px;

    label {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
    }   
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 10px;
        background-color: ${({ theme }) => theme.colors.background};
        border-radius: 10px;
    }
    label {
        margin-right: 10px;
    }
    button {
        margin-top: 10px;
    }
`;


const TimeEditContaineer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 10px;
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: 768px) {
        width: 100%;
        flex-direction: column;
        gap: 10px;
    }
`;
function Hospital_Timings({ For = "hospital", sub_id }: { For: string, sub_id: string }) {

    const [timings, setTimings] = useState({});
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        const fetchTimings = async () => {
            if (!sub_id) {
                return;
            }
            let res = { data: [] }
            if (For === "hospital") {
                res = await apis2.get(`/hospital-timings/${sub_id}/`);
            } else if (For === "restorant") {
                res = await apis2.get(`/restorant-timings/${sub_id}/`);
            }
            let newTimings = {} as any;
            let count = 0;
            console.log(res, 'ress');
            if (res.data.length > 0 && res.data.length === days.length) {
                for (const day of days) {
                    newTimings[day] = [res.data[count]['opening_time'], res.data[count]['closing_time']];
                    count++;
                }
            }
            setTimings(newTimings);
        };
        fetchTimings();
    }, [sub_id]);

    const setMondayTime = (_value: any, dateString: any) => {
        const newTimings = {
            Monday: dateString,
            Tuesday: dateString,
            Wednesday: dateString,
            Thursday: dateString,
            Friday: dateString,
            Saturday: dateString,
            Sunday: dateString,
        };
        setTimings(newTimings);
    };

    const updateDayTime = (day: string) => (_value: any, dateString: any) => {
        console.log(day, dateString, timings);
        setTimings(prevTimings => ({
            ...prevTimings,
            [day]: dateString
        }));
    };

    const addTimings = async () => {
        // check if timings is empty
        if (Object.keys(timings).length === 0) {
            message.error('Please add timings');
            return;
        }
        let res;
        if (For === "hospital") {
            res = await apis2.post(`/hospital-timings/${sub_id}/`, timings);
        } else if (For === "restorant") {
            res = await apis2.post(`/restorant-timings/${sub_id}/`, timings);
        }
        console.log(res, 'respost');
    }

    return (
        <Container>
            <Space direction="vertical" size={12} style={{ width: '100%' }}>
                <label style={{ textTransform: 'capitalize' }}>{For} Timings</label>
                <div>
                    <label>Set time for all days :</label>
                    <RangePicker picker="time" onChange={setMondayTime} />
                    <StyledTimeContainer>
                        <label>Timings:</label>
                        {Object.keys(timings).map((day) => (
                            <div key={day}>
                                <label style={{ minWidth: '100px' }}>{day}</label>
                                <label>{timings[day as keyof typeof timings][0]} - {timings[day as keyof typeof timings][1]}</label>
                            </div>
                        ))}
                    </StyledTimeContainer>
                </div>
                {days.map((day) => (
                    <TimeEditContaineer key={day}>
                        <label style={{ minWidth: '200px', textAlign: 'center' }}>{day}</label>
                        <RangePicker
                            picker="time"
                            onChange={updateDayTime(day)}
                            style={{
                                minWidth: '200px', textAlign: 'center', backgroundColor: 'transparent'
                            }}
                            suffixIcon={<ClockCircleOutlined />}
                        />
                    </TimeEditContaineer>
                ))}
                <Button type="primary" onClick={addTimings}>Update</Button>
            </Space>
        </Container>
    );
}

export default Hospital_Timings;
