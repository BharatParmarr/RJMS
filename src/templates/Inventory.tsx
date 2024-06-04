import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import API_HOST from "../config"; import styled from 'styled-components';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { useTheme } from "./styles/theme";

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

const ProductItem = styled(ListItem)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: all 0.3s ease;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
    border: 1px solid ${({ theme }) => theme.colors.text}50;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
    &:hover {
        box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary}80;
    }

    @media (max-width: 768px) {
        padding: 10px;
        flex-direction: column;
    }
`;
const ImageProduct = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5%;
    margin-right: 10px;
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

const QuantityInput = styled.input`
    padding: 10px;
    margin-bottom: 10px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.text};
    border-radius: 5px;
    `

const QuintityButton = styled(Button)`
    padding: 10px;
    margin-bottom: 10px;

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

function Product_quntity_update({ token, product, id, setProducts, products }: any) {
    const [quantity_to_add_inventery, setQuantity_to_add_inventery] = useState<number>();

    // Update Product Quantity
    const updateProductQuantity = async ({ productId, quantity, token }: any) => {
        if (quantity === undefined) {
            alert('Please enter quantity');
            return;
        }
        const response = await fetch(`${API_HOST}/api/product/${productId}?restorant_id=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({ quantity: quantity })
        });

        if (response.status === 200) {
            // alert('Quantity Updated');
            let newProductarray = [...products];
            let index = newProductarray.findIndex((product) => product.id === productId);
            newProductarray[index].quantity = quantity;
            setProducts(newProductarray);
        }
    }
    return (
        <>
            <QuantityInput type="number" name="quantity" id="quantity" placeholder="Quantity" onChange={(e) => {
                setQuantity_to_add_inventery(parseInt((e.target.value)));
            }} />
            <QuintityButton onClick={() => updateProductQuantity({ productId: product.id, quantity: quantity_to_add_inventery, token })}>Update Quantity</QuintityButton>
        </>
    )
}

function Inventory() {
    const { theme } = useTheme();
    // Get Token
    let { id } = useParams();
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

        await fetch(API_HOST + '/api/product?restorant_id=' + id, {
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

    // Delete Product
    const deleteProduct = async ({ productId, token }: any) => {

        if (window.confirm('Are you sure you want to delete this product?')) {
            const response = await fetch(`${API_HOST}/api/product`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({ product_id: productId })
            });
            response.json().then(data => {
                console.log(data);
                if (data.message === 'Product deleted') {
                    let newProductarray = products!.filter((product) => product.id !== productId);
                    setProducts(newProductarray);
                }
            });
        }
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

    useEffect(() => {
        // Get Product List
        const getProductList = async () => {
            const response = await fetch(`${API_HOST}/api/product?restorant_id=${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            return response.json();
        }

        getProductList().then(data => {
            console.log(data, token);
            if (data.length > 0) {
                setProducts(data);
            }
        });
    }, [])
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
            <Typography variant="h5">Products</Typography>
            <ProductList>
                {products && products.map((product, index) => (
                    <ProductItem key={index}>
                        {product.image && <ImageProduct src={API_HOST + product.image} alt={product.name} />}
                        <ListItemText primary={`${product.name}`} />
                        <ListItemText style={{
                            color: product.quantity > 0 ? 'green' : 'red'
                        }} primary={product.quantity} />
                        <ListItemText primary={`Price: ${product.price}`} />
                        <ListItemText primary={new Date(product.updated_time).toLocaleString()} />
                        <Product_quntity_update token={token} product={product} id={id} products={products} setProducts={setProducts} />
                        <Button onClick={() => deleteProduct({ productId: product.id, token })}>Delete</Button>
                    </ProductItem>
                ))}
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
        </Container>
    )
}

export default Inventory