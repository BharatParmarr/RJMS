// import React from 'react';
// import EducationForm from './Education_form';
// import { Education_apis } from '../apis';

// const CreateStudent: React.FC = () => {
//     const studentFields = [
//         { name: 'name', label: 'Full Name', type: 'text', required: true },
//         { name: 'email', label: 'Email', type: 'email', required: true },
//         { name: 'student_id', label: 'Student ID', type: 'text', required: true },
//         { name: 'date_of_birth', label: 'Date of Birth', type: 'date', required: true },
//         {
//             name: 'gender', label: 'Gender', type: 'select', required: true, options: [
//                 { value: 'male', label: 'Male' },
//                 { value: 'female', label: 'Female' },
//                 { value: 'other', label: 'Other' },
//             ]
//         },
//         { name: 'address', label: 'Address', type: 'textarea', required: true },
//         { name: 'parent_name', label: 'Parent/Guardian Name', type: 'text', required: true },
//         { name: 'parent_phone', label: 'Parent/Guardian Phone', type: 'text', required: true },
//     ];

//     const handleSubmit = async (data: any) => {
//         try {
//             const response = await Education_apis.post('/students/', data);
//             console.log('Student created:', response.data);
//             // Handle success (e.g., show a success message, redirect to student list)
//         } catch (error) {
//             console.error('Error creating student:', error);
//             // Handle error (e.g., show an error message)
//         }
//     };

//     return (
//         <div>
//             <EducationForm
//                 title="Create New Student"
//                 fields={studentFields}
//                 onSubmit={handleSubmit}
//             />
//         </div>
//     );
// };

// export default CreateStudent;

import React from 'react';
import GeneralForm from './Education_form';
import { Education_apis } from '../apis';

const SchoolForm: React.FC = () => {
    const fields = [
        { name: 'name', label: 'School Name', type: 'text' },
        { name: 'address', label: 'Address', type: 'text' },
        { name: 'phone', label: 'Phone', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'principal', label: 'Principal ID', type: 'text' },
    ];

    const handleSubmit = async (data: any) => {
        try {
            const response = await Education_apis.post('/schools/', data);
            console.log('School created:', response.data);
        } catch (error) {
            console.error('Error creating school:', error);
        }
    };

    return <GeneralForm fields={fields} onSubmit={handleSubmit} />;
};

// export default SchoolForm;


const StudentForm: React.FC = () => {
    const fields = [
        { name: 'name', label: 'Student Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Phone', type: 'text' },
        { name: 'student_id', label: 'Student ID', type: 'text' },
        { name: 'date_of_birth', label: 'Date of Birth', type: 'date' },
        { name: 'gender', label: 'Gender', type: 'text' },
        { name: 'address', label: 'Address', type: 'text' },
        { name: 'parent_name', label: 'Parent Name', type: 'text' },
        { name: 'parent_phone', label: 'Parent Phone', type: 'text' },
        { name: 'current_class', label: 'Current Class ID', type: 'text' },
    ];

    const handleSubmit = async (data: any) => {
        try {
            const response = await Education_apis.post('/students/', data);
            console.log('Student created:', response.data);
        } catch (error) {
            console.error('Error creating student:', error);
        }
    };

    return <GeneralForm fields={fields} onSubmit={handleSubmit} />;
};



const TeacherForm: React.FC = () => {
    const fields = [
        { name: 'user', label: 'User ID', type: 'text' },
        { name: 'employee_id', label: 'Employee ID', type: 'text' },
        { name: 'department', label: 'Department ID', type: 'text' },
        { name: 'position', label: 'Position', type: 'text' },
        { name: 'date_of_joining', label: 'Date of Joining', type: 'date' },
        { name: 'phone', label: 'Phone', type: 'text' },
        { name: 'address', label: 'Address', type: 'text' },
    ];

    const handleSubmit = async (data: any) => {
        try {
            const response = await Education_apis.post('/teachers/', data);
            console.log('Teacher created:', response.data);
        } catch (error) {
            console.error('Error creating teacher:', error);
        }
    };

    return <GeneralForm fields={fields} onSubmit={handleSubmit} />;
};

export { SchoolForm, StudentForm, TeacherForm };



export default SchoolForm;