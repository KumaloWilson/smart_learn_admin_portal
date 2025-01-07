import React from 'react';
import { Form, Input, Select, Row, Col, InputNumber } from 'antd';
import type { Program } from '../../models/program';

const { TextArea } = Input;
const { Option } = Select;

interface ProgramFormProps {
    initialValues?: Program;
    onSubmit: (values: Partial<Program>) => void;
}

const ProgramForm: React.FC<ProgramFormProps> = ({ initialValues, onSubmit }) => {
    return (
        <Form
            layout="vertical"
            initialValues={initialValues}
            onFinish={onSubmit}
        >
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        name="program_name"
                        label="Program Name"
                        rules={[{ required: true, message: 'Please enter program name' }]}
                    >
                        <Input placeholder="Enter program name" className="rounded-lg" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="program_code"
                        label="Program Code"
                    >
                        <Input placeholder="Enter program code" className="rounded-lg" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        name="school_id"
                        label="School ID"
                        rules={[{ required: true, message: 'Please enter school ID' }]}
                    >
                        <Input placeholder="Enter school ID" className="rounded-lg" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="degree_level"
                        label="Degree Level"
                    >
                        <Select placeholder="Select degree level" className="rounded-lg">
                            <Option value="certificate">Certificate</Option>
                            <Option value="diploma">Diploma</Option>
                            <Option value="bachelor">Bachelor</Option>
                            <Option value="master">Master</Option>
                            <Option value="doctorate">Doctorate</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        name="duration_years"
                        label="Duration (Years)"
                    >
                        <InputNumber
                            placeholder="Enter duration in years"
                            className="w-full rounded-lg"
                            min={1}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="credit_hours"
                        label="Credit Hours"
                    >
                        <InputNumber
                            placeholder="Enter credit hours"
                            className="w-full rounded-lg"
                            min={0}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                name="description"
                label="Description"
            >
                <TextArea rows={4} placeholder="Enter program description" className="rounded-lg" />
            </Form.Item>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        name="coordinator_id"
                        label="Coordinator ID"
                    >
                        <Input placeholder="Enter coordinator ID" className="rounded-lg" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="accreditation_status"
                        label="Accreditation Status"
                    >
                        <Input placeholder="Enter accreditation status" className="rounded-lg" />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                name="entry_requirements"
                label="Entry Requirements"
            >
                <TextArea rows={4} placeholder="Enter entry requirements" className="rounded-lg" />
            </Form.Item>

            <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
            >
                <Select placeholder="Select status" className="rounded-lg">
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                </Select>
            </Form.Item>
        </Form>
    );
};

export default ProgramForm;
