import React, { useEffect, useState } from 'react';
import { Form, Input, message, Row, Col, Table, Dropdown, Menu } from 'antd';
import { IoIosSearch } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineRemoveRedEye, MdOutlineCancel } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../main';
const List = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState(''); 


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
            
            const response = await fetch(`${BASE_URL}intekinfo?${params.toString()}`, {
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
            setData(result.data); 
        } catch (error) {
            setData([]); 
            // console.error('Error fetching user data:', error); 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [search]);

    // singel Intex informations //

    const singelInfo = async(id)=>{
        const token = JSON.parse(localStorage.getItem('token'));
        if(!token){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Unauthorized user',
            });
            return;
        }
        try{
            const response = await 
            fetch(`${BASE_URL}singel/itekinfo/${id}`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Accept':'application/json',
                    'Authorization': `Bearier ${token}`,
                },
            });
            if(!response.ok){
                throw new Error('Failed to fetch user data');
            }
            const result = await response.json();
            return result;

        }catch(error){
            // console.error('Error fetching document:', error); 
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to fetch document',
            });
        }
    }



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
            const response = await fetch(`${BASE_URL}parsonal-status`, {
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
        } catch (error) {
            // console.error('Error updating document status:', error); 
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update document status',
            });
        }
    };

    const handleMenuClick = async (key, userId) => {
        if (key === '1') {
            navigate(`/parsonal/${userId}`);
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
            dataIndex: 'first_name',
            key: 'first_name',
            render: (value, record) => (
                <div className='flex gap-2 capitalize'>
                   
                    <h1>{value} {record.last_name}</h1>
                </div>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
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
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Dropdown overlay={menu(record.id)}>
                    <HiOutlineDotsVertical className='cursor-pointer' />
                </Dropdown>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className='text-[#1DA1F2] text-[32px] font-normal p-1 w-full'>Client Request</h1>
                <Input
                    style={{ width: '320px', borderRadius: '28px', marginTop: '25px', fontSize: '16px', color: '#49454F' }}
                    placeholder="Search Here"
                    suffix={<IoIosSearch />}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Row>
                <Col span={24}>
                    <Table columns={columns} dataSource={data}  loading={loading} />
                </Col>
            </Row>
        </div>
    );
};

export default List;
