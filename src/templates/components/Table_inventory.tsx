// File: ProductTable.js
import { ClassAttributes, HTMLAttributes, JSXElementConstructor, ReactElement, ReactNode, ReactPortal, TdHTMLAttributes, ThHTMLAttributes, useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import API_HOST from '../../config';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { JSX } from 'react/jsx-runtime';

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

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}: any) {
    const count = preGlobalFilteredRows.length;

    return (
        <span>
            Search:{' '}
            <input
                value={globalFilter || ''}
                onChange={e => {
                    setGlobalFilter(e.target.value || undefined);
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: '1.1rem',
                    border: '0',
                }}
            />
        </span>
    );
}

const ProductTable = ({ products, deleteProduct, token, id, setProducts }: any) => {
    const data = useMemo(() => products, [products]);

    const columns = useMemo(
        () => [
            {
                Header: 'Image',
                accessor: 'image',
                Cell: ({ cell: { value } }) => (
                    value && <img src={`${API_HOST}${value}`} alt="product" style={{ height: '50px' }} />
                )
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Quantity',
                accessor: 'quantity',
                Cell: ({ cell: { value } }) => (
                    <span style={{ color: value > 0 ? 'green' : 'red' }}>{value}</span>
                )
            },
            {
                Header: 'Price',
                accessor: 'price',
            },
            {
                Header: 'Updated Time',
                accessor: 'updated_time',
                Cell: ({ cell: { value } }) => (
                    new Date(value).toLocaleString()
                )
            },
            {
                Header: 'Actions',
                accessor: 'id',
                Cell: ({ row }) => (
                    <>
                        <Product_quntity_update token={token} product={row.original} id={id} products={products} setProducts={setProducts} />
                        <button onClick={() => deleteProduct({ productId: row.values.id, token })}>Delete</button>
                    </>
                )
            }
        ],
        [deleteProduct, token, id, products, setProducts]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy
    );

    return (
        <>
            <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ borderBottom: '1px solid black', padding: '10px' }}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row: { getRowProps: () => JSX.IntrinsicAttributes & ClassAttributes<HTMLTableRowElement> & HTMLAttributes<HTMLTableRowElement>; cells: any[]; }) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell: { getCellProps: () => JSX.IntrinsicAttributes & ClassAttributes<HTMLTableDataCellElement> & TdHTMLAttributes<HTMLTableDataCellElement>; render: (arg0: string) => string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
                                    <td {...cell.getCellProps()} style={{ borderBottom: '1px solid black', padding: '10px' }}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default ProductTable;