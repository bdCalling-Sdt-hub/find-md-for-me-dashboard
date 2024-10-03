import React from 'react';
import { Button, DatePicker, Form, Table, Input, Radio, Select, Row, Col, message } from 'antd';
import Swal from 'sweetalert2';
import { BASE_URL } from '../main';

const Appoinment = ({data, parsonalData}) => {

    const updateStatus = async (status)=>{
        const token = JSON.parse(localStorage.getItem('token'));
        if(!token){
            message.error('Unauthorized');
            return;

        }

        try{
            const response = await
            fetch(`${BASE_URL}appoinment-status`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json',
                    'Authorization':`Bearer ${token}`,
                },

                body: JSON.stringify({
                    id:data.id,
                    status:status,
                }),

            });
            if(!response.ok){
                throw new Error('Failed to update document status');
            }
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Document status updated successfully',
            });

        }catch(error){
            // console.error('Error updating document status:', error); 
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update document status',
            });

        }
    };

    const handleApprove = () => updateStatus('approved');
    const handleReject = () => updateStatus('rejected');

    const [form] = Form.useForm();

    const onFinish = () => {
        message.success('Submit success!');
    };

    const onFinishFailed = () => {
        message.error('Submit failed!');
    };

    return (
        <div>
            <div className='w-[50%] pl-20 p-20 rounded-md bg-[#E8F6FE] mt-5 m-auto '>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    
                    <div className='flex flex-1  justify-between text-[#252B42] text-[16px] font-normal  leading-6 p-10'>
                        <div>
                            <h1 className='mt-3'>Name:</h1>
                            <h1 className='mt-3'>Email:</h1>
                            <h1 className='mt-3'>Contact:</h1>
                            
                
                        </div>
                        <div className='text-right'>
                            <h1 className='mt-3'>{parsonalData.first_name +  ' ' + parsonalData.last_name}</h1>
                            <h1 className='mt-3'>{parsonalData.email}</h1>
                            <h1 className='mt-3'>{parsonalData.phone}</h1>         
                        </div>
                    </div>





                    <center>
                        <button onClick={handleApprove} style={{ width: '132px', height: '54px', background: '#80C738', borderRadius: '8px', color: '#ffffff', marginRight: '50px' }}>Approve</button>
                        <button onClick={handleReject} style={{ width: '132px', height: '54px', background: '#DF3232', borderRadius: '8px', color: '#ffffff' }}>Reject</button>
                    </center>
                </Form>
            </div>
        </div>
    );
};

export default Appoinment;
