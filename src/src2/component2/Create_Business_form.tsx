import { useState } from 'react';
import apis from '../../apis'; // Import the APIs module
import { FormContainer, FormTitle, InputField, TextArea, Button, Image_priview, Container } from './Form_styled'; // Import styled components
// import { useParams } from 'react-router-dom';

const Create_Business_form = () => {
    // const { type } = useParams();
    const [step, setStep] = useState(1);
    type BusinessDatatype = {
        name: string;
        address: string;
        phone: string;
        email: string;
        website: string;
        logo: any;
    }
    const [businessData, setBusinessData] = useState<BusinessDatatype>({
        name: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        logo: null,
    });
    const [hospitalData, setHospitalData] = useState({
        number_of_beds: '',
        number_of_rooms: '',
        specialties: '',
        facilities_available: '',
        opening_hours: '',
    });

    const handleBusinessChange = (e: { target: { name: any; value: any; }; }) => {
        setBusinessData({ ...businessData, [e.target.name]: e.target.value });
    };

    const handleHospitalChange = (e: { target: { name: any; value: any; }; }) => {
        setHospitalData({ ...hospitalData, [e.target.name]: e.target.value });
        // if (e.target.name === 'facilities_available') {
        //     setHospitalData({
        //         ...hospitalData,
        //         facilities_available: e.target.value.split(','),
        //     });
        // } else {
        //     setHospitalData({ ...hospitalData, [e.target.name]: e.target.value });
        // }
    };

    const handleNextStep = () => {
        setStep(2);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            // First, create the business
            const businessResponse = await apis.post('/businesses/', businessData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Then, create the hospital associated with the business
            await apis.post('/hospitals/', { ...hospitalData, business: businessResponse.data.id }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert('Hospital created successfully!');
        } catch (error) {
            console.error('Error creating hospital:', error);
        }
    };

    return (
        <Container>
            <FormContainer>
                {step === 1 ? (
                    <>
                        <FormTitle>Business Information</FormTitle>
                        <InputField
                            type="text"
                            name="name"
                            placeholder="Business Name"
                            value={businessData.name}
                            onChange={handleBusinessChange}
                        />
                        <InputField
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={businessData.address}
                            onChange={handleBusinessChange}
                        />
                        <InputField
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={businessData.phone}
                            onChange={handleBusinessChange}
                        />
                        <InputField
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={businessData.email}
                            onChange={handleBusinessChange}
                        />
                        <InputField
                            type="url"
                            name="website"
                            placeholder="Website"
                            value={businessData.website}
                            onChange={handleBusinessChange}
                        />
                        <InputField
                            type="file"
                            name="logo"
                            placeholder="Logo"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setBusinessData({ ...businessData, logo: e.target.files[0] });
                                }
                            }}
                        />
                        {/* show image preview */}
                        {businessData.logo && (
                            <Image_priview src={URL.createObjectURL(businessData.logo)} alt="logo" />
                        )}
                        <Button onClick={handleNextStep}>Next</Button>
                    </>
                ) : (
                    <>
                        <FormTitle>Hospital Information</FormTitle>
                        <InputField
                            type="number"
                            name="number_of_beds"
                            placeholder="Number of Beds"
                            value={hospitalData.number_of_beds}
                            onChange={handleHospitalChange}
                        />
                        <InputField
                            type="number"
                            name="number_of_rooms"
                            placeholder="Number of Rooms"
                            value={hospitalData.number_of_rooms}
                            onChange={handleHospitalChange}
                        />
                        <InputField
                            type="text"
                            name="specialties"
                            placeholder="Specialties"
                            value={hospitalData.specialties}
                            onChange={handleHospitalChange}
                        />
                        <TextArea
                            name="facilities_available"
                            placeholder="Facilities Available"
                            value={hospitalData.facilities_available}
                            onChange={handleHospitalChange}
                        />
                        <InputField
                            type="text"
                            name="opening_hours"
                            placeholder="Opening Hours"
                            value={hospitalData.opening_hours}
                            onChange={handleHospitalChange}
                        />
                        <Button onClick={() => setStep(1)}>Back</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </>
                )}
            </FormContainer>
        </Container>
    );
};

export default Create_Business_form;
