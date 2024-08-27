import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Button, TextField, Grid, Switch } from '@mui/material';
import { useTheme } from '../../templates/styles/theme';
import { apis2 } from '../../apis';

// Styled-components for custom styling

const Styledform = styled.form`
  width: 100%;
    display: flex;
    background-color: ${({ theme }) => theme.colors.background};
    flex-direction: column;
    margin-top: 20px;
`;

const StyledGrid = styled(Grid)`
  margin-top: 20px;
`;

const StyledTextField = styled(TextField)`
    border-radius: 10px;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

const BedsContainer = styled.div`
  margin-top: 20px;
    display: flex;
    flex-direction: row;
    gap: 20px;
    flex-wrap: wrap;
    
`;

const Bed = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: ${({ theme }) => theme.colors.text};
  width: 40%;
  `;

const BedNameContainer = styled.h3`
  color: ${({ theme }) => theme.colors.text};
`;

function Bed_book({ id, name }: any) {
    const { theme } = useTheme();
    const [is_occupied, setIs_occupied] = useState(false);

    useEffect(() => {
        const res = apis2.get('/bed_book/' + id);
        res.then((response) => {
            if (response.status === 200) {
                setIs_occupied(response.data.is_occupied);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    function handleSubmit(event: any) {
        event.preventDefault();
        if (typeof is_occupied !== 'boolean') {
            alert('Please enter a valid value');
            return;
        }

        const res = apis2.post('/bed_book/' + id, {
            'is_occupied': is_occupied,
        });
        res.then((response) => {
            if (response.status === 200) {
                alert('Successfully Added');
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Bed>
            <BedNameContainer>
                Bed number {name}
            </BedNameContainer>
            <Styledform onSubmit={handleSubmit}>
                <StyledGrid container spacing={2} sx={{
                    backgroundColor: theme.colors.background,
                    padding: '20px',
                    borderRadius: '10px',
                }}>
                    <StyledGrid item xs={12} sm={6}>
                        Not Occupied
                        <Switch checked={is_occupied} onChange={() => setIs_occupied(!is_occupied)} />
                        Occupied
                    </StyledGrid>
                    <StyledGrid item xs={12}>
                        <StyledButton type="submit" variant="contained" color="primary">
                            Save Changes
                        </StyledButton>
                    </StyledGrid>
                </StyledGrid>
            </Styledform>
        </Bed>
    )
}

function Room_book({ id, sub_id }: any) {
    const { theme } = useTheme();
    const [total_patients, setTotalPatients] = React.useState(0);
    const [beds, setBeds] = React.useState([]);
    useEffect(() => {
        const res = apis2.get('/room_book/' + id);
        res.then((response) => {
            console.log(response);
            if (response.status === 200) {
                setTotalPatients(response.data.total_patients);
            }
        }).catch((error) => {
            console.log(error);
        });

        const res2 = apis2.get(`/manage/beds/${id}/${sub_id}`)
        res2.then((response) => {
            console.log(response);
            if (response.status === 200) {
                setBeds(response.data);
            }
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    function handleSubmit(event: any) {
        event.preventDefault();
        if (typeof total_patients !== 'number') {
            alert('Please enter a valid number');
            return;
        }
        const res = apis2.post('/room_book/' + id, {
            'total_patients': total_patients,
        });
        res.then((response) => {
            console.log(response);
            if (response.status === 200) {
                alert('Successfully Added');
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div style={{
            overflowY: 'auto',
        }}>
            <Styledform onSubmit={handleSubmit}>
                <StyledGrid container spacing={2} sx={{
                    backgroundColor: theme.colors.white,
                    padding: '20px',
                    borderRadius: '10px',
                }}>
                    <StyledGrid item xs={12} sm={6}>
                        <StyledTextField
                            label="Patient Numbers in Room"
                            name="patient_name"
                            value={total_patients}
                            onChange={(e) => {
                                let value = e.target.value;
                                setTotalPatients(Number(value));
                            }}
                            fullWidth
                            InputLabelProps={{
                                style: { color: theme.colors.text },
                            }}
                            sx={{
                                input: {
                                    color: theme.colors.text,
                                    backgroundColor: theme.colors.white,
                                    border: `1px solid ${theme.colors.gray}`,
                                    borderRadius: '8px',
                                },
                            }}
                        />
                    </StyledGrid>
                    <StyledGrid item xs={12}>
                        <StyledButton type="submit" variant="contained" color="primary">
                            Save Room Patient Numbers
                        </StyledButton>
                    </StyledGrid>
                </StyledGrid>
            </Styledform>
            <BedsContainer>
                {beds.map((bed: any, index: number) => (
                    <Bed_book key={index} id={bed.id} name={bed.bed_number} />
                ))}
            </BedsContainer>
        </div>
    )
}

export default Room_book