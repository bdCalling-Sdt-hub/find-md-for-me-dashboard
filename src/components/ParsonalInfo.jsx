import  { useEffect, useState } from 'react';
import {
    Button, Form, Input, Radio, Row, Col, message
} from 'antd';
import { PiArrowLeftFill } from "react-icons/pi";
import { Link, useParams } from 'react-router-dom';
import AppointmentInfo from '../components/Appoinment';
import BuisnessInfo from '../components/BuisnessInfo';
import Swal from 'sweetalert2';
import { BASE_URL } from '../main';
import moment from 'moment';


const PersonalInfo = () => {
    const { userId } = useParams();
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [btn, setBtn] = useState('personal');
    const [form] = Form.useForm();

    // console.log("document", document)   

    useEffect(() => {
        const fetchDocument = async () => {
            const token = JSON.parse(localStorage.getItem('token'));
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`${BASE_URL}singel/itekinfo/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const result = await response.json();// Check the response
                setDocument(result); // Set document directly if result contains the user data
            } catch (error) {             
                // console.error('Error fetching user document:', error); 
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch user document',
                });
            } finally {
                setLoading(false);
            }
        };
        fetchDocument();
    }, [userId]);

    // Update status Parsonal information //

    
    const updateStatus = async (status) => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            message.error('Unauthorized');
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}parsonal-status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: document.id,
                    status: status
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
            // console.error('Error updating personal status:', error); 
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update document status',
            });
        }
    };

    const handleApprove = () => updateStatus('approved');
    const handleReject = () => updateStatus('rejected');

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!document) {
        return <div>No user document available</div>;
    }

    const buttonStyle = {
        transition: 'none',
        backgroundColor: 'transparent',
        color: '#737373',
        fontWeight: 500,
        fontSize: '18px',
        height: '44px'
    };

    const handleClick = (personal) => {
        setBtn(personal);
    };

    const onFinish = () => {
        message.success('Submit success!');
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };
//  console.log(document?.buisness[0])
    const renderComponent = () => {
        switch (btn) {
            case 'personal':
                return (
                    <>
                        <div className='text-[32px] font-medium text-black mt-10' >Personal Information</div>
                        <div className='w-full p-10 rounded-md bg-[#E8F6FE] mt-2 pb-10 '>

                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                            >
                                <Row className='mb-5'>
                                    <Col span={12} className=' pr-10'>
                                        <Form.Item className='text-[16px] font-medium text-[#737373] m-2  '
                                            name="FirstName"
                                            label="First name"
                                            rules={[{ required: true }, { type: 'string', min: 1 }]}
                                        >
                                            <Input placeholder={document.first_name} style={{ width: '100%', height: 48, background: '#FFFFFF', borderRadius: '10px' }} />
                                        </Form.Item>
                                        <Form.Item className='text-[16px] font-medium text-[#737373] m-2'
                                            name="dob"
                                            label="Date of Birth"
                                            rules={[{ required: true }]}
                                        >
                                            <Input
                                                placeholder={moment(document.dob).format('MMM D YYYY')}
                                                style={{ width: '100%', height: 48, background: '#FFFFFF', borderRadius: '10px' }}
                                            />
                                        </Form.Item>
                                        <Form.Item className='text-[16px] font-medium text-[#737373] m-2'
                                            name="Phone"
                                            label="Phone"
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder={document.phone} style={{ width: '100%', height: 48, background: '#FFFFFF', borderRadius: '10px' }} />
                                        </Form.Item>
                                        <Form.Item className='text-[16px] font-medium text-[#737373] m-2'
                                            name="state"
                                            label="What state(s) are you licensed/certified in?"
                                            rules={[{ required: true }]}
                                        > 
                                          <Input placeholder={document.state_license_certificate} style={{ width: '100%', height: 48, background: '#FFFFFF', borderRadius: '10px' }} /> 
                                        </Form.Item>
                                        <Form.Item className='text-[16px] font-medium text-[#737373] m-2'
                                            name="address"
                                            label="Home Mailing Address"
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder={document.mailing_address || "Address"} style={{ width: '100%', height: 48, background: '#FFFFFF', borderRadius: '10px' }} />
                                        </Form.Item>

                                        <Form.Item className='text-[16px] font-medium text-[#737373] m-2'
                                            name="trainingCertificate"
                                            label="Have you completed training/certification for the service(s) you would like to offer?"
                                            rules={[{ required: true }]}
                                        >
                                            <Radio.Group defaultValue={document.completed_training_certificate_service}>
                                                <Radio value="yes">Yes</Radio>
                                                <Radio value="no">No</Radio>
                                            </Radio.Group>
                                        </Form.Item> 
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item className='text-[16px] font-medium text-[#737373] m-2'
                                            name="lastName"
                                            label="Last name"
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder={document.last_name} style={{ width: '100%', height: 48, background: '#FFFFFF', borderRadius: '10px' }} />
                                        </Form.Item>
                                        <Form.Item className='text-[16px] font-medium text-[#737373] m-2'
                                            name="email"
                                            label="Email"
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder={document.email} style={{ width: '100%', height: 48, background: '#FFFFFF', borderRadius: '10px' }} />
                                        </Form.Item>
                                        <Form.Item className='text-[16px] font-medium text-[#737373] m-2'
                                            name="occupation"
                                            label="Occupation"
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder={document.occupation} style={{ width: '100%', height: 48, background: '#FFFFFF', borderRadius: '10px' }} />
                                        </Form.Item>
                                        <Form.Item className='text-[16px] font-medium text-[#737373] m-2'
                                            name="license"
                                            label="License/Certificate Number"
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder={document.license_certificate_no} style={{ width: '100%', height: 48, background: '#FFFFFF', borderRadius: '10px' }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                            <center>
                                <Button onClick={handleApprove} htmlType="submit" style={{ width: '132px', height: '54px', marginRight: '50px', color: '#ffffff', fontSize: '24px', fontWeight: 500, background: "#80C738" }}>Approve</Button>
                                <Button onClick={handleReject} type="danger" style={{ width: '132px', height: '54px', color: '#ffffff', fontSize: '24px', fontWeight: 500, background: "#DF3232" }}>Reject</Button>
                            </center>
                        </div>
                    </>
                );
            case 'business':
               
                return <BuisnessInfo data={document?.buisness[0]}  />;
            case 'appointment':
                return <AppointmentInfo data={document?.appoinment[0]} parsonalData={document} />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className='flex'>
                <Link to='/total-list'> <span className='text-3xl font-bold'><PiArrowLeftFill /></span></Link>
                <div className='flex flex-1 justify-center gap-5'>
                    <Button
                        onClick={() => handleClick('personal')}
                        style={btn === 'personal' ? { ...buttonStyle, backgroundColor: '#C738BD', color: 'white' } : buttonStyle}
                    >
                        Personal Information
                    </Button>
                    <Button
                        onClick={() => handleClick('business')}
                        style={btn === 'business' ? { ...buttonStyle, backgroundColor: '#C738BD', color: 'white' } : buttonStyle}
                    >
                        Business Information
                    </Button>
                    <Button
                        onClick={() => handleClick('appointment')}
                        style={btn === 'appointment' ? { ...buttonStyle, backgroundColor: '#C738BD', color: 'white' } : buttonStyle}
                    >
                        Appointment Information
                    </Button>
                </div>
            </div>
            {renderComponent()}
        </div>
    );
};

export default PersonalInfo;
