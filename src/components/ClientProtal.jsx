import React, { useState, useEffect } from 'react';
import {
    Button, Cascader, DatePicker, Form, Input, Checkbox, Radio, Mentions, Select, TreeSelect, Row, Col, message, Space
} from 'antd';
import { PiArrowLeftFill } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import AppointmentInfo from '../components/Appoinment';
import BuisnessInfo from '../components/BuisnessInfo';
import { LiaFileUploadSolid } from "react-icons/lia";
import Protocols from '../components/Protocols';
import StandingOrder from '../components/StandingOrder';
import Policies from '../components/Policies';
import Consents from '../components/Consents';
import Swal from 'sweetalert2';
import { BASE_URL } from '../main';

const ClientProtal = () => {
   
    const [document, setDocument] = useState(null);    
    const [loading, setLoading] = useState(true);   
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchDocument = async () => {
            const token = JSON.parse(localStorage.getItem('token'));

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
                const result = await response.json();// Check the response
                setDocument(result);// Set document directly if result contains the user data
            //    console.log(document) 
            } catch (error) {
                // console.error('Error fetching document:', error); 
            }
        };
        fetchDocument();
    }, []);

   

 
    const navigate = useNavigate();
    const buttonStyle = {
        transition: 'none',
        backgroundColor: 'transparent',
        color: '#737373',
        fontWeight: 500,
        fontSize: '18px',
        height: '44px'
    };

    const [btn, setBtn] = useState('Protocols');

    const handleClick = (Protocols) => {
        setBtn(Protocols);
    };



    const renderComponent = () => {
        switch (btn) {
            case 'Protocols':
                return (
                    <div>
                        <Protocols data={(document) } />
                    </div>

                )

            case 'Standing':
                return <StandingOrder data={document} />
            case 'Policies':
                return <Policies  data={document} />;
            case 'Consents':
                return <Consents data={document} />;
            default:
                return null;
        }
    };
    return (
        <div>
            <div className='flex '>
                <Link to="/client-portal"><span className='text-3xl font-bold'><PiArrowLeftFill /></span></Link>
                <div className='flex flex-1 justify-center gap-5'>
                    <Button
                        onClick={() => handleClick('Protocols')}
                        style={btn === 'Protocols' ? { ...buttonStyle, backgroundColor: '#C738BD', color: 'white' } : buttonStyle}

                    >
                        Protocols
                    </Button>
                    <Button
                        onClick={() => handleClick('Standing')}
                        style={btn === 'Standing' ? { ...buttonStyle, backgroundColor: '#C738BD', color: 'white' } : buttonStyle}
                    >
                        Standing Order
                    </Button>
                    <Button
                        onClick={() => handleClick('Policies')}
                        style={btn === 'Policies' ? { ...buttonStyle, backgroundColor: '#C738BD', color: 'white' } : buttonStyle}
                    >
                        Policies
                    </Button>
                    <Button
                        onClick={() => handleClick('Consents')}
                        style={btn === 'Consents' ? { ...buttonStyle, backgroundColor: '#C738BD', color: 'white' } : buttonStyle}
                    >
                        Consents
                    </Button>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-sm p-5 h-[70vh] overflow-auto mt-10">
                {renderComponent()}
            </div>

        </div>
    );
};

export default ClientProtal;