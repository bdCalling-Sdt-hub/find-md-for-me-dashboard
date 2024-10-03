import React, { useState } from 'react';
import { Button, Form } from 'antd';
import { LiaFileUploadSolid } from 'react-icons/lia';
import Swal from 'sweetalert2';
import { BASE_URL } from '../main';

const Protocols = ({ data }) => {
    // console.log(data); 
    const [form] = Form.useForm();
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [fileNames, setFileNames] = useState({});

    const handleFileChange = (id, files) => {
        const fileArray = Array.from(files); // Convert FileList to an array

        setUploadedFiles(prev => ({
            ...prev,
            [id]: fileArray,
        }));

        // Store the file names for display
        setFileNames(prev => ({
            ...prev,
            [id]: fileArray.map(file => file.name).join(', '), // Join file names with a comma
        }));
    };


    const onFinish = async () => {
        const formData = new FormData();
    
        if (Array.isArray(data)) {
            data.forEach((item, index) => {
                formData.append(`tiers[${index}][id]`, item.id);
    
                if (uploadedFiles[item.id]) {
                    uploadedFiles[item.id].forEach((file, fileIndex) => {
                        formData.append(`tiers[${index}][protocol_image][${fileIndex}]`, file);
                    });
                }
            });
        }
    
        try {
            const response = await fetch(`${BASE_URL}tiear-update`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                },
                body: formData,
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
    
            const result = await response.json();
            // console.log(result); 
            Swal.fire({
                icon: 'success',
                title: result.message,
               
            });
        } catch (error) { 
            // console.log(`error ${error}`); 
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to update Tier',
            });
        }
    };


    return (
        <Form form={form} onFinish={onFinish}>
            <h1 className='text-[#252B42] text-lg pb-4 font-semibold'>Protocols</h1>
            {data && data.length > 0 ? (
                data.map(item => (
                    <div key={item.id} className='mb-10'>
                        <p className='text-[16px] text-black font-normal leading-3 pt-2'>{item.tyer_name}</p>
                        <p className='text-[16px] text-black font-normal leading-3 py-4'>Upload Protocols Document</p>
                        <Form.Item style={{ marginBottom: '24px' }}>
                            <label
                                htmlFor={`protocol_${item.id}`}
                                style={{
                                    width: '324px',
                                    cursor: 'pointer',
                                 
                                    background: '#E8F6FE',
                                    borderRadius: '18px',
                                    display: 'block',
                                    float: 'left',
                                
                                }}
                            >
                                <div className='flex items-center text-[14px] font-medium text-[#1D75F2] leading-4 p-4'>
                                    <LiaFileUploadSolid />
                                    <p>{fileNames[item.id] || 'Click to Upload'}</p>
                                </div>
                                <input
                                    name={`protocol_${item.id}`}
                                    onChange={(e) => handleFileChange(item.id, e.target.files)}
                                    type='file'
                                    id={`protocol_${item.id}`}
                                    style={{ display: 'none' }}
                                    multiple
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
