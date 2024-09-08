import { Form, Input, Button, DatePicker, Select } from 'antd';
import apis from '../../apis';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    padding: 20px;
    min-height: 100vh;
    animation: fadeIn 0.5s ease-in-out;

    // onmount animation
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
`;

const StyledHeading = styled.h2`
    color: ${({ theme }) => theme.colors.text};
    font-size: 24px;
    margin-bottom: 20px;
`;

const StyledForm = styled(Form)`
    background-color: ${({ theme }) => theme.colors.white};
    padding: 20px;
    border-radius: 10px;

    .ant-form-item {
        margin-bottom: 15px;
    }

    .ant-form-item-label > label {
        color: ${({ theme }) => theme.colors.text};
    }

    .ant-form-item-control {
        color: ${({ theme }) => theme.colors.text};
    }

    .ant-form-item-control-input-content {
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};

        .ant-input {
            background-color: ${({ theme }) => theme.colors.background};
            color: ${({ theme }) => theme.colors.text};
        }
    }

    .ant-form-item-control-input-content {
        color: ${({ theme }) => theme.colors.text};
    }

    .ant-select {
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};

        .ant-select-selector {
            background-color: ${({ theme }) => theme.colors.background};
            color: ${({ theme }) => theme.colors.text};
        }
    }

    .ant-picker {
        background-color: ${({ theme }) => theme.colors.background};
        color: ${({ theme }) => theme.colors.text};

        .ant-picker-input > input {
            color: ${({ theme }) => theme.colors.text};
        }

        .ant-picker-suffix {
            color: ${({ theme }) => theme.colors.text};
        }
    }

    .ant-btn {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
    }

    .ant-btn:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.white};
    }
`;

const { Option } = Select;

const StaffForm = ({ onSubmit }: { onSubmit: any }) => {
    const [form] = Form.useForm();

    // set urls according to the type of business
    const { type_page, sub_id } = useParams();
    let url_set = '';
    if (type_page === 'hospital') {
        url_set = 'hospital-staff'
    } else if (type_page === 'restorant') {
        url_set = 'restorant-staff'
    }


    const onFinish = async (values: any) => {
        const date = new Date(values.joining_date).toISOString().split('T')[0];
        console.log(values);
        values.joining_date = date;
        if (type_page === 'hospital') {
            values.hospital = sub_id;
        } else if (type_page === 'restorant') {
            values.restorant = sub_id;
        }

        console.log(values);
        let res = await apis.post(`/${url_set}/?${type_page}=${sub_id}`, values);
        console.log(res);
        if (res.status === 201) {
            onSubmit(form.getFieldsValue());
            form.resetFields();
        }
    };

    return (
        <StyledContainer>
            <StyledHeading>Add Staff</StyledHeading>
            <StyledForm form={form} onFinish={onFinish}>
                <Form.Item name="user" label="User Id" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="shift_time" label="Shift Time" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="salary" label="Salary" rules={[{ required: true }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="joining_date" label="Joining Date" rules={[{ required: true }]}>
                    <DatePicker
                        format="YYYY-MM-DD"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item name="is_active" label="Active" initialValue={true}>
                    <Select>
                        <Option value={true}>Yes</Option>
                        <Option value={false}>No</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </StyledForm>
        </StyledContainer>
    );
};

export default StaffForm;