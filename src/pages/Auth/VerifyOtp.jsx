import Heading from '../../components/Heading';
import { Button, Form, Input } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import MetaTag from '../../components/MetaTag';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../main';
const VerifyOtp = () => {
    const {state} = useLocation();
    // console.log(state) 
    const navigate = useNavigate();

    const onChange = (text) => {
        // console.log('onChange:', text); 
    };

    const sharedProps = {
        onChange,
    };

    const handleSubmit= async( values)=>{
        // console.log("Received Values", values); 
        await verifyOtp(values);
       
    }

    const verifyOtp = async (values) => {
        // console.log(values); 
        try {
            const response = await fetch(`${BASE_URL}email-verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({otp: values.otp}),
            });

            if (!response.ok) {
                throw new Error('Failed to send password reset email');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Password reset email sent successfully',
            });
            navigate("/auth/update-password",{state : state})
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
            <Heading title={"Verify OTP"}  style="mb-6 text-center" />
            <MetaTag title={"Verify OTP"} />
            <p className='poppins-regular text-base leading-6' style={{width: "380px", color: "#929394",  margin: "0 auto 30px auto"}}>
                We sent a reset link to <span style={{color: "#545454"}}> contact@dscode...com </span>
                enter 6 digit code that mentioned in the email
            </p>
            <Form onFinish={verifyOtp}>
                <Form.Item
                    style={{display: "flex", alignItems: "center", justifyContent: 'center'}}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Valid OTP"
                        }
                    ]}
                    name={"otp"}
                >
                    <Input.OTP 
                        length={6}
                    />
                </Form.Item>

                <Form.Item style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Button
                        htmlType='submit'
                        style={{
                            background: "#005FBF",
                            width: 320,
                            height: 50,
                            border: "1px solid #D8D8D8",
                            outline: "none",
                            margin: "0 auto",
                            color: "white",
                            borderRadius: 8
                        }}
                        className='raleway-medium text-base leading-6'
                    >
                        Verity OTP
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default VerifyOtp