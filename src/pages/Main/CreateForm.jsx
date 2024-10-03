import MetaTag from "../../components/MetaTag"
import Heading from "../../components/Heading";
import { RiFileUploadLine } from "react-icons/ri";
import React, { useEffect, useState } from 'react';

import { Button, Upload, Row, Col, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { BASE_URL } from '../../main';
import { IMAGE_URL } from "../../main";


const CreateForm = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await
          fetch(`${BASE_URL}user`, {
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
        setUser(result.user);
      } catch (error) {
        // console.error('Error fetching user data:', error); 
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();

  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading indicator
  }

  if (!user) {
    return <div>No user data available</div>; // Handle the case where no user data is available
  }
  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16} >
        <Col span={24}>
          <div >
            <div className="flex flex-1 items-center border p-5 border-[#1DA1F2]">
              <img className="w-[150px] h-[150px] rounded-full" src={IMAGE_URL +user.image || 'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'} alt="" />
              <div className="text-[32px] text-[#252B42] font-medium ml-5">{user.first_name  + ' '+ user.last_name}
                <h5 className="text-[#252B42] text-[16px] font-400">{user.email}</h5>
              </div>
            </div>
          </div>
        </Col>
        <Col span={24} className="mt-5">
          <div >
            <div className=" border-[1px] p-5 border-[#1DA1F2]">
              <div className="text-[24px] text-[#1DA1F2] font-semibold ml-5">Personal Information</div>

              <div className=" flex flex-1 p-5  gap-20 ">

                <div className="text-[#252B42] text-[18px] font-600">
                  <span style={{ fontWeight: "600" }}>First Name</span>
                  <h1 className="text-[#000000] text-[16px] font-400">{user.first_name}</h1>
                </div>
                <div className="text-[#252B42] text-[18px] font-600 ml-5">
                  <spa style={{ fontWeight: "600" }} >Last Name</spa>
                  <h1 className="text-[#000000] text-[16px] font-400">{user.last_name}</h1>
                </div>
                <div className="text-[#252B42] text-[18px] font-600">
                  <span style={{ fontWeight: "600" }} >Contact No</span>
                  <h1 className="text-[#000000] text-[16px] font-400">{user.phone}</h1>
                </div>
              </div>

              <div className=" flex flex-1 p-5  gap-5 ">

                <div className="text-[#252B42] text-[18px] font-600">
                  <span style={{ fontWeight: "600" }}>Role</span>
                  <h1 className="text-[#000000] text-[16px] font-400 w-[180px]">{user.user_type}  </h1>
                </div>
                <div className="text-[#252B42] text-[18px] font-600">
                  <span style={{ fontWeight: "600" }}>Email</span>
                  <h1 className="text-[#000000] text-[16px] font-400">{user.email}</h1>
                </div>
              </div>
            </div>
          </div>

        </Col>
      </Row>
    </div>


  )
}

export default CreateForm