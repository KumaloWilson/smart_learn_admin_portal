import { Descriptions, Tag, Button, Typography, Card, } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import type { Department } from '../../models/department';

const { Title } = Typography;

interface DepartmentDetailsProps {
    department: Department;
    onEdit: () => void;
}

const DepartmentDetails: React.FC<DepartmentDetailsProps> = ({ department, onEdit }) => {

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-6">
                <Title level={4} className="!mb-0">{department.department_name}</Title>
                <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>
                    Edit Department
                </Button>
            </div>

            <Card className="shadow-sm">
                <Descriptions bordered column={2}>
                    <Descriptions.Item label="Department Code">{department.department_code || 'Not specified'}</Descriptions.Item>
                    <Descriptions.Item label="Head of Department">
                        {department.head_of_department_id || 'Not assigned'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Establishment Date">
                        {department.establishment_date ?
                            new Date(department.establishment_date).toLocaleDateString() :
                            'Not specified'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                        <Tag color={department.status === 'active' ? 'green' : 'red'}>
                            {department.status?.toUpperCase()}
                        </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Contact Email">{department.contact_email || 'Not specified'}</Descriptions.Item>
                    <Descriptions.Item label="Contact Phone">{department.contact_phone || 'Not specified'}</Descriptions.Item>
                    <Descriptions.Item label="Office Location" span={2}>
                        {department.office_location || 'Not specified'}
                    </Descriptions.Item>
                    <Descriptions.Item label="Description" span={2}>
                        {department.description || 'No description available'}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
};

export default DepartmentDetails;
