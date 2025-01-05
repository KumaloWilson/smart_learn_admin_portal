import React from 'react';
import { Descriptions, Button, Row, Col } from 'antd';
import { Lecturer } from '../../models/lecturer';
import { EditOutlined } from '@ant-design/icons';

interface LecturerDetailsProps {
    lecturer: Lecturer;
    onEdit: () => void;
}

const LecturerDetails: React.FC<LecturerDetailsProps> = ({ lecturer, onEdit }) => {
    return (
        <div>
            <Descriptions title="Lecturer Details" bordered column={2}>
                <Descriptions.Item label="Lecturer ID">{lecturer.lecturer_id}</Descriptions.Item>
                <Descriptions.Item label="Full Name">
                    {`${lecturer.first_name} ${lecturer.last_name}`}
                </Descriptions.Item>
                <Descriptions.Item label="Email">{lecturer.email_address}</Descriptions.Item>
                <Descriptions.Item label="Nationality">{lecturer.nationality}</Descriptions.Item>
                <Descriptions.Item label="Department">{lecturer.department_id}</Descriptions.Item>
                <Descriptions.Item label="Date of Birth">
                    {lecturer.date_of_birth ? lecturer.date_of_birth.toString() : 'Not Available'}
                </Descriptions.Item>
                <Descriptions.Item label="Joined Date">
                    {lecturer.joined_date ? lecturer.joined_date.toString() : 'Not Available'}
                </Descriptions.Item>
            </Descriptions>

            <Row justify="end" style={{ marginTop: 20 }}>
                <Col>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={onEdit}
                    >
                        Edit Details
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default LecturerDetails;
