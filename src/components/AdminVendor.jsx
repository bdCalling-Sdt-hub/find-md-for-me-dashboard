import React, { useState, useEffect } from 'react';
import { Button, Form, message, Row, Col, Table, Modal } from 'antd';
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from 'sweetalert2';
import { BASE_URL } from '../main';



const AdminVendor = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}vendor`, {
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
            const result = await response.json();
            setUserData(result.data.map((user, index) => ({
                key: index + 1,
                user: user.vendor_name,
                id: user.id,
            })));
        } catch (error) {
            // console.error('Error fetching user data:', error); 
          
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
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
            const response = await fetch(`${BASE_URL}vendor-delete/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete vendor');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'vendor deleted successfully',
            });
            fetchUserData();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete vendor',
            });
        }
    };

    const addAdmin = async (values) => {
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
            const response = await fetch(`${BASE_URL}vendor-store`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Failed to add vendor');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Vendor added successfully',
            });
            fetchUserData(); 
            form.resetFields("")
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add vendor',
            });
        }
    };

    const showDeleteModal = (id) => {
        setDeleteUserId(id);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        deleteUser(deleteUserId);
        setIsDeleteModalOpen(false);
    };
    const handleCancel = () => {
        setIsDeleteModalOpen(false);
    };

    const openAddAdminModal = () => {
        setIsAddAdminModalOpen(true);
    };

    const closeAddAdminModal = () => {
        setIsAddAdminModalOpen(false);
    };

    const handleAddAdminSubmit = (values) => {
        addAdmin(values);
        setIsAddAdminModalOpen(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const columns = [
        {
            title: 'S.no',
            dataIndex: 'key',
            key: 'key', 
            render:(_,record , index)=><p>{index+1}</p>
        },
        {
            title: 'Vendor name',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'action',
            render: (id) => (
                <RiDeleteBinLine className='cursor-pointer text-[16px]' onClick={() => showDeleteModal(id)} />
            ),
        },
    ];

    const handleMenuClick = (e) => {
        message.info(`Clicked on menu item ${e.key}`);
        // console.log('Clicked on', e);  
    };

    return (
        <div style={{ padding: '20px' }}>
            <div className="flex items-center mb-6 justify-end">                
                <Button onClick={openAddAdminModal} style={{ color: '#ffffff', padding:'5px', width:'147px', height:'40px' }} className='font-normal text-sm text-[#ffffff]' type="primary" >
                    + Add Vendors
                </Button>
            </div>
            <Row>
                <Col span={24}>
                    <Table columns={columns} dataSource={userData} pagination={false} />
                </Col>
            </Row>

            {/* <Modal open={isDeleteModalOpen} onCancel={() => setIsDeleteModalOpen(false)} onOk={handleDeleteConfirm} title="Confirm Delete">
                <h1 className=' justify-center items-center p-5'>Are you sure you want to delete this user?</h1>
            </Modal> */}
            <Modal open={isDeleteModalOpen} onCancel={handleCancel} footer={null}>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#E8F6FE]">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2>Are you sure you want to delete this vendor?</h2>
                        <div className="flex justify-end gap-4 mt-4">
                            <Button onClick={handleCancel}>Cancel</Button>
                            <Button type="primary" onClick={handleDeleteConfirm}>Yes</Button>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal open={isAddAdminModalOpen} onCancel={closeAddAdminModal} footer={null}>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#E8F6FE]">
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <Form form={form} onFinish={handleAddAdminSubmit} className="space-y-6">
                            <Form.Item
                                label="Vendors Name"
                                name="vendor_name"
                                rules={[{ required: true, message: 'Please input the vendor\'s name!' }]}
                            >
                                <input 
                                    className=" p-2 block w-full rounded-md border-0 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </Form.Item>
                            <center><Button htmlType="submit" className='w-[138px] h-[49px] bg-[#C738BD] text-2xl text-white font-medium'>Submit</Button></center>
                        </Form>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdminVendor;
