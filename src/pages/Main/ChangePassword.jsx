import Heading from '../../components/Heading'
import { Button, Form, Input } from 'antd'
import MetaTag from '../../components/MetaTag'

const ChangePassword = () => {
    return (
        <div className='p-6 '>
            <Heading title={"Change Password"} style={"text-center mb-20"} />
            <MetaTag title={"Change Password"} />

            <Form
                layout='vertical'
                style={{width: 400, margin: "0 auto"}}
            >
                <Form.Item 
                    name="current_password"
                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Current Password</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Current Password!"
                        }
                    ]}
                >
                    <Input.Password 
                        style={{
                            width: "100%",
                            height: "42px",
                            border: "1px solid #DCDDDE",
                            borderRadius: "8px",
                            color: "black",
                            outline: "none",
                        }}
                        type="text" 
                        placeholder="Enter Current Password"
                    />
                </Form.Item>


                <Form.Item
                    name="new_password"
                    rules={[
                        {
                            required: true,
                            message: "Please Enter New Password!"
                        }
                    ]}
                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">New Password</p>}
                >
                    <Input.Password 
                        style={{
                            width: "100%",
                            height: "42px",
                            border: "1px solid #DCDDDE",
                            borderRadius: "8px",
                            color: "black",
                            outline: "none"
                        }}
                        type="text" 
                        placeholder="Enter New Password"
                    />
                </Form.Item>

                <Form.Item 
                    label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Confirm Password</p>}
                    name="confirm_password"
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Confirm Password!"
                        }
                    ]}
                >
                    <Input.Password 
                        style={{
                            width: "100%",
                            height: "42px",
                            border: "1px solid #DCDDDE",
                            borderRadius: "8px",
                            color: "black",
                            outline: "none"
                        }}
                        type="text" 
                        placeholder="Enter Confirm Password"
                    />
                </Form.Item>

                <Form.Item 
                    style={{marginBottom: 0, display: "flex", alignItems: "center", justifyContent: "center"}}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        style={{
                            width : 158,
                            height: 48,
                            background: "#4FB697",
                            color: "#FCFCFC"
                        }}
                        className='raleway-medium  text-sm leading-5'
                    >
                        Save & Change
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ChangePassword