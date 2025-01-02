import React, { useEffect } from 'react';
import { Button, Form, Input, Radio, Space, Row, Col, message } from 'antd';
import Swal from 'sweetalert2';
import { BASE_URL } from '../main';

const { TextArea } = Input;

const BusinessInfo = ({ data }) => {
    const [form] = Form.useForm(); 

    useEffect(() => {
     
        if (data) {
            let formattedDirectServiceBusiness = '';
            if (data.direct_service_business) {
                try {
                    const parsedData = JSON.parse(data.direct_service_business);
                    formattedDirectServiceBusiness = parsedData.join(', ');
                } catch (error) {
                    console.error('Error parsing direct_service_business:', error);
                }
            }
    
            form.setFieldsValue({
                buisness_name: data?.buisness_name,
                direct_service_business: formattedDirectServiceBusiness,
                what_state_anicipate_service: data?.what_state_anicipate_service,
                what_state_your_business_registered: data?.what_state_your_business_registered,
                how_long_time_buisness: data?.how_long_time_buisness,
                registeredWithSoS: data?.business_registe_red_secretary_state, 
                companyOwnership: data?.owns_the_company,
                entityType: data?.entityType,
                serviceProviders: data?.serviceProviders,
                serviceTier: data?.tier_service_interrested,
                businessAddress: data?.buisness_address,
                malpracticeInsurance: data?.business_malpractice_insurance,
                registeredStates: data?.registeredStates,
                serviceStates: data?.serviceStates,
                serviceClientsPerMonth: data?.how_many_client_patients_service_month,
                additionalQuestions: data?.additional_question, 
                client_type: data?.client_type,
                formattedString: formattedDirectServiceBusiness,
            });
        }
    }, [data, form]);

    const updateStatus = async (status) => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            message.error('Unauthorized');
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}bisness-status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: data.id,
                    status: status,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update document status');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Document status updated successfully',
            });

        } catch (error) {
            // console.error('Error updating document status:', error); 

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update document status',
            });
        }
    };

    const AcceptStatus = () => updateStatus('approved');
    const RejectStatus = () => updateStatus('rejected');

    const onFinish = () => {
        message.success('Submit success!');
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    return (
        <div>
            <div className='text-[32px] font-medium text-black mt-10' >Business Information</div>
            <div className='w-full p-10 rounded-md bg-[#E8F6FE] mt-2 pb-10'>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Row className='mb-5'>
                        <Col span={12} className='pr-10'>
                            <Form.Item
                                className='text-[16px] font-medium text-[#737373] m-2'
                                name="buisness_name"
                                label="Business Name"
                                rules={[{ required: true, message: 'Please enter the business name' }, { type: 'string', min: 6, message: 'Business name must be at least 6 characters' }]}
                            >
                                <Input
                                    style={{ width: '100%', height: 48, background: '#FFFFFF', borderRadius: '10px' }}
                                />
                            </Form.Item>
                            <Form.Item
                                className='text-[16px] font-medium text-[#737373] m-2'
                                name="how_long_time_buisness"
                                label="How long have you been in business?"
                                rules={[{ required: true, message: 'Please select how long you have been in business' }]}
                            >
                                <Radio.Group>
                                    <Space direction="vertical">
                                        <Radio value='startUp'>Start Up</Radio>
                                        <Radio value="less than one year">Less than 1 year</Radio>
                                        <Radio value="less than 2 years">Less than 2 years</Radio>
                                        <Radio value="greater than 3 years">Greater than 3 years</Radio>
                                        <Radio value="greater than 5 years">Greater than 5 years</Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                className='text-[16px] font-medium text-[#737373] m-2'
                                name="registeredWithSoS"
                                label="Is your business registered with the Secretary of State?"
                                rules={[{ required: true, message: 'Please indicate if registered with Secretary of State' }]}
                            >
                                <Radio.Group>
                                    <Radio value="yes" >Yes</Radio>
                                    <Radio value="no">No</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                className='text-[16px] font-medium text-[#737373] m-2'
                                name="companyOwnership"
                                label="Who owns the company?"
                                rules={[{ required: true, message: 'Please select who owns the company' }]}
                            >
                                <Radio.Group>
                                    <Space direction="vertical">
                                        <Radio value="myself">Myself</Radio>
                                        <Radio value="llc">LLC</Radio>
                                        <Radio value="pllc">PLLC</Radio> 
                                        <Radio value="corporation">Corporation</Radio> 
                                        <Radio value="partners">Partners</Radio>
                                        <Radio value="entity">Entity</Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item
                                className='text-[16px] font-medium text-[#737373] m-2'
                                name="formattedString"
                                label="Who will be providing direct services at your business?"
                                rules={[{ required: true, message: 'Please select who will be providing direct services' }]}
                            >
                                <Input style={{ width: '100%', height: 48, background: '#FFFFFF', borderRadius: '10px' }} />
                            </Form.Item>

                            <Form.Item
                                className='text-[16px] font-medium text-[#737373] m-2'
                                name="serviceTier"
                                label="Service Tier"
                                rules={[{ required: true, message: 'Please select the service tier' }]}
                            >
                                <Input style={{ width: '100%', height: 48, background: '#FFFFFF', borderRadius: '10px' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>  

                        <Form.Item
                                className='text-[16px] font-medium text-[#737373] m-2'
                                name="client_type"
                                label="Client Type?"
                                rules={[{ required: true, message: 'Please select client type' }]}
                            >
                                <Radio.Group>
                                    <Space direction="vertical">
                                        <Radio value='individual'> Individual </Radio>
                                        <Radio value="business"> Business </Radio>

                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                            
                            <Form.Item
                                className='text-[16px] font-medium text-[#737373] m-2'
                                name="businessAddress"
                                label="Business Address"
                                rules={[{ required: true, message: 'Please enter the business address' }, { type: 'string', min: 2, message: 'Business address must be at least 2 characters' }]}
                            >
                                <Input style={{ width: '100%', height: 48, background: '#FFFFFF', borderRadius: '10px' }} />
                            </Form.Item>
                            <Form.Item
                                className='text-[16px] font-medium text-[#737373] m-2'
                                name="malpracticeInsurance"
                                label="Does your business have malpractice insurance?"
                                rules={[{ required: true, message: 'Please select if you have malpractice insurance' }]}
                            >
                                <Radio.Group>
                                    <Radio value="yes">Yes</Radio>
                                    <Radio value="no">No</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                className='text-[16px] font-medium text-[#737373] m-2'
                                name="what_state_your_business_registered"
                                label="What state(s) is your business registered in?"
                                rules={[{ required: true, message: 'Please select the states where your business is registered' }]}
                            >
                                <Input style={{ width: '100%', height: 48, background: '#FFFFFF', borderRadius: '10px' }} />
                            </Form.Item>
                            <Form.Item
                                className='text-[16px] font-medium text-[#737373] m-2'
                                name="what_state_anicipate_service"
                                label="What state(s) do you anticipate providing services in?"
                                rules={[{ required: true, message: 'Please select the states where you anticipate providing services' }]}
                            >
                                <Input style={{ width: '100%', height: 48, background: '#FFFFFF', borderRadius: '10px' }} />
                            </Form.Item>
                            <Form.Item
                                className='text-[16px] font-medium text-[#737373] m-2'
                                name="serviceClientsPerMonth"
                                label="How many clients/patients do you have or expect to service a month?"
                                rules={[{ required: true, message: 'Please enter the number of clients/patients per month' }, { type: 'number', min: 1, message: 'Number must be greater than 0' }]}
                            >
                                <Input type="number" style={{ width: '100%', height: 48, background: '#FFFFFF', borderRadius: '10px' }} />
                            </Form.Item>
                            <Form.Item
                                className='text-[16px] font-medium text-[#737373] m-2'
                                name="additionalQuestions"
                                label="Additional questions you have for the scheduled call please write below"
                                rules={[{ required: true, message: 'Please enter any additional questions' }, { type: 'string', min: 2, message: 'Additional questions must be at least 2 characters' }]}
                            >
                                <TextArea rows={5} style={{ width: '100%', height: '150px' }} placeholder={data?.additional_question} allowClear />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <center>
                    <Button onClick={AcceptStatus} htmlType="button" style={{ width: '132px', height: '54px', marginRight: '50px', color: '#ffffff', fontSize: '24px', fontWeight: 500, background: "#80C738" }}>Approve</Button>
                    <Button onClick={RejectStatus} type="danger" style={{ width: '132px', height: '54px', color: '#ffffff', fontSize: '24px', fontWeight: 500, background: "#DF3232" }}>Reject</Button>
                </center>
            </div>
        </div>
    );
};

export default BusinessInfo;
