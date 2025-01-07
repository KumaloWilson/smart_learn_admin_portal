import React from 'react';
import { Form, Input, Select, InputNumber, Row, Col, Switch, Upload, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { Course } from '../../models/course';

const { TextArea } = Input;
const { Option } = Select;

interface CourseFormProps {
    initialValues?: Course;
    onSubmit: (values: Partial<Course>) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ initialValues, onSubmit }) => {
    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={onSubmit}
            className="space-y-6"
        >
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        name="course_name"
                        label="Course Name"
                        rules={[{ required: true, message: 'Please enter course name' }]}
                    >
                        <Input placeholder="Enter course name" className="rounded-lg" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="course_code"
                        label="Course Code"
                        rules={[{ required: true, message: 'Please enter course code' }]}
                    >
                        <Input placeholder="Enter course code" className="rounded-lg" />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        name="credit_hours"
                        label="Credit Hours"
                        rules={[{ required: true, message: 'Please enter credit hours' }]}
                    >
                        <InputNumber min={1} max={6} className="w-full rounded-lg" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="course_level"
                        label="Course Level"
                        rules={[{ required: true, message: 'Please select course level' }]}
                    >
                        <Select placeholder="Select level" className="rounded-lg">
                            {Array.from({ length: 9 }, (_, i) => {
                                const year = Math.floor(i / 2) + 1;
                                const semester = (i % 2) + 1;
                                return (
                                    <Option key={`${year}.${semester}`} value={Number(`${year}.${semester}`)}>
                                        {`${year}.${semester}`}
                                    </Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="phase"
                        label="Phase"
                        rules={[{ required: true, message: 'Please select phase' }]}
                    >
                        <Select placeholder="Select phase" className="rounded-lg">
                            {[1, 2, 3, 4].map(phase => (
                                <Option key={phase} value={phase}>Phase {phase}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        name="semester_offered"
                        label="Semester Offered"
                        rules={[{ required: true, message: 'Please select semester' }]}
                    >
                        <Select placeholder="Select semester" className="rounded-lg">
                            <Option value="fall">Fall</Option>
                            <Option value="spring">Spring</Option>
                            <Option value="summer">Summer</Option>
                            <Option value="all">All Semesters</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
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
                </Col>
            </Row>

            <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please enter description' }]}
            >
                <TextArea rows={4} placeholder="Enter course description" className="rounded-lg" />
            </Form.Item>

            <Form.Item
                name="prerequisites"
                label="Prerequisites"
            >
                <TextArea rows={2} placeholder="Enter prerequisites" className="rounded-lg" />
            </Form.Item>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        name="is_elective"
                        label="Elective Course"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="syllabus_path"
                        label="Syllabus"
                    >
                        <Upload maxCount={1}>
                            <button type="button" className="ant-btn ant-btn-default rounded-lg">
                                <UploadOutlined /> Upload Syllabus
                            </button>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default CourseForm;