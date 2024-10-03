import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, message, Input, Select } from 'antd';
import { CiCircleMinus, CiEdit } from 'react-icons/ci';
import { FaCheck } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { GoPlusCircle } from 'react-icons/go';
import { BASE_URL } from '../main';



const AddTier = () => {
    const [ehrData, setEhrData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentEhr, setCurrentEhr] = useState(null);
    const [form] = Form.useForm();



    useEffect(() => {
        fetchEhrData();
    }, []);

    // console.log(ehrData);
    const fetchEhrData = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}pricing`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch EHR data');
            }
            const result = await response.json();

            setEhrData(result.data);
        } catch (error) {
            // console.error('Error fetching tier data:', error); 
        } finally {
            setLoading(false);
        }
    };

    const handleAddOrUpdate = async (values) => {
        // const JsonServier = JSON.stringify(values.service)
        // values.service = JsonServier
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Unauthorized user',
            });
            return;
        }

        //   values?.service = JsonServier
        // console.log(values) 
        const url = isEditMode ? `${BASE_URL}update-tiear/${currentEhr?.id}` : `${BASE_URL}add-tiear`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error('Failed to save tier');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: isEditMode ? 'Tier updated successfully' : 'Tier added successfully',
            }); 

           await fetchEhrData();
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) { 

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to save Tier',
            });
        }
    };


    const openAddModal = () => {
        setIsEditMode(false);
        setIsModalOpen(true);
        form.resetFields();
    };

    const openEditModal = (tier) => { 
        // console.log(tier); 
        setIsEditMode(true);

        setCurrentEhr(tier);
        setIsModalOpen(true);
        form.setFieldsValue({
            id: tier?.id,
            tyer_name: tier.tyer_name,
            price_1: tier.price[0].price_1,
            price_2: tier.price[0].price_2,
            duration: tier.price[0].duration,
            pricing_type:tier?.price[0]?.pricing_type ,
            service: tier.price[0]?.service || []
        });
    };

    const closeAddModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (values) => {
        // values.services = values.service.map(s => s.service).join(','); // Convert services array to comma-separated string
        // console.log(values)
        handleAddOrUpdate(values);
    };

    return (
        <div>
            <div className='flex justify-end'>
                <Button type="primary" className='w-[125px] h-[41px] mt-[50px]' onClick={openAddModal}>+ Add Tier</Button>
            </div>

            <div className='flex flex-1 justify-center items-center mt-5 gap-2'>
                {ehrData?.map((tier) => {


                    return (
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 rounded-lg">
                            <div key={tier.id} className='col-span-4 bg-[#E8F6FE] w-full rounded-[8px] p-5'>
                                <div className=' flex justify-end text-[#1D75F2] text-[25px] font-bold cursor-pointer'>
                                    <CiEdit onClick={() => openEditModal(tier)} />
                                </div>
                                <h1 className='text-[#FF31F7] text-[20px] font-semibold leading-6'>{tier?.tyer_name}</h1>
                                <h1 className='text-[#252B42] text-[32px] font-medium leading-9 mt-2'>${tier?.price[0]?.price_1}</h1>
                                <h1 className='text-[#252B42] text-[32px] font-medium leading-9 mt-2'>${tier?.price[0]?.price_2}</h1>
                                <p className='text-[12px] text-[#252B42] font-normal leading-3 mt-2'>{tier?.price[0]?.duration}</p>
                                <p className='text-[12px] text-[#252B42] font-normal leading-3 mt-2'>Monthly</p>
                                <p className='text-[#252B42] text-[16px] font-semibold mt-3 mb-3'>Services Covered: </p>

                                <ul>
                                    {tier?.price ? tier?.price[0]?.service?.map((service, index) => (
                                        <li key={index} className='list-none text-[#1D75F2] flex gap-1 mt-2 mb-2'>
                                            <FaCheck />
                                            <p className='text-[#252B42] text-[14px] font-normal'>{service ? service : ''}</p>
                                        </li>
                                    )) : <li>No services available</li>}
                                </ul>
                                <Button className='bg-[#C738BD] w-full h-[42px] text-white'>Get Started</Button>
                            </div>
                        </div>

                    )
                }
                )}
            </div>

            <Modal open={isModalOpen} onCancel={closeAddModal} footer={null}>
                <div className="flex  flex-1 flex-col justify-center  py-4 bg-[#E8F6FE]">
                    <div className="px-5 mt-4">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                        >
                            <Form.Item
                                name="tyer_name"
                                label="Tier Name"
                                rules={[{ required: true, message: 'Please input the tier name!' }]}
                            >
                                <Input
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="price_1"
                                label="Price 1- Individual"
                                rules={[{ required: true, message: 'Please input the price!' }]}
                            >
                                <Input
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="price_2"
                                label="Price 2- Business"
                                rules={[{ required: true, message: 'Please input the price!' }]}
                            >
                                <Input style={{ width: '100%' }}

                                />
                            </Form.Item> 
                            <Form.Item
                                name="pricing_type"
                                label="Pricing type"
                                rules={[{ required: true, message: 'Please input the price type!' }]}
                            >
                                <Select name="Monthly" id="" style={{ width: '100%' , height:"45px" }}>
                              
                                    <Option value="Monthly">Monthly</Option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                name="duration"
                                label="Select duration"
                                rules={[{ required: true, message: 'Please input the duration!' }]}
                            >
                                <Input
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="service"
                                label={
                                    <p className="text-[#6A6D7C] text-base leading-[18px] raleway-regular text-center">
                                        Services
                                    </p>
                                }
                                rules={[{ required: true, message: 'Please input at least one service!' }]}
                            >
                                <Form.List name="service">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {/* {console?.log(fields)}  */}
                                            {fields?.map((field, index) => (
                                                <Form.Item
                                                    required={false}
                                                    key={field.key.toFixed() + index}
                                                    style={{ marginBottom: 0 }}
                                                >
                                                    <div className="flex items-center mb-2 gap-[30px]">
                                                        <Form.Item
                                                            {...field}
                                                            validateTrigger={['onChange', 'onBlur']}
                                                            rules={[{ required: true, whitespace: true, message: "Please input the service or delete this field." }]}
                                                            noStyle
                                                        >
                                                            <Input
                                                                placeholder="Service"
                                                                style={{
                                                                    width: "100%",
                                                                    height: 40,
                                                                    border: "1px solid #E7EBED",
                                                                    background: "transparent",
                                                                    borderRadius: "none",
                                                                    outline: "none",
                                                                    color: "#415D71",
                                                                }}
                                                                className="raleway-regular text-sm leading-5"
                                                            />
                                                        </Form.Item>
                                                        {fields.length > 1 ? (
                                                            <CiCircleMinus
                                                                size={30}
                                                                className="dynamic-delete-button cursor-pointer text-[#D7263D]"
                                                                onClick={() => remove(field.name)}
                                                            />
                                                        ) : null}
                                                    </div>
                                                </Form.Item>
                                            ))}
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    style={{ width: "100%", height: 40 }}
                                                    icon={<GoPlusCircle />}
                                                >
                                                    Add Service
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Form.Item>

                            <center>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className=" w-[100px] h-[42px] bg-[#1D75F2] text-xl text-white font-medium"
                                >
                                    Submit
                                </Button>
                            </center>
                        </Form>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AddTier;