import React, { useEffect, useState } from 'react';
import { PiArrowLeftFill } from "react-icons/pi";
import { Button, Form, Row, Col, message } from 'antd';
import { TbPhotoSquareRounded } from "react-icons/tb";
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL, IMAGE_URL_1 } from '../main';
import { IMAGE_URL } from '../main';
const ClientDocumentView = () => {
    let { userId } = useParams();
    // console.log('params id:' + userId);
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    // console.log(document); 

    useEffect(() => {
        const fetchDocument = async () => {
            const token = JSON.parse(localStorage.getItem('token'));
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`${BASE_URL}singel_user_documet/${userId}`, {
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
                setDocument(result.data);
            } catch (error) {
                console.error('Error fetching document:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDocument();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // if (!document) {
    //     return <div>No user document available</div>;
    // }
   

    // ******* Update status ********//

    const postDocumentStatus = async (status) => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            message.error('Unauthorized');
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
                body: JSON.stringify({ 
                    id:document.id,
                    status:status 
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update document status');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Document status updated successfully',
            });
        } catch (error) {
            console.error('Error updating document status:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update document status',
            });
        }
    };

    const handleApprove = () => postDocumentStatus('approved');
    const handleReject = () => postDocumentStatus('rejected');

    return (
        <div>
            <div className='flex '>
                <Link to='/client-document'><span className='text-3xl font-bold'><PiArrowLeftFill /> </span></Link>
                <img className='w-[150px] h-[150px] rounded-full m-auto' src={IMAGE_URL+document?.user?.image || 'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'} alt='image' />
            </div>
            <div className=' w-[40%] m-auto flex flex-1 items-center justify-between text-[#252B42] text-[16px] font-normal  leading-6 p-10'>
                <div>
                    <h1 className='mt-3'>Name</h1>
                    <h1 className='mt-3'>Email</h1>
                    <h1 className='mt-3'>Appointment Date</h1>
                    <h1 className='mt-3'>Appointment Time</h1>
                </div>
                <div className='text-right'>
                    <h1 className='mt-3'>{document?.user?.first_name || "Empty"}</h1>
                    <h1 className='mt-3'>{document?.user?.email || "Empty" }</h1>
                    <h1 className='mt-3'>{document?.date || "Empty"}</h1>
                    <h1 className='mt-3'>{document?.time || "Empty "}</h1>
                </div>
            </div>
            <div className='w-[50%] m-auto'>
                <h1 className='text-[#252B42] text-[24px] leading-6 font-medium'>Upload Documents</h1>
                <Row className='m-auto justify-between' >
                    <Col>
                        <div className='mt-5 text-[16px] leading-3 font-normal '>  1.Resume </div>
                        <a href={`${IMAGE_URL_1}${document?.resume}`} target='_blank'>
                            <div className='w-[337px] h-[44px] bg-white rounded-[10px] p-1 mt-5' htmlFor="">
                                <div className='  items-center  flex text-sm text-[#1DA1F2] font-medium   leading-5 pl-5'> <TbPhotoSquareRounded /> Resume </div>
                                <p className='text-[#989692] font-normal leading-5 text-[12px] pl-5'>200 KB</p>
                            </div>
                        </a>

                        <div className='mt-5 text-[16px] leading-3 font-normal '>  3.LIABILITY INSURANCE </div>
                        <a href={`${IMAGE_URL_1}${document?.libability_insurnce}`} target='_blank'>
                            <div className='w-[337px] h-[44px] bg-white rounded-[10px] p-1 mt-5' htmlFor="">
                                <div className='  items-center  flex text-sm text-[#1DA1F2] font-medium   leading-5 pl-5'> <TbPhotoSquareRounded />LIABILITY INSURANCE </div>

                                <p className='text-[#989692] font-normal leading-5 text-[12px] pl-5'>200 KB</p>
                            </div>
                        </a>

                        <div className='mt-5 text-[16px] leading-3 font-normal '>  5.EIN FORM (SS-4) Sent by IRS </div>
                        <a href={`${IMAGE_URL_1}${document?.enform}`} target='_blank'>
                            <div className='w-[337px] h-[44px] bg-white rounded-[10px] p-1 mt-5' htmlFor="">
                                <div className='  items-center  flex text-sm text-[#1DA1F2] font-medium   leading-5 pl-5'> <TbPhotoSquareRounded /> EIN FORM</div>

                                <p className='text-[#989692] font-normal leading-5 text-[12px] pl-5'>200 KB</p>
                            </div>
                        </a>
                        <div className='mt-5 text-[16px] leading-3 font-normal '>  7.CURRENT CPR CERTIFICATION </div>
                        <a href={`${IMAGE_URL_1}${document?.current_cpr_certification}`} target='_blank'>
                            <div className='w-[337px] h-[44px] bg-white rounded-[10px] p-1 mt-5' htmlFor="">
                                <div className='  items-center  flex text-sm text-[#1DA1F2] font-medium   leading-5 pl-5'> <TbPhotoSquareRounded />CPR CERTIFICATION </div>

                                <p className='text-[#989692] font-normal leading-5 text-[12px] pl-5'>200 KB</p>
                            </div>
                        </a>
                        <div className='mt-5 text-[16px] leading-3 font-normal '>  9.Trainings (ex: HIPAA, OSHA, etc.) </div>
                        <a href={`${IMAGE_URL_1}${document?.training_hipaa_osha}`} target='_blank'>
                            <div className='w-[337px] h-[44px] bg-white rounded-[10px] p-1 mt-5' htmlFor="">
                                <div className='  items-center  flex text-sm text-[#1DA1F2] font-medium   leading-5 pl-5'> <TbPhotoSquareRounded />Trainings </div>

                                <p className='text-[#989692] font-normal leading-5 text-[12px] pl-5'>200 KB</p>
                            </div>
                        </a>

                    </Col>
                    <Col>

                        <div className='mt-5 text-[16px] leading-3 font-normal '>  2.LICENSES + CERTIFICATIONS </div>
                        <a href={`${IMAGE_URL_1}${document?.license_certification}`} target='_blank'>
                            <div className='w-[337px] h-[44px] bg-white rounded-[10px] p-1 mt-5' htmlFor="">
                                <div className='  items-center  flex text-sm text-[#1DA1F2] font-medium   leading-5 pl-5'> <TbPhotoSquareRounded /> Licenses certifications </div>
                                <p className='text-[#989692] font-normal leading-5 text-[12px] pl-5'>200 KB</p>
                            </div>
                        </a>
                        <div className='mt-5 text-[16px] leading-3 font-normal '>  4.BUSINESS FORMATION DOCUMENTS </div>
                        <a href={`${IMAGE_URL_1}${document?.buisness_formations_doc}`} target='_blank'>
                            <div className='w-[337px] h-[44px] bg-white rounded-[10px] p-1 mt-5' htmlFor="">
                                <div className='  items-center  flex text-sm text-[#1DA1F2] font-medium   leading-5 pl-5'> <TbPhotoSquareRounded /> Business formation documents </div>
                                <p className='text-[#989692] font-normal leading-5 text-[12px] pl-5'>200 KB</p>
                            </div>
                        </a>
                        <div className='mt-5 text-[16px] leading-3 font-normal '>  6.CURRENT DRIVERS LICENSE</div>
                        <a href={`${IMAGE_URL_1}${document?.currrent_driver_license}`} target='_blank'>
                            <div className='w-[337px] h-[44px] bg-white rounded-[10px] p-1 mt-5' htmlFor="">
                                <div className='  items-center  flex text-sm text-[#1DA1F2] font-medium   leading-5 pl-5'> <TbPhotoSquareRounded />Driver license</div>

                                <p className='text-[#989692] font-normal leading-5 text-[12px] pl-5'>200 KB</p>
                            </div>
                        </a>

                        <div className='mt-5 text-[16px] leading-3 font-normal '>  8.BLOOD BORNE PATHOGEN CERTIFICATION</div>
                        <a href={`${IMAGE_URL_1}${document?.blood_bron_pathogen_certificaton}`} target='_blank'>
                            <div className='w-[337px] h-[44px] bg-white rounded-[10px] p-1 mt-5' htmlFor="">
                                <div className='  items-center  flex text-sm text-[#1DA1F2] font-medium   leading-5 pl-5'> <TbPhotoSquareRounded /> Blood borne pathogen</div>

                                <p className='text-[#989692] font-normal leading-5 text-[12px] pl-5'>200 KB</p>
                            </div>
                        </a>
                    </Col>
                </Row>
                <h1 className='text-[#252B42] text-[24px] leading-6 font-medium mt-5'>Agreements</h1>
                <Row className='m-auto justify-between' >
                    <Col>
                        <div className='mt-5 text-[16px] leading-3 font-normal '>  1.MANAGEMENT SERVICE AGREEMENT </div>
                        <a href={`${IMAGE_URL_1}${document?.management_service_aggriment}`} target='_blank'>
                            <div className='w-[337px] h-[44px] bg-white rounded-[10px] p-1 mt-5' htmlFor="">
                                <div className='  items-center  flex text-sm text-[#1DA1F2] font-medium   leading-5 pl-5'> <TbPhotoSquareRounded /> Management service agreement  </div>
                                <p className='text-[#989692] font-normal leading-5 text-[12px] pl-5'>200 KB</p>
                            </div>
                        </a>
                        <div className='mt-5 text-[16px] leading-3 font-normal '>  3.DELEGATION AGREEMENT </div>
                        <a href={`${IMAGE_URL_1}${document?.deligation_aggriment}`} target='_blank'>
                            <div className='w-[337px] h-[44px] bg-white rounded-[10px] p-1 mt-5' htmlFor="">
                                <div className='  items-center  flex text-sm text-[#1DA1F2] font-medium   leading-5 pl-5'> <TbPhotoSquareRounded />Delegation agreement</div>

                                <p className='text-[#989692] font-normal leading-5 text-[12px] pl-5'>200 KB</p>
                            </div>
                        </a>


                    </Col>
                    <Col>
                        <div className='mt-5 text-[16px] leading-3 font-normal '>  2. NONE DISCLOSURE AGREEMENT </div>
                        <a href={`${IMAGE_URL_1}${document?.nda}`} target='_blank'>
                            <div className='w-[337px] h-[44px] bg-white rounded-[10px] p-1 mt-5' htmlFor="">
                                <div className='  items-center  flex text-sm text-[#1DA1F2] font-medium   leading-5 pl-5'> <TbPhotoSquareRounded />  NDA</div>
                                <p className='text-[#989692] font-normal leading-5 text-[12px] pl-5'>200 KB</p>
                            </div>
                        </a>
                        <div className='mt-5 text-[16px] leading-3 font-normal '>  4.ACH FORM AUTHORIZATION AGREEMENT </div>
                        <a href={`${IMAGE_URL_1}${document?.ach_fomr}`} target='_blank'>
                            <div className='w-[337px] h-[44px] bg-white rounded-[10px] p-1 mt-5' htmlFor="">
                                <div className='  items-center  flex text-sm text-[#1DA1F2] font-medium   leading-5 pl-5'> <TbPhotoSquareRounded /> ACH Form </div>

                                <p className='text-[#989692] font-normal leading-5 text-[12px] pl-5'>200 KB</p>
                            </div>
                        </a>
                    </Col>
                </Row>
                <Form>
                    <center className='mt-16'>
                        <Button onClick={handleApprove} style={{ width: '132px', height: '54px', background: '#80C738', borderRadius: '8px', color: '#ffffff', marginRight: '50px' }}>
                            Approve
                        </Button>
                        <Button onClick={handleReject} style={{ width: '132px', height: '54px', background: '#DF3232', borderRadius: '8px', color: '#ffffff' }}>
                            Reject
                        </Button>
                    </center>
                </Form>
            </div>
        </div>
    );
};

export default ClientDocumentView;