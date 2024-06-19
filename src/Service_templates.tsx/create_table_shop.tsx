import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Button, List, ListItem, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import API_HOST from "../config";
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '../templates/styles/theme';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SimpleAlert from "../templates/components/succes_aleart";
import Switch from '@mui/material/Switch';
import RoomPreferencesRoundedIcon from '@mui/icons-material/RoomPreferencesRounded';

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


function create_table_shop() {
    const { theme } = useTheme();
    // alert stats
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('Loading...');
    const [type, setType] = useState('success');

    const { id } = useParams();
    const [tables, settables] = useState([]);
    // navigtation
    const navigate = useNavigate();
    // manu category form submit
    const [manu_description, setManu_description] = useState('');
    const [min_time, setMin_time] = useState(0);
    const [max_time, setMax_time] = useState(0);
    let url = API_HOST

    function Activate_manu_category_item(categoryId: any, is_active: any) {
        let yourToken = localStorage.getItem('token');
        fetch(API_HOST + '/api/service-shop/service/activate?service_id=' + categoryId, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${yourToken}`
            },
        })
            .then(response => response.json())
            .then(data => {

                if (data.message === "Service activated") {
                    let new_manu_items: any = manu_items.map((item: any) => {
                        if (item.id === categoryId) {
                            item.active = is_active
                        }
                        return item
                    })
                    setManu_items(new_manu_items)
                    // alert
                    setMessage('Item Updated Successfully');
                    setType('success');
                    setOpen(true);
                } else {
                    // alert
                    setMessage('Failed to Update Category, Try again later.');
                    setType('error');
                    setOpen(true);
                }
            })
            .catch((e) => {
                console.log(e)
                // alert
                setMessage('Failed to create Category, Try again later.');
                setType('error');
                setOpen(true);
            });
    }

    const [tabel_name, setTable_name] = useState('');
    const [table_number, setTable_number] = useState('');
    const [table_capacity, setTable_capacity] = useState('');
    // table form submit
    function submit_form() {
        let yourToken = localStorage.getItem('token');
        fetch(url + '/api/service-shop/Table', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${yourToken}`
            },
            body: JSON.stringify({
                name: tabel_name,
                capacity: table_capacity,
                service_shop: id
            }),
        })
            .then(response => {
                if (!response.ok) {
                    alert('Failed to create Table, Try again later.')
                }
                return response.json();
            })
            .then(data => {
                settables([...tables, data] as any)
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
            fetch(url + '/api/service-shop/Table', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${yourToken}`
                },
                body: JSON.stringify({
                    'service_table_id': table_id
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
        fetch(url + '/api/service-shop/Table?service_shop_id=' + id, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${yourToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                settables(data);
            })
            .catch((error) => console.error('Error:', error));
    }, []);
    const [showform, setShowform] = useState(false);
    function open_creat_table_form() {
        setShowform(!showform);
    }

    // manu item create, delete, show
    const [manu_item, setManu_item] = useState('');
    const [manu_price, setManu_price] = useState('');
    const [manu_items, setManu_items] = useState([]);
    const [showmanuitemform, setShowmanuitemform] = useState(false);
    const [manu_category_1, setManu_category_1] = useState('');
    const [manu_category_2, setManu_category_2] = useState('')
    const [item_image, setItem_image] = useState<File | null>();
    function open_creat_manu_item_form() {
        setShowmanuitemform(!showmanuitemform);
    }
    function submit_manu_item() {
        // check if all fields are filled
        if (manu_item === '' || manu_price === '' || manu_description === '' || min_time === 0 || max_time === 0) {
            alert('Fill all fields')
            return
        }
        const form_data_manu_item = new FormData();
        form_data_manu_item.append('name', manu_item);
        form_data_manu_item.append('price', manu_price);
        form_data_manu_item.append('description', manu_description);
        form_data_manu_item.append('service_table', manu_category_1);
        form_data_manu_item.append('aprox_time_min', min_time.toString());
        form_data_manu_item.append('aprox_time_max', max_time.toString());
        if (item_image) {
            form_data_manu_item.append('image', item_image);
        }
        if (manu_category_1 === '') {
            alert('Select Category')
            return
        }
        let yourToken = localStorage.getItem('token');
        fetch(url + '/api/service-shop/services', {
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
            fetch(url + '/api/service-shop/services', {
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
        fetch(url + '/api/service-shop/services?service_table_id=' + manu_category_2, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${yourToken}`
            },
        })
            .then(response => {
                if (response.status === 401) {
                    navigate('/login')
                } else if (response.status === 200) {
                    return response.json()
                } else {
                    return null
                }
            })
            .then(data => {
                if (data) {
                    setManu_items(data);
                }
            })
            .catch((error) => console.error('Error:', error));
    }, [manu_category_2]);
    return (
        <Wrapper id="wrapper">
            <h1>Manage Shop <RoomPreferencesRoundedIcon /></h1>
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
                            <StyledSelect name="manu_category" id="manu_category" value={manu_category_2} onChange={e => setManu_category_2(e.target.value as any)} style={{
                                color: theme.colors.text,
                                backgroundColor: theme.colors.white,
                            }} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text }, border: `1px solid ${theme.colors.gray}` }}>
                                <MenuItem value="" style={{ backgroundColor: theme.colors.white, color: theme.colors.text }}><em>None</em></MenuItem>
                                {tables && tables.map((category: any) => (
                                    <MenuItem style={{ backgroundColor: theme.colors.white, color: theme.colors.text }} key={category.id} value={category.id}>{category.name}</MenuItem>
                                ))}
                            </StyledSelect>
                        </FormControl>
                        {manu_items && manu_items.map((item: any) => (
                            <div key={item.id} style={{
                                fontFamily: 'Roboto, sans-serif',
                            }}>
                                <StyledListItem>{item.name}</StyledListItem>
                                <StyledListItem >{item.price}</StyledListItem>
                                <StyledListItem >{item.description}</StyledListItem>
                                <StyledListItem >{item.veg ? 'Veg' : 'Non-veg'}</StyledListItem>
                                <label htmlFor={`switch${item.id}`}>Active</label>
                                <Switch id={`switch${item.id}`} name={'Active'} checked={item.active} onChange={() => Activate_manu_category_item(item.id, !item.active)} style={{
                                    color: theme.colors.text,
                                }}
                                    sx={{
                                        '& .MuiSwitch-switchBase': {
                                            color: theme.colors.text,
                                        },
                                        '& .Mui-checked': {
                                            color: theme.colors.text,
                                        },
                                        '& .MuiSwitch-track': {
                                            backgroundColor: theme.colors.gray,
                                        },

                                    }}
                                />
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
                                        {tables && tables.map((category: any) => (
                                            <MenuItem key={category.id} value={category.id} style={{ backgroundColor: theme.colors.white, color: theme.colors.text }}>{category.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <StyledTextField type="text" placeholder="Service" value={manu_item} onChange={e => setManu_item(e.target.value)} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text }, border: `1px solid ${theme.colors.gray}` }} />
                                <StyledTextField type="text" placeholder="Price" value={manu_price} onChange={e => setManu_price(e.target.value)} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text }, border: `1px solid ${theme.colors.gray}` }} />
                                <StyledTextField type="text" placeholder="Description" value={manu_description} onChange={e => setManu_description(e.target.value)} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text }, border: `1px solid ${theme.colors.gray}` }} />
                                <StyledTextField type="number" placeholder="Minimum Time" value={min_time} onChange={e => setMin_time(parseInt(e.target.value))} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text }, border: `1px solid ${theme.colors.gray}` }} />
                                <StyledTextField type="number" placeholder="Maximum Time" value={max_time} onChange={e => setMax_time(parseInt(e.target.value))} sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.text }, border: `1px solid ${theme.colors.gray}` }} />
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

export default create_table_shop