import Heading from '../../components/Heading';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import MetaTag from '../../components/MetaTag';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../../main';

const UpdatePassword = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    // Ensure email is defined
    
//    console.log(state) 

    const handleSubmit = async (values) => {
        // console.log("Received Values", values); 

        await updatePassword(values);
    };

    const updatePassword = async (values) => {
        if(!values?.email){
            values.email = state
        }
        try {
            // Ensure passwords match
            if (values.new_password !== values.confirm_password) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Passwords do not match.',
                });
                return;
            }

            // Sending password update request
            const response = await fetch(`${BASE_URL}reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.new_password,
                    password_confirmation: values.confirm_password
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update password');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Password reset successfully',
            });

            navigate("/auth");
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to update password',
            });
        }
    };

    return (
        <div className='w-[516px]'>
            <Heading title={"Set New Password"} style="mb-6 text-center" />
            <MetaTag title={"Update Password"} />
            <p className='raleway-regular text-base leading-6 text-center' style={{ width: "320px", color: "#929394", margin: "0 auto 30px auto" }}>
                Create a new password. Ensure it differs from previous ones for security
            </p>

            <Form onFinish={handleSubmit} layout='vertical'>
                <Form.Item
                    style={{ marginBottom: 24 }}
                    label={<p className='text-[#6A6D7C] text-[18px] leading-[21px] raleway-regular text-center'>New Password</p>}
                    name="new_password"
                    rules={[
                        {
                            required: true,
                            message: "Please enter a new password",
                        },
                        {
                            min: 6, // Example minimum length
                            message: "Password must be at least 6 characters long",
                        },
                    ]}
                >
                    <Input.Password
                        placeholder='Enter Your New Password'
                        style={{
                            background: "#F1F4F9",
                            width: "100%",
                            height: 50,
                            border: "1px solid #D8D8D8",
                            outline: "none",
                        }}
                    />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: 24 }}
                    name="confirm_password"
                    label={<p className='text-[#6A6D7C] text-[18px] leading-[21px] raleway-regular text-center'>Confirm Password</p>}
                    dependencies={['new_password']}
                    rules={[
                        {
                            required: true,
                            message: "Please confirm your password",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('new_password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder='Enter Your Confirm Password'
                        style={{
                            background: "transparent",
                            width: "100%",
                            height: 50,
                            border: "1px solid #E0E0E0",
                            outline: "none",
                        }}
                    />
                </Form.Item>

                <Form.Item style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                            borderRadius: 8,
                        }}
                        className='raleway-regular text-base leading-6'
                    >
                        Update Password
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default UpdatePassword;
