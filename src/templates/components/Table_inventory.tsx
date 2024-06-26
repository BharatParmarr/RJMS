import { useState, useMemo, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { Button, ListItemText } from '@mui/material';
import styled from 'styled-components';
import API_HOST from '../../config';
import { useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '../styles/theme';




const QuantityInput = styled.input`
    padding: 10px;
    margin-bottom: 10px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.text};
    border-radius: 5px;
    `
const ImageProduct = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5%;
    margin-right: 10px;
    `;

const QuintityButton = styled(Button)`
    padding: 10px;
    margin-bottom: 10px;
    `

// Styled Components
const Container = styled.div`
  padding: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledThead = styled.thead`
  background-color: #f9f9f9;
`;

const StyledTbody = styled.tbody`
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const StyledTr = styled.tr`
  color: ${({ theme }): any => theme.colors.text};

`;

const StyledTh = styled.th`
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  align-items: center;
    color: ${({ theme }): any => theme.colors.text};
    text-align: center;
    background-color: ${({ theme }): any => theme.colors.white};
`;

const StyledTd = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  color: ${({ theme }): any => theme.colors.text};
  background-color: ${({ theme }): any => theme.colors.white};
  align-items: center;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #dddddd20;
`;

const SortButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 5px;
  
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 8px;
`;


function TableHeader({ onSort }: any) {
    // const [columns_to_display, setColumns_to_display] = useState(['Image', 'Name', 'Quantity', 'Price', 'Updated Time', 'Actions']);
    let columns_to_display = ['Image', 'Name', 'Quantity', 'Price', 'Updated Time', 'Actions'];
    // const [is_columnes_shorteble, setIs_columnes_shorteble] = useState([false, true, true, true, true, false]);
    let is_columnes_shorteble = [false, true, true, true, true, false];
    const [current_state, setCurrent_state] = useState(['asc', 'asc', 'asc', 'asc', 'asc', 'asc']);
    const handel_short = (column: string) => {
        let index = columns_to_display.indexOf(column);
        let new_state = [...current_state];
        new_state[index] = current_state[index] === 'asc' ? 'desc' : 'asc';
        console.log(new_state, 'new_state');
        setCurrent_state(new_state);
        onSort((column).toLowerCase(), current_state[index]);
    }
    return (
        <StyledTr>
            {columns_to_display.map((column: string) => (
                <StyledTh key={column}>
                    {column}
                    {is_columnes_shorteble[columns_to_display.indexOf(column)] && <SortButton style={{
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        transform: current_state[columns_to_display.indexOf(column)] === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s'
                    }} onClick={() => handel_short(column)}>&#8593;</SortButton>}
                </StyledTh>
            ))}
        </StyledTr>
    );
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
            <QuintityButton onClick={() => updateProductQuantity({ productId: product.id, quantity: quantity_to_add_inventery, token })}>Update</QuintityButton>
        </>
    )
}


function ProductTable({ products, setProducts }: any) {
    let { id } = useParams();
    const { theme } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const token = localStorage.getItem('token');


    const handleSort = (newSortBy: string, newSortOrder: string) => {
        setSortBy(newSortBy);
        setSortOrder(newSortOrder === 'asc' ? 'asc' : 'desc');
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term.toLowerCase());
    };

    // Use useMemo to optimize performance for large datasets
    const filteredProducts = useMemo(() => {
        if (products === undefined) return [];
        return products.filter((product: { name: string; }) =>
            product.name.toLowerCase().includes(searchTerm)
        );
    }, [products, searchTerm]);

    const displayedProducts = useMemo(() => {
        if (!filteredProducts || filteredProducts.length === 0) return [];
        console.log(filteredProducts, 'filteredProducts');
        return filteredProducts.sort((a: { [x: string]: any; }, b: { [x: string]: any; }) => {
            let valueA = a[sortBy];
            let valueB = b[sortBy];

            if (valueA == null) valueA = '';
            if (valueB == null) valueB = '';

            if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }

            if (valueA < valueB) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [filteredProducts, sortBy, sortOrder]);
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
                    let newProductarray = products!.filter((product: { id: any; }) => product.id !== productId);
                    setProducts(newProductarray);
                }
            });
        }
    }

    return (
        <Container>
            <SearchInput
                type="text"
                placeholder="Search Products..."
                onChange={(e) => handleSearch(e.target.value)}
                style={{
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                    border: `1px solid ${theme.colors.text}`,
                    borderRadius: '5px',
                    padding: '10px',
                    marginBottom: '20px'

                }}
            />
            <StyledTable style={{
                borderCollapse: 'collapse',
                borderRadius: '15px',
            }}>
                <StyledThead>
                    {products && <TableHeader columns={Object.keys(products[0])} onSort={handleSort} />}
                </StyledThead>
                <StyledTbody>
                    {displayedProducts.map((product: { id: Key | null | undefined; image: string; name: string | undefined; quantity: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; price: any; updated_time: string | number | Date; }) => (
                        <StyledTr key={product.id}>
                            <StyledTd>{product.image && <ImageProduct src={API_HOST + product.image} alt={product.name} />}</StyledTd>
                            <StyledTd>
                                {product.name && product.name.length > 20 ? <ListItemText primary={product.name.slice(0, 20) + '...'} /> : <ListItemText primary={`${product.name}`} />}

                            </StyledTd>
                            <StyledTd>
                                <ListItemText primary={product.quantity} />
                            </StyledTd>
                            <StyledTd><ListItemText primary={product.price} /></StyledTd>
                            <StyledTd><ListItemText primary={new Date(product.updated_time).toLocaleString('en-US', options_for_time)} /></StyledTd>
                            <StyledTd><Product_quntity_update token={token} product={product} id={id} products={products} setProducts={setProducts} /></StyledTd>
                            <StyledTd><DeleteButton onClick={() => deleteProduct({ productId: product.id, token })}><DeleteIcon /></DeleteButton></StyledTd>
                        </StyledTr>
                    ))}
                </StyledTbody>
            </StyledTable>
        </Container>
    );
}

let options_for_time = {
    // timeStyle: 'short',
    dateStyle: 'short',
}

export default ProductTable;
