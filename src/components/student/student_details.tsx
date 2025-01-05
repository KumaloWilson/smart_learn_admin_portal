import React from 'react';
import { Descriptions, Card } from 'antd';
import type { Student } from '../../models/student';
import dayjs from 'dayjs';

interface StudentDetailsProps {
    student: Student;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ student }) => {
    return (
        <Card>
            <Descriptions title="Student Information" bordered column={2} >
                <Descriptions.Item label="Student ID" > {student.student_id} </Descriptions.Item>
                < Descriptions.Item label="Full Name" >
                    {`${student.title} ${student.first_name} ${student.surname}`
                    }
                </Descriptions.Item>
                < Descriptions.Item label="Email" > {student.email_address} </Descriptions.Item>
                < Descriptions.Item label="Phone" > {student.phone_numbers} </Descriptions.Item>
                < Descriptions.Item label="Date of Birth" >
                    {dayjs(student.date_of_birth).format('MMMM D, YYYY')}
                </Descriptions.Item>
                < Descriptions.Item label="Place of Birth" > {student.place_of_birth} </Descriptions.Item>
                < Descriptions.Item label="Nationality" > {student.nationality} </Descriptions.Item>
                < Descriptions.Item label="National ID" > {student.national_id} </Descriptions.Item>
                < Descriptions.Item label="Citizenship" > {student.citizenship} </Descriptions.Item>
                < Descriptions.Item label="Sex" > {student.sex} </Descriptions.Item>
                < Descriptions.Item label="Marital Status" > {student.marital_status} </Descriptions.Item>
                < Descriptions.Item label="Religion" > {student.religion} </Descriptions.Item>
                < Descriptions.Item label="Permanent Address" span={2} >
                    {student.permanent_address}
                </Descriptions.Item>
                < Descriptions.Item label="Contact Address" span={2} >
                    {student.contact_address}
                </Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export default StudentDetails;