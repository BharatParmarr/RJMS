import GenericForm from './GenericForm';

const businessFields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'phone', label: 'Phone', type: 'text' },
    { name: 'email', label: 'Email', type: 'text' },
    { name: 'website', label: 'Website', type: 'text' },
    { name: 'logo', label: 'Logo', type: 'text' },
    { name: 'manager', label: 'Manager', type: 'text' },
    { name: 'active', label: 'Active', type: 'select', options: [{ value: true, label: 'Yes' }, { value: false, label: 'No' }] },
    { name: 'rating', label: 'Rating', type: 'text' },
    {
        name: 'business_type', label: 'Business Type', type: 'select', options: [
            { value: 'HOSP', label: 'Hospital' },
            { value: 'REST', label: 'Restaurant' },
            { value: 'CAFE', label: 'Cafe' },
            { value: 'HOTL', label: 'Hotel' },
            { value: 'SALN', label: 'Salon' },
            { value: 'SPA', label: 'Spa' },
            { value: 'STOR', label: 'Store' },
            { value: 'WASH', label: 'Car Wash' },
            { value: 'OTHR', label: 'Other' },
        ]
    },
];

const BusinessForm = ({ initialValues }: { initialValues: any }) => {
    return (
        <GenericForm
            fields={businessFields}
            endpoint="/businesses/"
            method={initialValues ? 'put' : 'post'}
            initialValues={initialValues}
        />
    );
};

export default BusinessForm;