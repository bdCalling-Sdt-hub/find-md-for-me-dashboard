import { Button, Form, Input } from 'antd';
import Heading from '../../components/Heading';
import MetaTag from '../../components/MetaTag';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../main';
import { useState } from 'react';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        // console.log("Received Values", values); 
        await forgetPassword(values);
    }

    const forgetPassword = async (values) => {
        try {
            const response = await fetch(`${BASE_URL}forget-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Failed to send password reset email');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Password reset email sent successfully',
            });
            navigate("/auth/verify-otp",{  state: values?.email });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to send password reset email',
            });
        }
    };

    return (
        <div className='w-[516px]'>
            <Heading title={"Forgot Password"} style="mb-12 text-center" />
            <MetaTag title={"Forgot Password"} />
            
            <Form onFinish={handleSubmit} layout='vertical'>
                <Form.Item
                    label={<p className='text-[#6A6D7C] text-[18px] leading-[21px] raleway-regular text-center'>Email</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Email"
                        }
                    ]}
                    name={"email"}
                >
                    <Input
                        placeholder='Enter Your Email'
                        style={{
                            background: "#F1F4F9",
                            width: "100%",
                            height: 50,
                            border: "1px solid #D8D8D8",
                            outline: "none"
                        }}
                    />
                </Form.Item>

                <Form.Item style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Button
                        htmlType='submit'
                        style={{
                            background: "#005FBF",
                            width: 320,
                            height: 50,
                            border: "1px solid #E0E0E0",
                            outline: "none",
                            margin: "0 auto",
                            color: "white",
                            borderRadius: 8
                        }}
                        className='raleway-regular text-base leading-6'
                    >
                        Send Code
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ForgotPassword;
