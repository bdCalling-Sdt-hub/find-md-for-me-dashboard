import React, { useState } from 'react';
import { Button, Form } from 'antd';
import { LiaFileUploadSolid } from 'react-icons/lia';
import Swal from 'sweetalert2';
import { BASE_URL } from '../main';

const Protocols = ({ data }) => {
    const [form] = Form.useForm();
    const [uploadedFiles, setUploadedFiles] = useState({});

    const handleFileChange = (id, file) => {
        setUploadedFiles(prev => ({
            ...prev,
            [id]: file
        }));
    };
    // console.log(data)

    const onFinish = async () => {
        const formData = new FormData();
    const finalData = [];
        // Prepare tiers data with files
        data?.map((item,index) => {
            const tierData = { id: item.id };

            if (uploadedFiles[item.id]) {
                tierData.constant_image = uploadedFiles[item.id];
            }
            formData.append(`tiers[${index}][id]` ,tierData.id )
            formData.append(`tiers[${index}][protocol_image]` ,uploadedFiles[item.id] )
        });

        console.log(finalData)

       

        try {
            const response = await fetch(`${BASE_URL}tiear-update`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                  
                },
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Error response: ${errorText}`);
                throw new Error('Failed to update profile');
            }

            const result = await response.json();
            Swal.fire({
                icon: 'success',
                title: result.message,
                text: 'Profile updated successfully',
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to update profile',
            });
        }
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <h1 className='text-[#252B42] text-lg font-medium'>Protocols</h1>
            {data && data.length > 0 ? (
                data.map(item => (
                    <div key={item.id}>
                        <p className='text-[16px] text-black font-normal leading-3 mt-2'>{item.tyer_name}</p>
                        <p className='text-[16px] text-black font-normal leading-3 mt-12'>Upload Protocols Document</p>
                        <Form.Item style={{ marginBottom: '24px' }}>
                            <label
                                htmlFor={`protocol_${item.id}`}
                                style={{ width: '324px', cursor: 'pointer', height: '48px', background: '#E8F6FE', borderRadius: '18px', display: 'block', float: 'left', marginTop: '20px' }}
                            >
                                <div className='flex items-center text-[14px] font-medium text-[#1D75F2] leading-4 p-4'>
                                    <LiaFileUploadSolid />
                                    <p>Click to Upload</p>
                                </div>
                                <input
                                    name={`protocol_${item.id}`}
                                    onChange={(e) => handleFileChange(item.id, e.target.files[0])}
                                    type='file'
                                    id={`protocol_${item.id}`}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </Form.Item>
                    </div>
                ))
            ) : (
                <p>No data available</p>
            )}
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '150px', height: '44px' }}>
                    Save & Change
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Protocols;
