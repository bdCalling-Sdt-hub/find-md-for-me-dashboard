import React, { useState } from 'react';
import { Button,} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import EHR from '../components/EHR';
import Exam from '../components/GoodFithExam';
import AdminVendor from '../components/AdminVendor';
import Qa from '../components/Qa';


const BuisnessResources = () => {
    const navigate = useNavigate();
    const buttonStyle = {
        transition: 'none',
        backgroundColor: 'transparent',
        color: '#737373',
        fontWeight: 500,
        fontSize: '18px',
        height: '44px'
    };

    const [btn, setBtn] = useState('');

    const handleClick = (Bsuiness) => {
        setBtn(Bsuiness);
    };
    const renderComponent = () => {
        switch (btn) {
            case 'Bsuiness':
                return ( 
                    navigate('/buisness-protal')
                )

            case 'Vendors':
                return <AdminVendor />
            case 'EHR':
                return <EHR />;
            case 'Exam':
                return <Exam />;
            case 'Qa':
                return <Qa />
            default:
                return null;
        }
    };
    return (
        <div>
            <div>
            <div className='flex '>
                {/* <span className='text-3xl font-bold'><PiArrowLeftFill /></span> */}
                <div className='flex flex-1 justify-center gap-5'>
                    <Button
                        onClick={() => handleClick('Bsuiness')}
                        style={btn === 'Bsuiness' ? { ...buttonStyle, backgroundColor: '#C738BD', color: 'white' } : buttonStyle}

                    >
                        Business Resources
                    </Button>
                    <Button
                        onClick={() => handleClick('Vendors')}
                        style={btn === 'Vendors' ? { ...buttonStyle, backgroundColor: '#C738BD', color: 'white' } : buttonStyle}
                    >
                        Vendors
                    </Button>
                    <Button
                        onClick={() => handleClick('EHR')}
                        style={btn === 'EHR' ? { ...buttonStyle, backgroundColor: '#C738BD', color: 'white' } : buttonStyle}
                    >
                        EHR
                    </Button>
                    <Button
                        onClick={() => handleClick('Exam')}
                        style={btn === 'Exam' ? { ...buttonStyle, backgroundColor: '#C738BD', color: 'white' } : buttonStyle}
                    >
                        Good Faith Exam
                    </Button>
                    <Button
                        onClick={() => handleClick('Qa')}
                        style={btn === 'Qa' ? { ...buttonStyle, backgroundColor: '#C738BD', color: 'white' } : buttonStyle}
                    >
                        QA
                    </Button>
                </div>
            </div>
            <div className="bg-white shadow-lg rounded-sm p-5 h-[78vh] overflow-auto mt-10">
                {renderComponent()}
            </div>

        </div>
        </div>
    );
};

export default BuisnessResources;