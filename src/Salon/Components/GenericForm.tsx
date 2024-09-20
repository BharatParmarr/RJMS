import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Button, Select, DatePicker, TimePicker } from 'antd';
import styled from 'styled-components';
import { Salon_apis } from '../../apis';

const { Option } = Select;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const GenericForm = ({ fields, endpoint, method = 'post', initialValues = {} }: { fields: any, endpoint: string, method?: string, initialValues?: any }) => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: initialValues,
    });
    console.log(method);
    const onSubmit = async (data: any) => {
        try {
            const response = await Salon_apis.post(endpoint, data);
            console.log('Success:', response.data);
            reset();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <FormContainer>
            <Form onFinish={handleSubmit(onSubmit)}>
                {fields.map((field: { name: string; label: string; type: string; options: { value: string; label: string }[] }) => (
                    <Form.Item key={field.name} label={field.label}>
                        <Controller
                            name={field.name as string}
                            control={control}
                            render={({ field }: { field: any }) => {
                                switch (field.type) {
                                    case 'text':
                                        return <Input {...field} />;
                                    case 'select':
                                        return (
                                            <Select {...field}>
                                                {field.options.map((option: { value: string; label: string }) => (
                                                    <Option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </Option>
                                                ))}
                                            </Select>
                                        );
                                    case 'date':
                                        return <DatePicker {...field} />;
                                    case 'time':
                                        return <TimePicker {...field} />;
                                    default:
                                        return <Input {...field} />;
                                }
                            }}
                        />
                    </Form.Item>
                ))}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </FormContainer>
    );
};

export default GenericForm;