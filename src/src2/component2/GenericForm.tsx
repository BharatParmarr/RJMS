import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextField, Checkbox, FormControlLabel } from '@mui/material';
import { useTheme } from '../../templates/styles/theme';
import PersonIcon from '@mui/icons-material/Person';

const FormContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
  margin: 20px 0;
`;

const MainForm = styled.form`
  display: flex;
  flex-direction: column;


    @keyframes shake {
        0% { transform: translateX(0); }
        20% { transform: translateX(-10px); }
        40% { transform: translateX(10px); }
        60% { transform: translateX(-10px); }
        80% { transform: translateX(10px); }
        100% { transform: translateX(0); }
    }
`;

const Input = styled(TextField)`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};

`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const MuiCheckbox = styled(Checkbox)`
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
    `;

const MuiFormControlLabel = styled(FormControlLabel)`
    padding: 10px;
    margin: 10px 0;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.gray};
    border: 1px solid #ccc;
    border-radius: 5px;
    `;


type Field = {
    name: string;
    type: string;
    placeholder: string;
    hidden?: boolean;
    value?: any;
};

type GenericFormProps = {
    fields: Field[];
    initialData: { [key: string]: any };
    onSubmit: (data: { [key: string]: any }) => void;
};

const GenericForm: React.FC<GenericFormProps> = ({ fields, initialData, onSubmit }) => {
    const [formData, setFormData] = useState(initialData);
    const { theme } = useTheme();

    useEffect(() => {
        setFormData(initialData);
        // shake the input fields
        const inputs = document.querySelector('form');
        if (inputs) {
            inputs.style.animation = 'shake 0.5s';
            setTimeout(() => {
                inputs.style.animation = '';
            }, 500);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files, 'e.target.files');
        if (e.target.files) {
            const file = e.target.files[0];
            setFormData({
                ...formData,
                [e.target.name]: file,
            });
        } else {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let data = formData;
        // loop on fields and add all the hidden fields to the formData
        fields.forEach((field) => {
            if (field.hidden) {
                data = {
                    ...data,
                    [field.name]: field.value,
                };
            }
        });
        onSubmit(data);
    };

    return (
        <FormContainer>
            <MainForm onSubmit={handleSubmit}>
                {fields.map((field: { name: React.Key | null | undefined; type: string | (string & {}) | undefined; placeholder: string | undefined; hidden?: boolean; value?: any }) => (
                    <span key={field.name}
                        style={{
                            marginBottom: '10px',
                            display: 'block'
                        }}
                    >
                        {field.type == 'file' ?
                            <>
                                <>
                                    {!field.hidden && <Input
                                        type={field.type}
                                        name={field.name?.toString()}
                                        onChange={handleChange}
                                        label={field.placeholder}
                                        sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.gray }, border: `1px solid ${theme.colors.gray}` }}
                                    />}
                                </>
                                {/* if image is there then display it else display profile icon of mui */}
                                {!field.hidden && <>
                                    {formData[field.name as any] ? <>
                                        {typeof (formData[field.name as any]) === 'string' ? <img src={formData[field.name as any]} alt={field.placeholder} style={{ width: 200, height: 200 }} />
                                            : <img src={URL.createObjectURL(formData[field.name as any])} alt={field.placeholder} style={{ width: 200, height: 200 }} />}
                                    </>
                                        : <PersonIcon sx={{ width: 200, height: 200, color: theme.colors.gray }} />
                                    }
                                </>}
                            </>
                            : <>
                                {field.type == 'checkbox' ?
                                    <>
                                        <>{!field.hidden && <MuiFormControlLabel control={<MuiCheckbox
                                            name={field.name?.toString()}
                                            checked={formData[field.name as any] || false}
                                            onChange={handleCheckboxChange}
                                            sx={{
                                                input: { color: theme.colors.text }, label: { color: theme.colors.text },
                                                border: `1px solid ${theme.colors.gray}`,
                                                borderRadius: '5px',
                                                margin: '0 10px '
                                            }}
                                        />} label={field.placeholder} />}</>
                                    </>
                                    :
                                    <>{!field.hidden && <Input
                                        type={field.type}
                                        name={field.name?.toString()}
                                        value={formData[field.name as any] || ''}
                                        onChange={handleChange}
                                        label={field.placeholder}
                                        sx={{ input: { color: theme.colors.text }, label: { color: theme.colors.gray }, border: `1px solid ${theme.colors.gray}` }}
                                    />}</>
                                }</>}</span>
                ))}
                <Button type="submit">Submit</Button>
            </MainForm>
        </FormContainer>
    );
};

export default GenericForm;