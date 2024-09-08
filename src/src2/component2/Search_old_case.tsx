// search old case

import { useState } from 'react';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import styled from 'styled-components';
import { apis2 } from '../../apis';
import { useTheme } from '../../templates/styles/theme';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useParams } from 'react-router-dom';

const StyledTextField = styled(TextField)`
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
`;

const StyledTable = styled(Table)`
    background-color: ${({ theme }) => theme.colors.white};
`;

const StyledTableHead = styled(TableHead)`
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
`;

const StyledTableRow = styled(TableRow)`
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
`;

const StyledTableCell = styled(TableCell)`
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
`;

const StyledTableBody = styled(TableBody)`
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
`;





const SearchOldCase = ({ doctor_id, custom_fees }: { doctor_id: number, custom_fees: number }) => {
    const { theme } = useTheme();
    const { id, sub_id } = useParams();
    const [open, setOpen] = useState(false);
    type SearchResult = {
        id: number;
        patient_phone: number;
        patient_name: string;
        number_of_visits: number;
    };
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [oldAppointmentsFees, setOldAppointmentsFees] = useState(custom_fees);
    const [selectedPatient, setSelectedPatient] = useState<SearchResult | null>(null);
    // indian standard time
    let today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    let today_date = `${yyyy}-${mm}-${dd}`;
    // HH:mm:ss
    let today_time = today.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

    // data in yyyy-mm-dd format and time in hh:mm:ss format
    const [formData, setFormData] = useState({
        date: today_date,
        time: today_time
    });

    const handleSearch = async () => {
        try {
            const response = await apis2.get(`/find_patient/?type=doctor&query=${searchTerm}&hospital_id=${sub_id}&business_id=${id}&doctor_id=${doctor_id}`);
            setSearchResults(response.data.results);
        } catch (error) {
            console.error('Error searching for old cases:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const response = await apis2.post(`/appointment/update_number_of_visits/${selectedPatient?.id}?date=${formData.date}&time=${formData.time}&business_id=${id}&custom_fees=${oldAppointmentsFees}`);
            console.log(response.data);
            setOpen(false);
        } catch (error) {
            console.error('Error updating number of visits:', error);
        }
    };

    return (
        <Container sx={{ backgroundColor: theme.colors.background, padding: '20px', borderRadius: '10px' }}>
            <Typography variant="h4" sx={{ color: theme.colors.text, fontWeight: 'bold' }}>Search Old Cases</Typography>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <TextField
                    label="Search Name or Phone number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{
                        backgroundColor: theme.colors.white,
                        border: `1px solid ${theme.colors.gray}`,
                        borderRadius: '8px',
                    }}
                />
                <Button sx={{ marginTop: '10px', marginLeft: '10px' }}
                    variant="contained" color="primary" onClick={handleSearch}>Search</Button>
            </div>
            {/* old appointments fees */}
            {custom_fees > 0 && <TextField
                label="Old Appointments Fees"
                value={oldAppointmentsFees}
                onChange={(e) => setOldAppointmentsFees(Number(e.target.value))}
                variant="outlined"
                sx={{
                    backgroundColor: theme.colors.white,
                    border: `1px solid ${theme.colors.gray}`,
                    borderRadius: '8px',
                    marginTop: '20px',
                }}
            />}
            {searchResults.length > 0 && <Typography sx={{ marginTop: '20px' }} variant="h6" color="primary">Search Results</Typography>}
            <TableContainer sx={{ marginTop: '20px' }} component={Paper}>
                <StyledTable>
                    <StyledTableHead>
                        <StyledTableRow>
                            <StyledTableCell sx={{ color: theme.colors.text }}>Phone Number</StyledTableCell>
                            <StyledTableCell sx={{ color: theme.colors.text }}>Patient Name</StyledTableCell>
                            <StyledTableCell sx={{ color: theme.colors.text }}>Visits</StyledTableCell>
                            <StyledTableCell sx={{ color: theme.colors.text }}>Book</StyledTableCell>
                        </StyledTableRow>
                    </StyledTableHead>
                    <StyledTableBody>
                        {searchResults.map((result) => (
                            <StyledTableRow key={result.id}>
                                <StyledTableCell sx={{ color: theme.colors.text }}>{result.patient_phone ? result.patient_phone : result.patient_name}</StyledTableCell>
                                <StyledTableCell sx={{ color: theme.colors.text }}>{result.patient_name}</StyledTableCell>
                                <StyledTableCell sx={{ color: theme.colors.text }}>{result.number_of_visits}</StyledTableCell>
                                {/* time and date using mui/date-picker */}
                                <StyledTableCell>
                                    <Button variant="contained" color="primary" onClick={() => {
                                        setOpen(true)
                                        setSelectedPatient(result);
                                    }}>Book</Button>
                                    <Dialog open={open} onClose={() => { setOpen(false) }}>
                                        <DialogTitle>Book Appointment</DialogTitle>
                                        <DialogContent>
                                            <StyledTextField
                                                label="Date"
                                                name="date"
                                                type="date"
                                                value={formData.date}
                                                onChange={handleInputChange}
                                                fullWidth
                                                InputLabelProps={{
                                                    style: { color: theme.colors.text },
                                                }}
                                                sx={{
                                                    input: {
                                                        color: theme.colors.text,
                                                        backgroundColor: theme.colors.gray + 50,
                                                        border: `1px solid ${theme.colors.gray}`,
                                                        borderRadius: '8px',
                                                    },
                                                }}
                                            />
                                            <StyledTextField
                                                label="Time"
                                                name="time"
                                                type="time"
                                                value={formData.time}
                                                onChange={handleInputChange}
                                                fullWidth
                                                InputLabelProps={{
                                                    style: { color: theme.colors.text },
                                                }}
                                                sx={{
                                                    input: {
                                                        color: theme.colors.text,
                                                        backgroundColor: theme.colors.gray + 50,
                                                        border: `1px solid ${theme.colors.gray}`,
                                                        borderRadius: '8px',
                                                    },
                                                }}
                                            />
                                            <Button variant="contained" color="primary" onClick={() => handleUpdate()}>Book</Button>
                                        </DialogContent>
                                    </Dialog>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </StyledTableBody>
                </StyledTable>
            </TableContainer>
        </Container>
    );
};

export default SearchOldCase;