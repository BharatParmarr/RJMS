// import React, { useState } from 'react';
// import {
//     Paper, Typography, TextField, Select, MenuItem,
//     Button, Grid, FormControl, InputLabel, Switch,
//     FormControlLabel, Snackbar
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { motion } from 'framer-motion';

// const StyledPaper = styled(Paper)(({ theme }) => ({
//     padding: theme.spacing(3),
//     marginBottom: theme.spacing(3),
// }));

// const StyledForm = styled('form')(({ theme }) => ({
//     display: 'flex',
//     flexDirection: 'column',
//     gap: theme.spacing(2),
// }));

// interface Field {
//     name: string;
//     label: string;
//     type: 'text' | 'number' | 'email' | 'date' | 'select' | 'switch' | 'textarea';
//     options?: { value: string; label: string }[];
//     required?: boolean;
// }

// interface EducationFormProps {
//     title: string;
//     fields: Field[];
//     onSubmit: (data: any) => void;
//     initialData?: any;
// }

// const EducationForm: React.FC<EducationFormProps> = ({ title, fields, onSubmit, initialData = {} }) => {
//     const [formData, setFormData] = useState(initialData);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');

//     const handleChange = (name: string, value: any) => {
//         setFormData((prevData: any) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         onSubmit(formData);
//         setSnackbarMessage('Form submitted successfully!');
//         setSnackbarOpen(true);
//     };

//     const renderField = (field: Field) => {
//         switch (field.type) {
//             case 'text':
//             case 'number':
//             case 'email':
//                 return (
//                     <TextField
//                         fullWidth
//                         label={field.label}
//                         name={field.name}
//                         type={field.type}
//                         value={formData[field.name] || ''}
//                         onChange={(e) => handleChange(field.name, e.target.value)}
//                         required={field.required}
//                     />
//                 );
//             case 'date':
//                 return (
//                     // <LocalizationProvider dateAdapter={AdapterDateFns}>
//                     //     <DatePicker
//                     //         label={field.label}
//                     //         value={formData[field.name] || null}
//                     //         onChange={(date) => handleChange(field.name, date)}
//                     //         renderInput={(params: any) => <TextField {...params} fullWidth required={field.required} />}
//                     //     />
//                     // </LocalizationProvider>
//                     <div>date</div>
//                 );
//             case 'select':
//                 return (
//                     <FormControl fullWidth required={field.required}>
//                         <InputLabel>{field.label}</InputLabel>
//                         <Select
//                             value={formData[field.name] || ''}
//                             onChange={(e) => handleChange(field.name, e.target.value)}
//                             label={field.label}
//                         >
//                             {field.options?.map((option) => (
//                                 <MenuItem key={option.value} value={option.value}>
//                                     {option.label}
//                                 </MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                 );
//             case 'switch':
//                 return (
//                     <FormControlLabel
//                         control={
//                             <Switch
//                                 checked={formData[field.name] || false}
//                                 onChange={(e) => handleChange(field.name, e.target.checked)}
//                                 name={field.name}
//                             />
//                         }
//                         label={field.label}
//                     />
//                 );
//             case 'textarea':
//                 return (
//                     <TextField
//                         fullWidth
//                         multiline
//                         rows={4}
//                         label={field.label}
//                         name={field.name}
//                         value={formData[field.name] || ''}
//                         onChange={(e) => handleChange(field.name, e.target.value)}
//                         required={field.required}
//                     />
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//         >
//             <StyledPaper elevation={3}>
//                 <Typography variant="h5" gutterBottom>
//                     {title}
//                 </Typography>
//                 <StyledForm onSubmit={handleSubmit}>
//                     <Grid container spacing={2}>
//                         {fields.map((field) => (
//                             <Grid item xs={12} sm={6} key={field.name}>
//                                 {renderField(field)}
//                             </Grid>
//                         ))}
//                     </Grid>
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         size="large"
//                         style={{ marginTop: '1rem' }}
//                     >
//                         Submit
//                     </Button>
//                 </StyledForm>
//             </StyledPaper>
//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={6000}
//                 onClose={() => setSnackbarOpen(false)}
//                 message={snackbarMessage}
//             />
//         </motion.div>
//     );
// };

// export default EducationForm;
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import styled from 'styled-components';

const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 4px 8px ${({ theme }) => theme.colors.shadow};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;


  .MuiFormControl-root {
    margin-bottom: 10px;
    }
    .MuiButton-root {
        margin-top: 20px;
    }
    input {
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};
    }
    label {
        color: ${({ theme }) => theme.colors.text};
    }
`;

const StyledController = styled(Controller)`
    width: 47%;
`;

interface GeneralFormProps {
    fields: { name: string; label: string; type: string }[];
    onSubmit: (data: any) => void;
    defaultValues?: any;
}

const GeneralForm: React.FC<GeneralFormProps> = ({ fields, onSubmit, defaultValues }) => {
    const { handleSubmit, control } = useForm({ defaultValues });

    return (
        <FormContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((field) => (
                    <StyledController
                        key={field.name}
                        name={field.name}
                        control={control}
                        render={({ field: { ref, ...fieldProps } }) => (
                            <TextField
                                {...fieldProps}
                                label={field.label}
                                type={field.type}
                                fullWidth
                                variant="outlined"
                            />
                        )}
                    />
                ))}
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </FormContainer>
    );
};

export default GeneralForm;