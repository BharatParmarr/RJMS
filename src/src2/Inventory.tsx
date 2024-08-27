import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import API_HOST from "../config"; import styled from 'styled-components';
import { Typography, List, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { useTheme } from "../templates/styles/theme";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import ProductTable from "./component2/Table_inventory";

const Container = styled(motion.div)`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled(Typography)`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

const ProductList = styled(List)`
  margin-bottom: 20px;
`;

const Inputstyled = styled.input`
    padding: 10px;
    margin-bottom: 10px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
    `

const BootstrapDialog = styled(Dialog)(() => ({
    '& .MuiDialogContent-root': {
        padding: '20px',
    },
    '& .MuiDialogActions-root': {
        padding: '20px',
    },
}));

const FormHolderdiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 768px) {
        padding: 10px;
    }
    `

function Product_creqte_form({ setProductname, setProductprice, setProductdiscription, setProductImage }: any) {
    const { theme } = useTheme();
    return (
        <FormHolderdiv style={{
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            borderRadius: '10px',
            padding: '20px',
        }}>
            <Inputstyled type="text" name="name" id="name" placeholder="Product Name" onChange={(e) => {
                setProductname(e.target.value);
            }} />
            <Inputstyled type="number" name="price" id="price" placeholder="Product Price" onChange={(e) => {
                setProductprice(parseInt(e.target.value));
            }} />
            <Inputstyled type="text" name="description" id="description" placeholder="Product Description" onChange={(e) => {
                setProductdiscription(e.target.value);
            }} />
            {/* image input filed */}
            <Inputstyled type="file" name="Product Image" id="image" onChange={(e) => {
                setProductImage(e.target.files);
            }} />
        </FormHolderdiv>
    )
}

function Inventory2() {
    const { theme } = useTheme();
    // Get Token
    let { id, sub_id } = useParams();
    const token = localStorage.getItem('token');
    const [productname, setProductname] = useState<string>();
    const [productprice, setProductprice] = useState<number>();
    const [productdiscription, setProductdiscription] = useState<string>();
    const [productImage, setProductImage] = useState<FileList | null>();
    // Create Product
    const createProduct = async (products: { name: string; price: number; id: number; quantity: number; updated_time: string; image?: string | undefined; }[] | undefined) => {
        let form_data = new FormData();
        if (productname === undefined || productprice === undefined || productdiscription === undefined || id === undefined) {
            alert('Please Fill all the fields or reload the page and try again.');
            return;
        }
        console.log(productImage);
        if (productImage === null || productImage === undefined) {
            form_data.append('name', productname);
            form_data.append('price', productprice.toString());
            form_data.append('description', productdiscription);
            form_data.append('restorant', id);
        } else {
            form_data.append('name', productname);
            form_data.append('price', productprice.toString());
            form_data.append('description', productdiscription);
            form_data.append('restorant', id);
            form_data.append('image', productImage![0]);
        }

        await fetch(API_HOST + `/api2/req/Inventory/${id}/${sub_id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`
            },
            body: form_data
        }).then(response => response.json())
            .then(data => {
                // console.log('Success:', data);
                if (!products) {
                    products = [];
                }
                let newProductarray = [...products];
                newProductarray.push(data);
                setProducts(newProductarray);
                handleClose();
            })
            .catch((error) => console.error('Error:', error));
    }


    type Product = {
        name: string,
        price: number,
        id: number,
        quantity: number,
        updated_time: string,
        image?: string
    }

    const [products, setProducts] = useState<Product[]>();
    const [page, setPage] = useState<number>(1);
    const [isPageRemaining, setIsPageRemaining] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        if (!isPageRemaining) return;
        // Get Product List
        setLoading(true);
        const getProductList = async () => {
            const response = await fetch(`${API_HOST}/api2/req/Inventory/${id}/${sub_id}?page=${page}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            if (!response.ok) {
                return {
                    results: []
                }
            }
            return response.json();
        }

        getProductList().then(data => {
            console.log(data, token);
            data = data.results
            if (data.length > 0) {
                setProducts(products ? [...products, ...data] : data)
            } else {
                setIsPageRemaining(false);
            }

        }).finally(() => {
            setLoading(false);
        });
    }, [page])
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Title variant="h4">Inventory</Title>
            <ProductList>
                {products && products?.length > 0 && <ProductTable
                    products={products}
                    setProducts={setProducts}
                />}
                {isPageRemaining && <Button onClick={() => setPage(page + 1)}>Load More</Button>}
            </ProductList>
            {/* product create form */}
            <br />
            <br />
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Create Product
                </Button>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" style={{
                        backgroundColor: theme.colors.background,
                        color: theme.colors.text,
                    }}>
                        Create Product
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers style={{
                        backgroundColor: theme.colors.background,
                        color: theme.colors.text,
                    }}>
                        <Product_creqte_form setProductname={setProductname} setProductprice={setProductprice} setProductdiscription={setProductdiscription} setProductImage={setProductImage} />
                    </DialogContent>
                    <DialogActions style={{
                        backgroundColor: theme.colors.background,
                        color: theme.colors.text,
                    }}>
                        <Button autoFocus onClick={() => createProduct(products)}>
                            Create Product
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </React.Fragment>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            ><CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    )
}

export default Inventory2