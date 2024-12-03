import React, { useEffect, useState } from 'react';
import { Button, Form, Select, Input, message, Row, Col, Table, Dropdown, Menu, Modal } from 'antd';
import { IoIosSearch } from "react-icons/io";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineRemoveRedEye, MdOutlineCancel } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import Swal from 'sweetalert2';
import { BASE_URL } from '../main';
import { IMAGE_URL } from '../main';

const UserManagement = () => {
    const [users, setUsers] = useState([]); 

    const [tier, setTier] = useState();
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ClientModel, setClientModel] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); 
    const [besinessData, setBesinessData] = useState({
        tier_service_interrested : "",
        client_type : ""
    });  

 
    
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchUserManagement();
        showTier();
    }, [search]);

    const fetchUserManagement = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const params = new URLSearchParams();
            if (search) params.append("search", search);
            const response = await fetch(`${BASE_URL}all-user?${params.toString()}`, {
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
        //   console.log(result);  
            setUsers(result.data);
            
        } catch (error) {
            // console.error('Error fetching user data:', error); 
        } finally {
            setLoading(false);
        }
    }; 

    // business resourse status  
    const handleBusinessStatus =async(id) =>{
        // console.log(id);   

        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}update-user/${id}`, {
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
        
       
                fetchUserManagement()   
            
        } catch (error) {
            // console.error('Error fetching user data:', error); 
        }  finally {
            setLoading(false);
        }
    }

    // show tiear //

    const showTier = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            setLoading(false);
            return;
        }

        try {
           
            const response = await fetch(`${BASE_URL}show-tiear`, {
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
            setTier(result);   
            // console.log(result)           
        } catch (error) {
            // console.error('Error fetching user data:', error); 
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (userId, status) => {
       
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            message.error('Unauthorized user');
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}user-status`, {
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
                throw new Error('Failed to update user status');
            }
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Document ${status === 'approved' ? 'approved' : 'rejected'} successfully`,
            });
            fetchUserManagement();
        } catch (error) {
            // console.error('Error updating user status:', error); 
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update document status',
            });
        }
    };

    const updateProfileStatus = async (id, status) => {       
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            message.error('Unauthorized user');
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}update-profile-status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: id,
                    status: status
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update user status');
            }
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Update profile successfully',
            });
            fetchUserManagement();
            handleCancel();
        } catch (error) {
            // console.error('Error updating user status:', error); 
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update document status',
            });
            handleCancel();
        }
    };

    const updateProfileAccept = async (id) => {

        // console.log(id);
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            message.error('Unauthorized user');
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}profile-update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: id,
                    status : "active"
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update user status');
            }
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Update profile successfully',
            });
            fetchUserManagement();
            handleCancel();
        } catch (error) {
            // console.error('Error updating user status:', error); 
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update document status',
            });
            handleCancel();
        }
    };

    // Update Client type in admin //

        const updateClientType = async (id, value) => {  

            // const tier_service_interrested=  value?.business_data?.tier_service_interrested 
            // const client_type =  value?.business_data?.client_type 
            // const id = value?.business_data?.id 
            // console.log(id,tier_service_interrested,client_type)
       // const id = selectedUser?.business_data?.id;
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            message.error('Unauthorized user');
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}client-type-update/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(
                    value
                ),
            }); 

        

            if (!response.ok) {
                throw new Error('Failed to update user status');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Update profile successfully',
            });

            fetchUserManagement();
            handleClientCancel();
        } catch (error) {
            // console.error('Error updating user status:', error); 
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update document status',
            });
            handleClientCancel();
        }
    };

    const handleApprove = (userId) => updateStatus(userId, 'active');
    const handleReject = (userId) => updateStatus(userId, 'deactive');
    const handleProfileReject = (userId) => updateProfileStatus(userId, 'rejected');
    const handleProfileAccept = (userId) => updateProfileAccept(userId, 'active');

    if (loading) {
        return <div>Loading...</div>; // Or a proper loading indicator
    }

    const showModal = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    // Update client type modal //

    const showClientModal = (user) => {
        setClientModel(user);
        setIsModalOpen(true);
    };

    const handleClientCancel = () => {
        setIsModalOpen(false);
        setClientModel(null);
    };

    const options = [
        { label: 'Individual', value: 'Individual' },
        { label: 'Business', value: 'Business' },
    ];

    const options1 = tier ? tier?.map(item => ({
        label: item.tyer_name,  
        value: item.tyer_name,          
    })) : [];

    const handleChange = (value) => {
        // console.log(`selected ${value}`);
     
    };


    ////////////////////

    const handleMenuClick = (user, e) => { 
   

        if (e.key === '1') { 
          
            showModal(user); 
        } else if (e.key === '2') {
            handleApprove(user?.user?.id);
        } else if (e.key === '3') {
            handleReject(user?.user?.id);
        }
    };

    const items = [
        {
            label: 'View',
            key: '1',
            icon: <MdOutlineRemoveRedEye />,
        },
        {
            label: 'Approve',
            key: '2',
            icon: <FcApproval />,
        },
        {
            label: 'Reject',
            key: '3',
            icon: <MdOutlineCancel />,
            danger: true,
        },
    ];

    const columns = [
        {
            title: 'S.no',
            dataIndex: 'key',
            key: 'key',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'User',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <div className='flex gap-2'>                  
                    {/* <img className='w-8' src={IMAGE_URL + record?.user?.image || "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"} /> */}
                    <h1>{`${record?.user?.first_name} ${record?.user?.last_name}`}</h1>
                </div>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text, record) => {
                return record?.user ? record.user?.email : 'No Updates';
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => {
                return <div className='capitalize'> {record?.user ? record.user?.status : 'No Updates'} </div> 
            },

        },
        {
            title: 'Profile update status',
            dataIndex: 'profileStatus',
            key: 'profileStatus',
            render: (text, record) => {
                return record?.user?.user_update ? record?.user?.user_update?.status : 'No Updates';
            },

        }, 
        {
            title: 'Business Status',
            dataIndex: 'business_status',
            key: 'business_status',
            render: (text, record) => { 
                // console.log(record); 
       return <Button  
        onClick={()=>handleBusinessStatus(record?.user?.id)}
       style={{
        height:"40px" ,
        borderRadius:"10px" ,
        color:"white" ,  
        backgroundColor: record?.user?.another_status === "disable" ? "#1D75F2" : "#C738BD"
         }} 
         className='capitalize'> 
         {record?.user?.another_status ?  record?.user?.another_status : "No Status"}
         </Button>

            },

        },
        {
            title: 'View',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (  
               
                <Dropdown overlay={<Menu items={items} onClick={(e) => handleMenuClick(record, e)} />}>
                    <HiOutlineDotsVertical className='cursor-pointer' />
                </Dropdown>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className='text-[#1DA1F2] text-[32px] font-normal p-1 w-full'>User Management </h1>
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
                    <Table columns={columns} dataSource={users} pagination={{ pageSize: 8 }} rowKey="id" />
                </Col>
                <Modal width={'30%'} open={ClientModel} onCancel={handleClientCancel} footer={null}>
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#E8F6FE]">

                        <div className=" sm:mx-auto sm:w-full sm:max-w-sm ">
                            <p className='text-2xl font-medium text-black text-center'>Update client type</p>
                            <Form style={{ marginTop: '30px' }}  >
                                <Select
                                    name='tier_service_interrested'
                                    placeholder="Select client type"
                                    // mode="tags"
                                    style={{
                                        width: '100%',
                                        height: '40px',
                                        marginBottom: '10px',
                                    }}
                                    onChange={(e)=>{
                                        // console.log(e)
                                        setBesinessData(pre=>{
                                        return {...pre, client_type : e}
                                        })
                                    }}
                                    // tokenSeparators={[',']}
                                    options={options}
                                />

                                <Select
                                    name='client_type'
                                    placeholder="Select tier name"
                                    
                                    // mode="tags"
                                    style={{
                                        width: '100%',
                                        height: '40px',
                                    }}
                                    
                                    onChange={(e)=>{
                                        // console.log(e)
                                        setBesinessData(pre=>{
                                        return {...pre, tier_service_interrested : e}
                                        })
                                    }}
                                    // tokenSeparators={[',']}
                                    options={options1}
                                /> 

                            <Form.Item className='flex justify-center gap-2 mt-8'>
                                <Button htmlType='button' onClick={()=>updateClientType(selectedUser?.business_data?.id,besinessData)} className='px-4 bg-[#C738BD] text-white rounded  hover:border transition hover:border-[#C738BD] hover:bg-transparent hover:text-[#C738BD]'>Update</Button>
                            </Form.Item>



                            </Form>

                          
                        </div>
                    </div>
                </Modal>

                <Modal width={'30%'} open={isModalOpen} onCancel={handleCancel} footer={null}>
                    {selectedUser && (
                        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#E8F6FE]">
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <p className='text-2xl font-medium text-black text-center'>Present Profile Information</p>
                                <div className='flex flex-1  justify-between text-[#252B42] text-[16px] font-normal leading-6 mt-5'>
                                    <div>
                                        <h1 className='mt-3'>Name</h1>
                                        <h1 className='mt-3'>Email</h1>
                                        <h1 className='mt-3'>Contact</h1>
                                        <h1 className='mt-3'>Business Name</h1>
                                        <h1 className='mt-3'>Business Address</h1>
                                        <h1 className='mt-3'>Tier Name</h1>
                                        <h1 className='mt-3'>Client Type</h1>

                                    </div>
                                    <div className='text-right'>
                                        <h1 className='mt-3'>{`${selectedUser?.user?.first_name || " Empty"} ${selectedUser?.user?.last_name}`}</h1>
                                        <h1 className='mt-3'>{selectedUser?.user?.email || "Empty"}</h1>
                                        <h1 className='mt-3'>{selectedUser?.user?.phone || "Empty "}</h1>
                                        <h1 className='mt-3'>{selectedUser?.user?.buisness_name || " Empty"}</h1>
                                        <h1 className='mt-3'>{selectedUser?.user?.buisness_address || "Empty "}</h1>
                                        <h1 className='mt-3'>{selectedUser?.business_data?.tier_service_interrested || "Empty "}</h1>
                                        <h1 className='mt-3'>{selectedUser?.business_data?.client_type || " Empty"}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                                <p className='text-2xl font-medium text-black text-center'>Update Profile Information</p>
                                <div className='flex flex-1 items-center justify-between text-[#252B42] text-[16px] font-normal leading-6 mt-5'>
                                    <div>
                                        <h1 className='mt-3'>Name</h1>
                                        <h1 className='mt-3'>Email</h1>
                                        <h1 className='mt-3'>Contact</h1>
                                        <h1 className='mt-3'>Business Name</h1>
                                        <h1 className='mt-3'>Business Address</h1>
                                    </div>
                                    <div className='text-right'>
                                        {selectedUser?.user?.user_update && (
                                            <>
                                                {/* {console.log(selectedUser)} */}
                                                <h1 className='mt-3'>{`${selectedUser?.user?.user_update?.first_name} ${selectedUser?.user?.user_update?.last_name || "Empty"}`}</h1>
                                                <h1 className='mt-3'>{selectedUser?.user?.user_update?.email || "Empty"}</h1>
                                                <h1 className='mt-3'>{selectedUser?.user?.user_update?.phone || "Empty"}</h1>
                                                <h1 className='mt-3'>{selectedUser?.user?.user_update?.buisness_name || "Empty"}</h1>
                                                <h1 className='mt-3'>{selectedUser?.user?.user_update?.buisness_address || "Empty"}</h1>
                                            </>
                                        )}
                                    </div>
                                </div>


                                <div className='flex justify-center gap-2 mt-8'>
                                    <button onClick={() => handleProfileAccept(selectedUser?.user?.id)} className='px-4 bg-[#C738BD] text-white rounded py-2 hover:border transition hover:border-[#C738BD] hover:bg-transparent hover:text-[#C738BD]'>Update Information</button>
                                    <button onClick={() => handleProfileReject(selectedUser?.user?.user_update?.id)} className='px-5 border border-red-500 text-red-500  rounded py-2 transition hover:bg-red-500 hover:text-white'>Reject</button>
                                    <button onClick={() => showClientModal(selectedUser)} className='px-4 bg-[#C738BD] text-white rounded py-2 hover:border transition hover:border-[#C738BD] hover:bg-transparent hover:text-[#C738BD]'>Update Tier</button>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            </Row>
        </div>
    );
};

export default UserManagement;
