/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal } from 'antd';
import React from 'react'
import Swal from 'sweetalert2';

const MakeAdminModal = ({open, setOpen, setRefresh}) => {

    const handleMakeAdmin=async()=>{
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Created Make Admin Successfully",
            showConfirmButton: false,
            timer: 1500
        }).then(()=>{
            setOpen(false);
            setRefresh("done");
        })

    }
    return (
        <>
            <Modal
                centered
                open={open}
                onOk={false}
                onCancel={() => setOpen(false)}
                width={500}
                footer={false}
                title={<p className='text-[#262727] pl-4 raleway-medium text-[20px] leading-[30px]'>Make Admin</p>}
            >
                <div className='p-4'>
                    <Form layout='vertical' onSubmit={handleMakeAdmin} initialValues={{userType: "ADMIN"}}>

                        <Form.Item
                            label={<p className='text-[#6A6D7C] text-sm leading-5 raleway-regular text-center'>Full Name</p>}
                            name={"full_name"}
                            rules={[
                                {
                                    required: true,
                                    message: "Enter User Name"
                                }
                            ]}
                        >
                            <Input
                                placeholder="Enter User Name"
                                style={{
                                    width: "100%",
                                    height: 48,
                                    border: "1px solid #E7EBED",
                                    outline: "none",
                                    borderRadius: 8
                                }}
                                className="raleway-regular text-[#6A6A6A] text-[14px] leading-5"
                            />
                        </Form.Item>


                        <Form.Item
                            label={<p className='text-[#6A6D7C] text-sm leading-5 raleway-regular text-center'>Email</p>}
                            name={"email"}
                            rules={[
                                {
                                    required: true,
                                    message: "Enter User Email"
                                }
                            ]}
                        >
                            <Input
                                placeholder="Enter User Email"
                                style={{
                                    width: "100%",
                                    height: 48,
                                    border: "1px solid #E7EBED",
                                    outline: "none",
                                    borderRadius: 8
                                }}
                                className="raleway-regular text-[#6A6A6A] text-[14px] leading-5"
                            />
                        </Form.Item>


                        <Form.Item
                            label={<p className='text-[#6A6D7C] text-sm leading-5 raleway-regular text-center'>Password</p>}
                            name={"password"}
                            rules={[
                                {
                                    required: true,
                                    message: "Enter User Password"
                                }
                            ]}
                        >
                            <Input.Password
                                placeholder="Enter User Password"
                                style={{
                                    width: "100%",
                                    height: 48,
                                    border: "1px solid #E7EBED",
                                    outline: "none",
                                    borderRadius: 8
                                }}
                                className="raleway-regular text-[#6A6A6A] text-[14px] leading-5"
                            />
                        </Form.Item>


                        <Form.Item
                            label={<p className='text-[#6A6D7C] text-sm leading-5 raleway-regular text-center'>User Type</p>}
                            name={"userType"}
                        >
                            <Input
                                placeholder="Enter User Type"
                                style={{
                                    width: "100%",
                                    height: 48,
                                    border: "1px solid #E7EBED",
                                    outline: "none",
                                    borderRadius: 8
                                }}
                                readOnly
                                className="raleway-regular text-[#6A6A6A] text-[14px] leading-5"
                            />
                        </Form.Item>

                        <Form.Item
                            style={{marginBottom: 0}}
                        >
                            <Button
                                htmlType='submit'
                                style={{
                                    background: "#4FB697",
                                    width: "100%",
                                    height: 48,
                                    border: "none",
                                    outline: "none",
                                    color: "#FCFCFC",
                                    borderRadius: 8,
                                }}
                                className='raleway-regular text-base leading-5 flex items-center justify-center'
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )
}

export default MakeAdminModal