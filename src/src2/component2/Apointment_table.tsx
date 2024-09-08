import { useState, useMemo } from 'react';
import { TableInstance, useTable } from 'react-table';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
const CompleteButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    color: '#fff';
    border: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
`;

const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;

    @media (max-width: 768px) {
        table {
            width: 100%;
            display: block;
            overflow-x: auto;
            white-space: nowrap;
        }

        th, td {
            text-align: left;
            padding: 8px;
            box-sizing: border-box;
        }
        tr{
            margin-bottom: 10px;
            border: 1px solid #f4f4f4;
            width: 100%;
        }
        th {
            background: #f4f4f4;
        }
            tbody {
                width: 100%;
                display: block;
                align-items: center;
                justify-content: center;
            }
    }
`;

const StyledButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    color: '#fff';
    border: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
`;

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    bgcolor: 'background.paper';
    border: '2px solid #000';
    boxShadow: 24;
`;

const StyledDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const StyledDetailsText = styled.p`
    font-size: 16px;
    font-weight: 500;
    color: #000;
`;
declare const window: any;

const BillInvoicePdf = (appointment: any) => {
    function generatePDF() {
        if (!window.jspdf) {
            alert('Please wait for the PDF library to load');
            return;
        }
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // ... (keep the existing PDF content generation code)
        // Set colors
        const primaryColor = '#3366cc';
        const secondaryColor = '#666666';

        // Add logo (replace with your actual logo)
        // doc.addImage('path/to/your/logo.png', 'PNG', 10, 10, 50, 20);

        // Add Title
        doc.setFontSize(24);
        doc.setTextColor(primaryColor);
        doc.setFont('helvetica', 'bold');
        doc.text('INVOICE', 105, 30, { align: 'center' });

        // Add Company Information
        doc.setFontSize(10);
        doc.setTextColor(secondaryColor);
        doc.setFont('helvetica', 'normal');
        doc.text('Bizwayn', 200, 20, { align: 'right' });
        doc.text('Ahmedabad', 200, 25, { align: 'right' });
        doc.text('Gujarat 380015', 200, 30, { align: 'right' });
        doc.text('Phone: **********', 200, 35, { align: 'right' });
        doc.text('Email: Bizwayn.com@gmail.com', 200, 40, { align: 'right' });

        // Add Invoice Details
        doc.setFontSize(10);
        doc.setTextColor(secondaryColor);
        doc.text(`Invoice Number: INV-${appointment.id.toString().padStart(6, '0')}`, 10, 50);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 55);

        // Add Patient Details
        doc.setFontSize(12);
        doc.setTextColor(primaryColor);
        doc.setFont('helvetica', 'bold');
        doc.text('Bill To:', 10, 70);
        doc.setFontSize(10);
        doc.setTextColor(secondaryColor);
        doc.setFont('helvetica', 'normal');
        doc.text(`${appointment.patient_name}`, 10, 75);
        doc.text(`Email: ${appointment.patient_email}`, 10, 80);
        doc.text(`Phone: ${appointment.patient_phone}`, 10, 85);

        // Add Appointment Details
        doc.setFontSize(12);
        doc.setTextColor(primaryColor);
        doc.setFont('helvetica', 'bold');
        doc.text('Appointment Details', 10, 100);
        doc.setFontSize(10);
        doc.setTextColor(secondaryColor);
        doc.setFont('helvetica', 'normal');
        doc.text(`Appointment For: ${appointment.appointment_for}`, 10, 105);
        doc.text(`Date: ${appointment.date}`, 10, 110);
        doc.text(`Time: ${appointment.time}`, 10, 115);
        doc.text(`Queue Number: ${appointment.que_number}`, 10, 120);

        // Add Table for Services
        doc.setFontSize(12);
        doc.setTextColor(primaryColor);
        doc.setFont('helvetica', 'bold');
        doc.text('Services', 10, 135);

        // Table headers
        doc.setFillColor(240, 240, 240);
        doc.rect(10, 140, 190, 10, 'F');
        doc.setTextColor(secondaryColor);
        doc.text('Description', 15, 147);
        doc.text('Amount', 180, 147, { align: 'right' });

        // Table content
        doc.setFont('helvetica', 'normal');
        doc.text(appointment.appointment_for, 15, 157);
        doc.text(`$${appointment.custom_fees.toFixed(2)}`, 180, 157, { align: 'right' });

        // Total
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Total:', 150, 170);
        doc.text(`$${appointment.custom_fees.toFixed(2)}`, 180, 170, { align: 'right' });

        // Add Footer
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(secondaryColor);
        doc.text('Thank you for your business!', 105, 250, { align: 'center' });
        doc.text('Please contact us if you have any questions about this invoice.', 105, 255, { align: 'center' });

        // Add Border
        doc.setDrawColor(primaryColor);
        doc.setLineWidth(0.5);
        doc.rect(5, 5, 200, 287);
        // Instead of opening a new window, create a blob and embed it in the current page
        const pdfBlob = doc.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Create a modal dialog to display the PDF
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '9999';

        const iframe = document.createElement('iframe');
        iframe.style.width = '80%';
        iframe.style.height = '90%';
        iframe.style.border = 'none';
        iframe.src = pdfUrl;

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.padding = '5px 10px';
        closeButton.style.backgroundColor = '#fff';
        closeButton.style.border = '1px solid #000';
        closeButton.style.borderRadius = '5px';
        closeButton.style.cursor = 'pointer';

        closeButton.onclick = () => {
            document.body.removeChild(modal);
            URL.revokeObjectURL(pdfUrl);
        };

        modal.appendChild(iframe);
        modal.appendChild(closeButton);
        document.body.appendChild(modal);

        // Add print button
        const printButton = document.createElement('button');
        printButton.textContent = 'Print';
        printButton.style.position = 'absolute';
        printButton.style.top = '10px';
        printButton.style.right = '80px';
        printButton.style.padding = '5px 10px';
        printButton.style.backgroundColor = '#fff';
        printButton.style.border = '1px solid #000';
        printButton.style.borderRadius = '5px';
        printButton.style.cursor = 'pointer';

        printButton.onclick = () => {
            if (!iframe.contentWindow) {
                alert('Please wait for the PDF to load');
                return;
            }
            iframe.contentWindow.print();
        };

        modal.appendChild(printButton);
    }
    generatePDF();
};

const AppointmentsTable = ({ columns, data, MarkAppointmentComplete }: any) => {
    console.log(data, 'data');
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.async = true;
    document.body.appendChild(script);
    // State for search input
    const [searchInput, setSearchInput] = useState('');

    // Filter data based on the search input
    const filteredData = useMemo(() => {
        if (!searchInput) return data;

        return data.filter((row: { [x: string]: any; }) => {
            return columns.some((column: { accessor: string | number; }) => {
                const cellValue = row[column.accessor];
                if (cellValue) {
                    return String(cellValue).toLowerCase().includes(searchInput.toLowerCase());
                }
                return false;
            });
        });
    }, [searchInput, data, columns]);

    // Create table instance
    const tableInstance = useTable({
        columns,
        data: filteredData,
    });

    interface RowOriginal {
        id: number;
    }
    // Render table
    const renderTable = (tableInstance: TableInstance<{}>) => (
        <table {...tableInstance.getTableProps()} style={{ width: '100%', marginTop: 10 }}>
            <thead>
                {tableInstance.headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()} style={{ textAlign: 'left', padding: '8px' }} key={column.id}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...tableInstance.getTableBodyProps()}>
                {tableInstance.rows.map((row) => {
                    tableInstance.prepareRow(row);
                    return (
                        <tr style={{
                            height: '70px',
                        }}  {...row.getRowProps()} key={row.id}>
                            {row.cells.map((cell) => (
                                <td {...cell.getCellProps()} style={{ padding: '8px' }} key={cell.column.id}>
                                    {cell.render('Cell')}
                                </td>
                            ))}
                            {/* object to bill invoice pdf button */}
                            <td>
                                <StyledButton onClick={() => {
                                    let id = (row.original as RowOriginal);
                                    BillInvoicePdf(id)
                                }}>
                                    <span style={{ color: '#fff' }}>Invoice</span>
                                </StyledButton>
                            </td>
                            <td >
                                {row.values.appointment_status === 'Pending' ? (<CompleteButton
                                    onClick={() => {
                                        let id = (row.original as RowOriginal).id;
                                        MarkAppointmentComplete(id, row.values.appointment_type)
                                    }}
                                    style={{ border: 'none', cursor: 'pointer' }}
                                >
                                    <TaskAltIcon style={{ color: '#fff', fontSize: 20 }} />
                                </CompleteButton>) : null}
                            </td>
                            {/* more details button, opens a modal with more details */}
                            <td>
                                <StyledButton onClick={() => {
                                    handleOpenDetailsModal(row.original)
                                }}>
                                    <InfoIcon style={{ color: '#fff', fontSize: 20 }} />
                                </StyledButton>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [detailsModalData, setDetailsModalData] = useState({
        patient_name: 'N/A',
        patient_email: 'N/A',
        patient_phone: 'N/A',
        patient_Details: 'N/A',
        custom_fees: 'N/A',
        appointment_for: 'N/A',
        date: 'N/A',
        time: 'N/A',
        appointment_type: 'N/A',
        appointment_status: 'N/A',
    });

    const handleOpenDetailsModal = (data: any) => {
        setDetailsModalData(data);
        setOpenDetailsModal(true);
    }

    const handleCloseDetailsModal = () => {
        setOpenDetailsModal(false);
        setDetailsModalData({
            patient_name: 'N/A',
            patient_email: 'N/A',
            patient_phone: 'N/A',
            patient_Details: 'N/A',
            custom_fees: 'N/A',
            appointment_for: 'N/A',
            date: 'N/A',
            time: 'N/A',
            appointment_type: 'N/A',
            appointment_status: 'N/A',
        });
    }
    return (
        <div>
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
            />
            <TableContainer>
                {renderTable(tableInstance)}
            </TableContainer>
            {/* more details modal */}
            <Modal
                open={openDetailsModal}
                onClose={handleCloseDetailsModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <StyledBox sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    padding: '20px',
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Details
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {/* patient details */}
                        <StyledDetails>
                            <StyledDetailsText>Patient Name: {detailsModalData.patient_name}</StyledDetailsText>
                            <StyledDetailsText>Patient Email: {detailsModalData.patient_email}</StyledDetailsText>
                            <StyledDetailsText>Patient Phone: {detailsModalData.patient_phone}</StyledDetailsText>
                            <StyledDetailsText>Patient Details: {detailsModalData.patient_Details}</StyledDetailsText>
                            <StyledDetailsText>Fees: {detailsModalData.custom_fees}</StyledDetailsText>
                            <StyledDetailsText>Appointment For: {detailsModalData.appointment_for}</StyledDetailsText>
                            <StyledDetailsText>Appointment Date: {detailsModalData.date}</StyledDetailsText>
                            <StyledDetailsText>Appointment Time: {detailsModalData.time}</StyledDetailsText>
                            <StyledDetailsText>Appointment Type: {detailsModalData.appointment_type}</StyledDetailsText>
                            <StyledDetailsText>Appointment Status: {detailsModalData.appointment_status}</StyledDetailsText>
                        </StyledDetails>
                    </Typography>
                </StyledBox>
            </Modal>
        </div>
    );
};

export default AppointmentsTable;
