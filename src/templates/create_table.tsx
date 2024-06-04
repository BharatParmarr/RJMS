import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Button, List, ListItem, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import API_HOST from "../config";
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from './styles/theme';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SimpleAlert from "./components/succes_aleart";


const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
  min-height: 100vh;
`;

const StyledButton = styled(Button)`
margin: 10px 0;
backgroundColor: ${({ theme }) => theme.colors.background};
color: ${({ theme }) => theme.colors.text};
  width: 70%;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const StyledListItem = styled(ListItem)`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 10px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text}20;
  &:last-child {
    border-bottom: none;
  }
  fontfamily: 'Roboto', sans-serif;
`;

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
    `;

const SectionStyled = styled.section`
    margin-bottom: 20px;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.colors.shadow};
    border-radius: 5px;
    `;

const StyledSelect = styled(Select)`
    width: 90vw;
    margin-bottom: 10px;
    padding-left: 40px;
    font-size: 1rem;
    @media (max-width: 1268px) {
        width: 80vw;
    }
    @media (max-width: 768px) {
        width: 70vw;
    }
    `;

const StyledAccordion = styled(Accordion)`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
    `;

const StyledTextField = styled(TextField)`
    width: 90vw;
    margin-bottom: 10px;
    padding-left: 40px;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    @media (max-width: 1268px) {
        width: 80vw;
    }
    @media (max-width: 768px) {
        width: 70vw;
    }
    `;

const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    min-width: 400px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
    padding: 20px;
    border-radius: 8px;
    @media (max-width: 768px) {
        min-width: 100%;
    }
    `;


function create_table() {
    const { theme } = useTheme();
    // alert stats
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('Loading...');
    const [type, setType] = useState('success');

    const { id } = useParams();
    // const location = useLocation();
    // const created_by = location.state.created_by;
    const [tables, settables] = useState([]);
    // navigtation
    const navigate = useNavigate();
    // manu category form submit
    const [manu_category, setManu_category] = useState('');
    const [manu_description, setManu_description] = useState('');
    const [manu_category_list, setManu_category_list] = useState([]);
    let url = API_HOST

    useEffect(() => {
        let yourToken = localStorage.getItem('token');
        fetch(url + '/categories?restorant_id=' + id, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${yourToken}`
            }
        })
            .then(response => {
                if (response.status === 401) {
                    navigate('/login')
                } else {
                    return response.json()
                }
            })
            .then(data => {
                if (data) {
                    setManu_category_list(data.results);
                }
            })
            .catch(() => {
                // alert
                setMessage('Something went wrong, Try again later.');
                setType('error');
                setOpen(true);

            });
    }
        , []);
    function submit_manu_category() {
        // e.preventDefault();
        let yourToken = localStorage.getItem('token');
        fetch(url + '/categories/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${yourToken}`
            },
            body: JSON.stringify({
                name: manu_category,
                description: manu_description,
                restorant: id
            }),
        })
            .then(response => response.json())
            .then(data => {
                setManu_category_list([...manu_category_list, data])
                // reset form
                setManu_category('');
                setManu_description('');
                // alert
                setMessage('Category Created Successfully');
                setType('success');
                setOpen(true);
            })
            .catch(() => {
                // alert
                setMessage('Failed to create Category, Try again later.');
                setType('error');
                setOpen(true);
            });
    }

    async function delete_category(category_id: any) {
        if (await window.confirm("Are you sure you want to delete this category?")) {
            let yourToken = localStorage.getItem('token');

            fetch(url + '/categories/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${yourToken}`
                },
                body: JSON.stringify({ category_id: category_id })
            })
                .then(response => {
                    if (!response.ok) { // or check for response.status === 200 for strictly checking for 200
                        alert('Failed to delete category, Try again later.')
                    }
                    return response.json();
                })
                .then(() => {
                    let new_manu_category_list = manu_category_list.filter((category: any) => category.id !== category_id)
                    setManu_category_list(new_manu_category_list)
                    // alert
                    setMessage('Category Deleted Successfully');
                    setType('success');
                    setOpen(true);
                })
                .catch(() => {
                    // alert
                    setMessage('Failed to delete category, Try again later.');
                    setType('error');
                    setOpen(true);
                });
        }
    }

    const [tabel_name, setTable_name] = useState('');
    const [table_number, setTable_number] = useState('');
    const [table_capacity, setTable_capacity] = useState('');
    // table form submit
    function submit_form() {
        let yourToken = localStorage.getItem('token');
        fetch(url + '/tables/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${yourToken}`
            },
            body: JSON.stringify({
                name: tabel_name,
                numebr: table_number,
                capacity: table_capacity,
                restorant: id
            }),
        })
            .then(response => {
                if (!response.ok) {
                    alert('Failed to create Table, Try again later.')
                }
                return response.json();
            })
            .then(data => {
                settables([...tables, data])
                // reset form
                setTable_name('');
                setTable_number('');
                setTable_capacity('');
                // alert
                setMessage('Table Created Successfully');
                setType('success');
                setOpen(true);
            })
            .catch(() => {
                // alert
                setMessage('Failed to create Table, Try again later.');
                setType('error');
                setOpen(true);
            });
    }
    // delete table
    function delete_table(table_id: any) {
        let yourToken = localStorage.getItem('token');
        if (window.confirm("Are you sure you want to delete this table?")) {
            fetch(url + '/tables', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${yourToken}`
                },
                body: JSON.stringify({
                    'table_id': table_id
                })
            })
                .then(response => response.json())
                .then(() => {
                    // remove table from list
                    let new_tables = tables.filter((table: any) => table.id !== table_id)
                    settables(new_tables)
                    // alert
                    setMessage('Table Deleted Successfully');
                    setType('success');
                    setOpen(true);
                })
                .catch(() => {
                    // alert
                    setMessage('Failed to delete Table, Try again later.');
                    setType('error');
                    setOpen(true);
                });
        }

    }

    useEffect(() => {
        let yourToken = localStorage.getItem('token');
        fetch(url + '/tables?restorant_id=' + id, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${yourToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                settables(data.results);
            })
            .catch((error) => console.error('Error:', error));
    }, []);
    const [showform, setShowform] = useState(false);
    function open_creat_table_form() {
        setShowform(!showform);
    }
    const [showmanuform, setShowmanuform] = useState(false);
    function open_creat_manu_form() {
        setShowmanuform(!showmanuform);
    }

    // manu item create, delete, show
    const [manu_item, setManu_item] = useState('');
    const [manu_price, setManu_price] = useState('');
    // const [manu_description, setManu_description] = useState('');
    const [manu_items, setManu_items] = useState([]);
    const [showmanuitemform, setShowmanuitemform] = useState(false);
    const [manu_category_1, setManu_category_1] = useState('');
    const [manu_category_2, setManu_category_2] = useState('')
    const [item_image, setItem_image] = useState<File | null>();
    function open_creat_manu_item_form() {
        setShowmanuitemform(!showmanuitemform);
    }
    function submit_manu_item() {
        // e.preventDefault();
        const form_data_manu_item = new FormData();
        form_data_manu_item.append('name', manu_item);
        form_data_manu_item.append('price', manu_price);
        form_data_manu_item.append('description', manu_description);
        form_data_manu_item.append('category', manu_category_1);
        if (item_image) {
            form_data_manu_item.append('image', item_image);
        }
        if (manu_category_1 === '') {
            alert('Select Category')
            return
        }
        let yourToken = localStorage.getItem('token');
        fetch(url + '/items/', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${yourToken}`
            },
            body: form_data_manu_item
        })
            .then(response => response.json())
            .then(() => {
                // alert
                setMessage('Item Created Successfully');
                setType('success');
                setOpen(true);
                setManu_item('');
                setManu_price('');
                setManu_description('');
            })
            .catch(() => {
                // alert
                setMessage('Failed to create Item, Try again later.');
                setType('error');
                setOpen(true);
            });
    }
    function delete_manu_item(item_id: any) {
        let yourToken = localStorage.getItem('token');

        if (window.confirm("Are you sure you want to delete this item?")) {
            fetch(url + '/items', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${yourToken}`
                },
                body: JSON.stringify({
                    item_id: item_id
                })
            })
                .then(response => response.json())
                .then(() => {
                    // alert
                    setMessage('Item Deleted Successfully');
                    setType('success');
                    setOpen(true);

                })
                .catch(() => {
                    // alert
                    setMessage('Failed to delete Item, Try again later.');
                    setType('error');
                    setOpen(true);

                });
        }
    }
    useEffect(() => {
        let yourToken = localStorage.getItem('token');
        fetch(url + '/items?category_id=' + manu_category_2, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${yourToken}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setManu_items(data.results);
            })
            .catch((error) => console.error('Error:', error));
    }, [manu_category_2]);
    return (
        <Wrapper id="wrapper">
            <h1>Manage Restorant</h1>
            <SectionStyled>
                <StyledAccordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        style={{
                            backgroundColor: theme.colors.white,
                            color: theme.colors.text
                        }}
                    >
                        <span style={{
                            fontFamily: 'Roboto, sans-serif',

                        }}>Table's</span>
                    </AccordionSummary>
                    <AccordionDetails style={{
                        backgroundColor: theme.colors.white,
                        color: theme.colors.text
                    }}>
                        <List>
                            <StyledGrid>
                                {tables && tables.map((table: any) => (
                                    <div key={table.id}>
                                        <StyledButton onClick={() => navigate(`/table/${table.id}`, { state: { table } })}>
                                            <StyledListItem>{table.name}</StyledListItem>
                                            <StyledListItem key={table.id}>{table.capacity}</StyledListItem>
                                        </StyledButton>
                                        <StyledButton onClick={() => { delete_table(table.id) }} startIcon={<DeleteIcon />}>Delete</StyledButton>
                                    </div>
                                ))}
                            </StyledGrid>
                            <StyledButton onClick={open_creat_table_form} style={{
                                backgroundColor: theme.colors.background,
                                color: theme.colors.text
                            }}>create table</StyledButton>
                            {showform ? (
                                <StyledForm>
                                    <StyledTextField type="text" placeholder="Table Name" value={tabel_name} onChange={e => setTable_name(e.target.value)} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text }, border: `1px solid ${theme.colors.gray}` }} />
                                    <StyledTextField type="text" placeholder="Table Number" value={table_number} onChange={e => setTable_number(e.target.value)} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text }, border: `1px solid ${theme.colors.gray}` }} />
                                    <StyledTextField type="text" placeholder="Table Capacity" value={table_capacity} onChange={e => setTable_capacity(e.target.value)} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text }, border: `1px solid ${theme.colors.gray}` }} />
                                    <StyledButton onClick={submit_form} style={{
                                        backgroundColor: theme.colors.background,
                                        color: theme.colors.text
                                    }}>Submit</StyledButton>
                                </StyledForm>
                            ) : null}
                        </List>
                    </AccordionDetails>
                </StyledAccordion>
            </SectionStyled>
            <SectionStyled>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        style={{
                            backgroundColor: theme.colors.white,
                            color: theme.colors.text
                        }}
                    >
                        <span style={{
                            fontFamily: 'Roboto, sans-serif',

                        }}>Manu's</span>
                    </AccordionSummary>
                    <AccordionDetails style={{
                        backgroundColor: theme.colors.white,
                        color: theme.colors.text
                    }}>
                        <StyledGrid>
                            {manu_category_list && manu_category_list.map((category: any) => (
                                <div key={category.id} style={{
                                    fontFamily: 'Roboto, sans-serif',
                                }}>
                                    <StyledListItem>{category.name}</StyledListItem>
                                    <StyledListItem>{category.description}</StyledListItem>
                                    <StyledButton onClick={() => { delete_category(category.id) }} startIcon={<DeleteIcon />}>Delete</StyledButton>
                                </div>
                            ))}
                        </StyledGrid>
                        <StyledButton onClick={open_creat_manu_form} style={{
                            backgroundColor: theme.colors.background,
                            color: theme.colors.text
                        }}>create manu</StyledButton>
                        {showmanuform ? (
                            <StyledForm>
                                <StyledTextField type="text" placeholder="Manu Category" value={manu_category} onChange={e => setManu_category(e.target.value)} style={{}} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text }, border: `1px solid ${theme.colors.gray}` }} />
                                <StyledTextField type="text" placeholder="Manu Description" value={manu_description} onChange={e => setManu_description(e.target.value)} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text }, border: `1px solid ${theme.colors.gray}` }} />
                                <StyledButton onClick={submit_manu_category} style={{
                                    backgroundColor: theme.colors.background,
                                    color: theme.colors.text
                                }}>Submit</StyledButton>
                            </StyledForm>
                        ) : null}
                    </AccordionDetails>
                </Accordion>
            </SectionStyled>
            <SectionStyled>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        style={{
                            backgroundColor: theme.colors.white,
                            color: theme.colors.text
                        }}
                    >
                        <span style={{
                            fontFamily: 'Roboto, sans-serif',
                        }}>Manu Items</span>
                    </AccordionSummary>
                    <AccordionDetails style={{
                        backgroundColor: theme.colors.white,
                        color: theme.colors.text
                    }}>
                        <FormControl >
                            <InputLabel id="manu_category_label" style={{
                                backgroundColor: theme.colors.white,
                                color: theme.colors.text
                            }}>Select Category</InputLabel>
                            <StyledSelect name="manu_category" id="manu_category" value={manu_category_2} onChange={e => setManu_category_2(e.target.value)} style={{
                                color: theme.colors.text,
                                backgroundColor: theme.colors.white,
                            }} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text }, border: `1px solid ${theme.colors.gray}` }}>
                                <MenuItem value="" style={{ backgroundColor: theme.colors.white, color: theme.colors.text }}><em>None</em></MenuItem>
                                {manu_category_list && manu_category_list.map((category: any) => (
                                    <MenuItem style={{ backgroundColor: theme.colors.white, color: theme.colors.text }} key={category.id} value={category.id}>{category.name}</MenuItem>
                                ))}
                            </StyledSelect>
                        </FormControl>
                        {manu_items && manu_items.map((item: any) => (
                            <div key={item.id} style={{
                                fontFamily: 'Roboto, sans-serif',
                            }}>
                                <StyledListItem>{item.name}</StyledListItem>
                                <StyledListItem key={item.id}>{item.price}</StyledListItem>
                                <StyledListItem key={item.id}>{item.description}</StyledListItem>
                                <StyledButton onClick={() => { delete_manu_item(item.id) }} startIcon={<DeleteIcon />}>Delete</StyledButton>
                            </div>
                        ))}
                        <StyledButton onClick={open_creat_manu_item_form} style={{
                            backgroundColor: theme.colors.background,
                            color: theme.colors.text
                        }}>create manu item</StyledButton>
                        {showmanuitemform ? (
                            <StyledForm>
                                <FormControl>
                                    <InputLabel id="manu_category_label_1" style={{
                                        backgroundColor: theme.colors.white,
                                        color: theme.colors.text
                                    }}>Select Category</InputLabel>
                                    <Select name="manu_category" id="manu_category" value={manu_category_1} onChange={e => setManu_category_1(e.target.value)} style={{
                                        width: '50vw',
                                    }} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text }, border: `1px solid ${theme.colors.gray}` }}>
                                        <MenuItem value="" style={{ backgroundColor: theme.colors.white, color: theme.colors.text }}><em>None</em></MenuItem>
                                        {manu_category_list && manu_category_list.map((category: any) => (
                                            <MenuItem key={category.id} value={category.id} style={{ backgroundColor: theme.colors.white, color: theme.colors.text }}>{category.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <StyledTextField type="text" placeholder="Manu Item" value={manu_item} onChange={e => setManu_item(e.target.value)} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text }, border: `1px solid ${theme.colors.gray}` }} />
                                <StyledTextField type="text" placeholder="Manu Price" value={manu_price} onChange={e => setManu_price(e.target.value)} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text }, border: `1px solid ${theme.colors.gray}` }} />
                                <StyledTextField type="text" placeholder="Manu Description" value={manu_description} onChange={e => setManu_description(e.target.value)} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text }, border: `1px solid ${theme.colors.gray}` }} />
                                <input type="file" onChange={e => setItem_image(e.target.files ? e.target.files[0] : null)} />
                                <StyledButton style={{
                                    backgroundColor: theme.colors.background,
                                    color: theme.colors.text
                                }} onClick={submit_manu_item}>Submit</StyledButton>
                            </StyledForm>
                        ) : null}
                    </AccordionDetails>
                </Accordion>
            </SectionStyled>
            <div style={{
                position: 'fixed',
                bottom: 10,
                right: 10,
                minWidth: '300px',
            }}>
                <SimpleAlert
                    message={message}
                    type={type}
                    open={open}
                    setOpen={setOpen}
                />
            </div>
        </Wrapper>
    )
}

export default create_table