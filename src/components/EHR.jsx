import React, { useEffect, useState } from 'react';
import { FaRegQuestionCircle, FaTrash } from 'react-icons/fa';
import { MdOutlineEdit } from "react-icons/md";
import { Modal, Button, Form, Input } from 'antd';
import Swal from 'sweetalert2';
import { BASE_URL } from '../main';

// const BASE_URL = 'http://192.168.30.199:3000/api/';

const EHR = () => {
    const [ehr, setEhr] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentEhr, setCurrentEhr] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchEhrData();
    }, []);

    const fetchEhrData = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}ehr`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch EHR data');
            }
            const result = await response.json();
            setEhr(result.data);
        } catch (error) {
            // console.error('Error fetching EHR data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Unauthorized user',
            });
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}ehr-delete/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete EHR');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'EHR deleted successfully',
            });
            fetchEhrData();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete EHR',
            });
        }
    };

    const handleAddOrUpdate = async (values) => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Unauthorized user',
            });
            return;
        }

        const url = isEditMode ? `${BASE_URL}ehr-update/${currentEhr.id}` : `${BASE_URL}ehr-store`;
        // const method = isEditMode  'POST';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(values),
            });          

            if (!response.ok) {
                throw new Error('Failed to save EHR');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: isEditMode ? 'EHR updated successfully' : 'EHR added successfully',
            });
            fetchEhrData();
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to save EHR',
            });
        }
    };

    const showEditModal = (ehr) => {
        setCurrentEhr(ehr);
        setIsEditMode(true);
        form.setFieldsValue(ehr);
        setIsModalOpen(true);
    };

    const showAddModal = () => {
        setIsEditMode(false);
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    if (loading) {
        return <div>Loading...</div>; // Or a proper loading indicator
    }

    return (
        <div>
            <div className=' text-end '>
                <Button type="primary" className='m-3'  onClick={showAddModal}>
                Add Step
                </Button>

            </div>

            <div className='bg-[#ffffff] p-5'>

                {ehr.map((item , index) => (
                    <div className='flex gap-6 mb-7' key={item.id}>
                       <p className=' py-3 font-semibold '>{index+1}.</p>
                        <div className='w-full'>
                            <div
                                className='p-4 rounded-lg text-[#707070] leading-6 text-[16px] font-medium mb-4 bg-[#F9F9F9]'
                                style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}
                            >
                                <p className='text-[#636363] text-base leading-6 poppins-medium text-[16px]'>{item.question}</p>
                            </div>
                            <div
                                className='p-4 rounded-lg text-[#818181] text-[16px] font-normal text-base leading-6 poppins-regular bg-[#F9F9F9]'
                                style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}
                            >
                                {item.answare}
                            </div>
                        </div>
                        <div className='w-10 cursor-pointer h-10 border border-[#E6E5F1] rounded-lg flex items-center justify-center' onClick={() => handleDelete(item.id)}>
                            <FaTrash size={20} color='#808080' />
                        </div>
                        <div className='w-10 cursor-pointer h-10 border border-[#E6E5F1] rounded-lg flex items-center justify-center' onClick={() => showEditModal(item)}>
                            <MdOutlineEdit size={20} color='#808080' />
                        </div>
                    </div>
                ))}

                <Modal
                   
                    visible={isModalOpen}
                    onCancel={handleModalCancel}
                    footer={null}
                    width={"30%"}
                   
                    
                >
                    <Form form={form} layout="vertical" onFinish={handleAddOrUpdate} className="p-12 mt-12">
                        <Form.Item
                            name="question"
                            label="EHR Question"
                            rules={[{ required: true, message: 'Please input the question!' }]}
                        >
                                     <input
                                    className=" p-2 block w-full rounded-md border-0 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                        </Form.Item>
                        <Form.Item
                            name="answare"
                            label="EHR Answer"
                            rules={[{ required: true, message: 'Please input the answer!' }]}
                        >
                            <input className=" p-2 block w-full rounded-md border-0 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </Form.Item>
                        <center>
                            <Button className="m-10 w-[138px] h-[49px] bg-[#C738BD] "  type="primary" htmlType="submit">
                                {isEditMode ? 'Update' : 'Submit'}
                            </Button>
                        </center>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default EHR;
