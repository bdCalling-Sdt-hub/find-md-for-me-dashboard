import { Button, Form, Input } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import MetaTag from '../../components/MetaTag';
import Swal from 'sweetalert2';
import { BASE_URL, IMAGE_URL } from '../../main';

const Profile = () => {

    const [content, setContent] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [buisnessname, setBuisnessname] = useState('');
    const [buisnessaddress, setBuisnessaddress] = useState('');
    const [usertype, setUsertype] = useState('USER');

    const [imgURL, setImgURL] = useState();
    const [image, setImage] = useState();
    const [tab, setTab] = useState(new URLSearchParams(window.location.search).get('tab') || "profile");
    const fetchUserData = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            setLoading(false);
            return;
        } 

        // console.log(user); 

        try {
            const response = await fetch(`${BASE_URL}user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const result = await response.json();
            const userData = result.user;
            setUser(userData);
            setFirstname(userData.first_name);
            setLastname(userData.last_name);
            setEmail(userData.email);
            setPhone(userData.phone);
            setBuisnessname(userData.buisness_name);
            setBuisnessaddress(userData.buisness_address);
            setUsertype(userData.user_type);

        } catch (error) {
            // console.error('Error fetching user data:', error); 
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchUserData();
    }, []);

    const updateDescriptions = async (formData) => {
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
            const response = await fetch(`${BASE_URL}admin-update/${user.id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const result = await response.json();
            Swal.fire({
                icon: 'success',
                title: result.message,
                text: 'Profile updated successfully',
                
            });
            fetchUserData()
            window.location.reload()
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update profile',
            });
        }
    }

    const handleFormSubmit = (values) => {
        if (!user) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'User data not loaded',
            });
            return;
        }

        const formData = new FormData();
        formData.append('first_name', values.first_name);
        formData.append('last_name', values.last_name);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('buisness_name', values.buisness_name);
        formData.append('buisness_address', values.buisness_address);
        // formData.append('user_type', values.user_type);

        // Include the image if selected
        if (image) {
            formData.append('image', image);
        }

        updateDescriptions(formData);
        
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const handlePageChange = (tab) => {
        setTab(tab);
        const params = new URLSearchParams(window.location.search);
        params.set('tab', tab);
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const imgUrl = URL.createObjectURL(file);
            setImgURL(imgUrl);
        }
    }

    return (
        <div className="p-6">
            <MetaTag title={"Profile"} />
            <div className='w-[841px] mx-auto'>
                <div className='bg-[#E5F4EF] flex items-center justify-center rounded-lg p-6 mb-6'>
                    <input type="file" onChange={handleChange} id='img' name="image" style={{ display: "none" }} />
                    <div className="w-[198px]">
                        <div className='relative w-fit mx-auto'>
                        <img
                            style={{ width: 120, height: 120, borderRadius: "100%", margin: "0 auto" }}
                            src={imgURL ? imgURL : user?.image ? `${IMAGE_URL}${user.image}` : imgURL || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"}
                            alt="Profile"
                        />
                            <label
                                htmlFor="img"
                                className='
                                    absolute top-1/2 -right-2 
                                    bg-white 
                                    rounded-full 
                                    w-6 h-6 
                                    flex items-center justify-center 
                                    cursor-pointer
                                '
                            >
                                <CiEdit />
                            </label>
                        </div>
                        <p className='mt-4 text-center text-[#595959] text-[32px] leading-[48px] raleway-medium '>{user ? `${user.first_name} ${user.last_name}` : "User"}</p>
                    </div>
                </div>

                <div className='flex items-center justify-center rounded-lg p-6 '>
                    <Form
                        layout="vertical"
                        className='grid grid-cols-12 gap-6 w-[841px]'
                        onFinish={handleFormSubmit}
                        initialValues={{
                            first_name: firstname,
                            last_name: lastname,
                            email: email,
                            phone: phone,
                            buisness_name: buisnessname,
                            buisness_address: buisnessaddress,
                            user_type: usertype
                        }}
                    >
                        <Form.Item
                            name="first_name"
                            label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">First Name</p>}
                            className='col-span-6'
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: "42px",
                                    border: "1px solid #DCDDDE",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    color: "black",
                                    outline: "none"
                                }}
                                type="text"
                                placeholder="Enter First Name"
                            />
                        </Form.Item>
                        <Form.Item
                            name="last_name"
                            label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Last Name</p>}
                            className='col-span-6'
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: "42px",
                                    border: "1px solid #DCDDDE",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    color: "black",
                                    outline: "none"
                                }}
                                type="text"
                                placeholder="Enter Last Name"
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Email</p>}
                            className='col-span-6'
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: "42px",
                                    border: "1px solid #DCDDDE",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    color: "black",
                                    outline: "none"
                                }}
                                type="text"
                                placeholder="Enter Email"
                            />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Phone</p>}
                            className='col-span-6'
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: "42px",
                                    border: "1px solid #DCDDDE",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    color: "black",
                                    outline: "none"
                                }}
                                type="text"
                                placeholder="Enter Contact Number"
                            />
                        </Form.Item>

                        <Form.Item
                            name="buisness_name"
                            label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Business Name</p>}
                            className='col-span-6'
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: "42px",
                                    border: "1px solid #DCDDDE",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    color: "black",
                                    outline: "none"
                                }}
                                type="text"
                                placeholder="Enter Business Name"
                            />
                        </Form.Item>
                        <Form.Item
                            name="buisness_address"
                            label={<p className="text-[#415D71] text-sm leading-5 poppins-semibold">Business Address</p>}
                            className='col-span-6'
                            style={{ marginBottom: 0 }}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: "42px",
                                    border: "1px solid #DCDDDE",
                                    borderRadius: "8px",
                                    padding: "16px",
                                    color: "black",
                                    outline: "none"
                                }}
                                type="text"
                                placeholder="Enter Business Address"
                            />
                        </Form.Item>

                        <Form.Item
                            className='col-span-12'
                            style={{ marginBottom: 0 }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                style={{
                                    width: 158,
                                    height: 48,
                                    fontWeight: "400px",
                                    background: "#12354E",
                                    color: "#FCFCFC",
                                    margin: "auto"
                                }}
                                className='raleway-medium text-sm leading-4'
                            >
                                Save & Change
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Profile;
