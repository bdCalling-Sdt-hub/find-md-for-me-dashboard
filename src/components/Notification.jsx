import { useState, useEffect } from 'react';
import {  message, Pagination } from 'antd';
import Swal from 'sweetalert2';
import { BASE_URL } from '../main';
import { useNavigate } from 'react-router-dom';
const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage] = useState(10);  

    useEffect(() => {
        fetchNotifications(currentPage);
    }, [currentPage]);

    const fetchNotifications = async (page) => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}notification?page=${page}&per_page=${perPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch notifications');
            }

            const result = await response.json();
            setNotifications(result?.data || []);
            setTotalPages(result?.total_pages || 1); // Total pages from API
            // console.log(result) 
        } catch (error) {
            // console.error('Error fetching notifications:', error); 
            message.error('Error fetching notifications');
        } finally {
            setLoading(false);
        }
    };
    const navigate = useNavigate();
    const rereadAt = async (id) => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            message.error('Unauthorized');
            return;
        }
    
        try {
            const response = await fetch(`${BASE_URL}update-notification/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(token)}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to update notification status');
            }
    
            // Update the notification status locally
            setNotifications(notifications.map(notification =>
                notification.id === id ? { ...notification, read_at: new Date().toISOString() } : notification
            ));   

            fetchNotifications(currentPage)
    
        } catch (error) {
            // console.error('Error updating notification status:', error); 
    
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update notification status',
            });
        }
    };

    return (
        <div>
            <div className='bg-[#ffffff] p-5'>
                <h1 className='text-[#1D75F2] text-[24px] font-medium pb-5'>Notification</h1>
                <div className='gap-6 mb-7'>
                    {loading ? (
                        <p>Loading notifications...</p>
                    ) : (
                        notifications.map(notification => (  
                            <div
                               
                                key={notification.id}
                                onClick={() => {
                                    rereadAt(notification?.id).then(res=>{
                                        notification?.data?.message === 'Uploaded new document'
                                        ? navigate('/client-document')
                                        : navigate('/total-list');
                                    })
                                }}
                                className='w-full cursor-pointer'
                            >
                               
                                <div
                                    className={`p-4 rounded-lg text-[#707070] leading-6 text-[16px] font-medium mb-4 ${notification?.read_at ? 'bg-[#F9F9F9]' : 'bg-[#E9EFFA]'}`}
                                    style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}
                                >
                                    <p className='text-[#555555] text-base leading-6 poppins-medium text-[16px] font-medium'>
                                        {notification?.data?.message}
                                        <span className='ml-5 text-[#A7A7A7] text-[14px] font-medium'>{new Date(notification?.created_at).toLocaleDateString()}</span>
                                        <span className='ml-5 text-[#A7A7A7] text-[14px] font-medium'>{new Date(notification?.created_at).toLocaleTimeString()}</span>
                                        <div className='text-[#818181] text-[14px] font-medium'>
                                        {notification?.data?.first_name || notification?.data?.new_data?.first_name} {notification?.data?.last_name || notification?.data?.new_data?.last_name}, booking date {new Date(notification.created_at).toLocaleDateString()}.
                                        </div>
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <Pagination
                    current={currentPage}
                    total={totalPages * perPage}
                    onChange={(page) => setCurrentPage(page)}
                    pageSize={perPage}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};

export default Notification;
