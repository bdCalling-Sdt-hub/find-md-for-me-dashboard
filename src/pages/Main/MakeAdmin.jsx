import React, { useEffect, useState } from 'react';
import { message, Input, Table, Dropdown, Menu, Select } from 'antd';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../main';
import { IoIosSearch } from "react-icons/io";
import { render } from 'react-dom';
const MakeAdmin = () => {
    const [clientDocument, setClientDocument] = useState([]); 
    // console.log(clientDocument); 
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('all');
    const [pagination, setPagination] = useState({ current: 1, pageSize: 8, total: 0 });
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    useEffect(() => {
        fetchClientDocument(pagination.current);
    }, [status, pagination.current, search]);


    const fetchClientDocument = async (page = 1, search = '') => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            setLoading(false);
            return;
        }
    
        try {
            const params = new URLSearchParams();
            if (status !== 'all') params.append("status", status);
            if (search) params.append("search", search); // Adding search parameter
    
            const response = await fetch(`${BASE_URL}user-document?page=${page}&${params.toString()}`, {
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
            setClientDocument(result.data.data);
            setPagination({
                current: result.data.current_page,
                pageSize: result.data.per_page,
                total: result.data.total,
            });
        } catch (error) {
            // console.error('Error fetching user data:', error); 
        } finally {
            setLoading(false);
        }
    };
    

    const fetchSingleDocument = async (id) => {
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
            const response = await fetch(`${BASE_URL}/user-document/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch document');
            }

            const result = await response.json();
            return result.data;
        } catch (error) {
            // console.error('Error fetching document:', error); 
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch document',
            });
        }
    };

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };
    const filteredData = clientDocument.filter(doc => {
        const fullName = `${doc.user?.first_name || ''} ${doc.user?.last_name || ''}`.toLowerCase();
        const email = (doc.user?.email || '').toLowerCase();
        const searchLower = search.toLowerCase();
    
        return fullName.includes(searchLower) || email.includes(searchLower);
    });
    const postDocumentStatus = async (id, status) => {
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
            const response = await fetch(`${BASE_URL}client-document-status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ id, status }),
            });

            if (!response.ok) {
                throw new Error('Failed to update document status');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Document ${status === 'approved' ? 'approved' : 'rejected'} successfully`,
            });
            fetchClientDocument(pagination.current);
        } catch (error) {
            // console.error('Error updating document status:', error); 
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update document status',
            });
        }
    };

    if (loading) {
        return <div>Loading ...</div>;
    }

    

    const handleMenuClick = async (key, userId) => {
        if (key === '1') {
            navigate(`/client-document-view/${userId}`);
        } else if (key === '2') {
            await postDocumentStatus(userId, 'approved');
        } else if (key === '3') {
            await postDocumentStatus(userId, 'rejected');
        }
    };

    const menu = (userId) => (
        <Menu onClick={({ key }) => handleMenuClick(key, userId)}>
            <Menu.Item key="1" icon={<MdOutlineRemoveRedEye />}>View</Menu.Item>
            <Menu.Item key="2" icon={<FcApproval />}>Approve</Menu.Item>
            <Menu.Item key="3" icon={<MdOutlineCancel />} danger>Reject</Menu.Item>
        </Menu>
    );

    const columns = [
        {
            title: 'S.no',
            dataIndex: 'id',
            key: 'id', 
            render:(_,record , index)=><p>{index+1}</p>
        },
        {
            title: 'User',
            dataIndex: ['user', 'first_name'],
            key: 'user',
            render: (text, record) => {
                const user = record.user || {}; // Fallback to an empty object if user is null or undefined
                return (
                    <div className='flex gap-2 capitalize'>
                      
                        <h1>{`${user.first_name || ''} ${user.last_name || ''}`}</h1>
                    </div>
                );
            },
        },
        {
            title: 'Email',
            dataIndex: ['user', 'email'],
            key: 'email',
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
                <Dropdown overlay={menu(record.id)}>
                    <HiOutlineDotsVertical className='cursor-pointer' />
                </Dropdown>
            ),
        },
    ];



    const handleStatusChange = (value) => {
        setStatus(value);
        setPagination({ ...pagination, current: 1 });
    };
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPagination({ ...pagination, current: 1 }); // Reset pagination when searching
    };
    return (
        <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className='text-[#1DA1F2] text-[32px] font-normal w-full'>Client Documents</h1>
            <Select
                placeholder="Status"
                style={{ width: 150, height: 42 }}
                onChange={handleStatusChange}
                value={status}
            >
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="approved">Approved</Select.Option>
                <Select.Option value="rejected">Rejected</Select.Option>
            </Select>

            <Input
                style={{ width: '320px', borderRadius: '28px', marginLeft: '20px', fontSize: '16px', color: '#49454F' }}
                placeholder="Search by name or email"
                suffix={<IoIosSearch />}
                value={search}
                onChange={handleSearchChange}
            />
        </div>
        <Table
            columns={columns}
            dataSource={filteredData.map((doc, index) => ({
                ...doc,
                key: index,
            }))}
            pagination={pagination}
            onChange={handleTableChange}
        />
    </div>
    );
};

export default MakeAdmin;
