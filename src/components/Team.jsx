import React, { useState, useEffect } from 'react';
import { Button, Form, Input, message, Table, Select, Modal } from 'antd';
import { MdOutlineRemoveRedEye, MdOutlineCancel } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { TbPhotoSquareRounded } from "react-icons/tb";
import Swal from 'sweetalert2';
import { BASE_URL, IMAGE_URL_1 } from '../main';


const Team = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState('all');
    const [modalData, setModalData] = useState(null);
    const navigate = useNavigate();
   // const baseUrl = 'http://192.168.10.201:3000/storage/';
    const fetchUserData = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (search) params.append("search", search);
            if (status && status !== 'all') params.append("status", status);

            const response = await fetch(`${BASE_URL}my-team?${params.toString()}`, {
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
            // console.log(result);  // Log the response to see its structure

            if (Array.isArray(result.data.data)) {
                setData(result.data.data);
            } else {
                // console.error('Unexpected data format:', result); 
            }
        } catch (error) {
            // console.error('Error fetching user data:', error); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [search, status]);

    const postDocumentStatus = async (userId, status) => {
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
            const response = await fetch(`${BASE_URL}teame-status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: userId,
                    status: status
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update personal status');
            }
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Document status updated successfully',
            });
            fetchUserData();
            handleCancel();
        } catch (error) {
            // console.error('Error updating document status:', error); 
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update document status',
            });
        }
    };



    const columns = [
        {
            title: 'S.no',
            dataIndex: 'id',
            key: 'id', 
            render:(_, record ,index)=><p>{index+1}</p>
        },
        {
            title: 'User',
            dataIndex: 'first_name',
            key: 'first_name',
            render: (text, record) => (
                <div className='flex gap-2 capitalize'>                   
                    <h1>{`${record?.user?.first_name || "Empty"} ${record?.user?.last_name || ""}`}</h1>
                </div>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text, record) => (
                <div className='flex gap-2'>                   
                    <h1>{`${record?.user?.email || "Empty"} `}</h1>
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status', 
            render  : (_, record) => (
                <div className='capitalize'>
                    <h1>{record?.status}</h1>
                </div>
            ),
        }, 
        {
            title: 'Check',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <FaEye onClick={() => showModal(record)} className=' cursor-pointer' />
            ),
        },
    ];

    const showModal = (record) => {
        setModalData(record);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleStatusChange = (value) => {
        setStatus(value);
    }; 

    // console.log(modalData); 

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className='text-[#1DA1F2] text-[32px] font-normal w-full'>Client Team</h1>
                <Select
                    placeholder="Status"
                    style={{
                        width: 150,
                        height: 42,
                    }}
                    onChange={handleStatusChange}
                    value={status}
                >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="approved">Approved</Select.Option>
                    <Select.Option value="rejected">Rejected</Select.Option>
                </Select>
            </div>

            <Table columns={columns} dataSource={data} pagination={{ pageSize: 8 }} loading={loading} />

            {/* Modal section */}
            {modalData && (
                <Modal width={'40%'} open={isModalOpen} onCancel={handleCancel} footer={null}>
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#E8F6FE] w-[100%]">
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6 w-[100%]" action="#" method="POST">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                        First Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            value={modalData.first_name}
                                            className="block w-full rounded-md border-0 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 bg-white focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Last Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            value={modalData.last_name}
                                            className="block w-full rounded-md border-0 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 bg-white focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Date of Birth
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            value={modalData.dob}
                                            className="block w-full rounded-md border-0 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 bg-white focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input 
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={modalData.email}
                                            className="block w-full rounded-md border-0 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 bg-white focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Phone Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            value={modalData.phone}
                                            className="block w-full rounded-md border-0 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 bg-white focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            disabled
                                        />
                                    </div>
                                    <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Role
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            value={modalData.Role}
                                            className="block w-full rounded-md border-0 py-1.5 h-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 p-2 bg-white focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            disabled
                                        />
                                    </div>
                                </div>
                                </div>
                                <div className='mt-5 text-[16px] leading-3 font-normal '>  Please provide your license(s)/certificate(s) number(s) </div>
                                <a href={`${IMAGE_URL_1}${modalData.license_certificate_number}`} target='_blank'>
                                <div className='w-[100%]  bg-white rounded-[10px] p-1 mt-5'>
                                    <div className='items-center flex text-md text-[#1DA1F2] font-medium leading-5 pl-5 gap-1 py-2'>
                                        <TbPhotoSquareRounded  size={22}/> {modalData.license_certificate_number}
                                    </div>
                                   
                                </div>
                                </a>
                                <div className='mt-5 text-[16px] leading-3 font-normal '>  Upload additional certificates </div>
                                <a href={`${IMAGE_URL_1}${modalData.addisional_certificate}`} target='_blank'>
                                <div className='w-[100%] bg-white rounded-[10px]  mt-5'>
                                    <div className='items-center flex text-md text-[#1DA1F2] font-medium leading-5 pl-5 gap-1 py-2'>
                                        <TbPhotoSquareRounded  size={22}/> {modalData.addisional_certificate}
                                    </div>
                              
                                </div>
                                </a>
                                <center>
                                    <Button onClick={() => postDocumentStatus(modalData.id, 'approved')} className='w-[138px] h-[49px] bg-[#80C738] text-2xl text-white font-medium mr-3'>Approve</Button>
                                    <Button onClick={() => postDocumentStatus(modalData.id, 'rejected')} className='w-[138px] h-[49px] bg-[#DF3232] text-2xl text-white font-medium'>Reject</Button>
                                </center>
                            </form>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Team;
