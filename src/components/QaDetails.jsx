import { useState, useEffect } from 'react';
import { PiArrowLeftFill } from 'react-icons/pi';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL  } from '../main';
import { IMAGE_URL } from '../main';

const QaDetails = () => {
    const [document, setDocument] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();
    // console.log(userId); 
    useEffect(() => {
        const fetchDocument = async () => {
            const token = JSON.parse(localStorage.getItem('token'));
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const response = await fetch(`${BASE_URL}single-qa/${userId}`, {
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
                // console.log( result) 
                setDocument(result.data);
            } catch (error) {
                // console.error('Error fetching document:', error); 
            } finally {
                setLoading(false);
            }
        };
        fetchDocument();
    }, [userId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div>
                <div className='flex'>
                    <Link to="/client-portal">
                        <span className='text-3xl font-bold'>
                            <PiArrowLeftFill />
                        </span>
                    </Link>
                    <p className='m-auto'>
                        <span className='text-[20px] font-bold'>Client Email:</span>
                        <span className='text-[20px] font-bold text-[#737373]'> {document?.email}</span>
                    </p>
                </div>
                <div className="bg-white shadow-lg rounded-sm p-5 h-[70vh] overflow-auto mt-10">
                    {document?.file && document.file.length > 0 && (
                        document.file.map((file, index) => (
                            <div key={index} className='text-[14px] font-medium text-[#1D75F2] leading-4 w-full h-[70px] bg-[#E8F6FE] rounded-[10px] mb-2'>
                                {/* {console.log(file)}  */}
                                <a
                                    href={`${IMAGE_URL}${file}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='block mt-1 text-[#1D75F2]'
                                >
                                    <div className='flex text-[14px] font-medium text-[#1D75F2] leading-4 p-4'>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5003 18.9577H7.50033C2.97533 18.9577 1.04199 17.0243 1.04199 12.4993V7.49935C1.04199 2.97435 2.97533 1.04102 7.50033 1.04102H11.667C12.0087 1.04102 12.292 1.32435 12.292 1.66602C12.292 2.00768 12.0087 2.29102 11.667 2.29102H7.50033C3.65866 2.29102 2.29199 3.65768 2.29199 7.49935V12.4993C2.29199 16.341 3.65866 17.7077 7.50033 17.7077H12.5003C16.342 17.7077 17.7087 16.341 17.7087 12.4993V8.33268C17.7087 7.99102 17.992 7.70768 18.3337 7.70768C18.6753 7.70768 18.9587 7.99102 18.9587 8.33268V12.4993C18.9587 17.0243 17.0253 18.9577 12.5003 18.9577Z" fill="#1D75F2" />
                                            <path d="M18.3337 8.95841H15.0003C12.1503 8.95841 11.042 7.85007 11.042 5.00007V1.66674C11.042 1.41674 11.192 1.18341 11.4253 1.09174C11.6587 0.991739 11.9253 1.05007 12.1087 1.22507L18.7753 7.89174C18.9503 8.06674 19.0087 8.34174 18.9087 8.57507C18.8087 8.8084 18.5837 8.95841 18.3337 8.95841ZM12.292 3.17507V5.00007C12.292 7.15007 12.8503 7.70841 15.0003 7.70841H16.8253L12.292 3.17507Z" fill="#1D75F2" />
                                            <path d="M10.833 11.459H5.83301C5.49134 11.459 5.20801 11.1757 5.20801 10.834C5.20801 10.4923 5.49134 10.209 5.83301 10.209H10.833C11.1747 10.209 11.458 10.4923 11.458 10.834C11.458 11.1757 11.1747 11.459 10.833 11.459Z" fill="#1D75F2" />
                                            <path d="M9.16634 14.791H5.83301C5.49134 14.791 5.20801 14.5077 5.20801 14.166C5.20801 13.8243 5.49134 13.541 5.83301 13.541H9.16634C9.50801 13.541 9.79134 13.8243 9.79134 14.166C9.79134 14.5077 9.50801 14.791 9.16634 14.791Z" fill="#1D75F2" />
                                        </svg>
                                        <p className='mt-1'>{file.split('/').pop()}</p> {/* Display file name */}
                                    </div>
                                </a>
                                {/* Example file size, adjust as needed */}
                                <p className='text-[12px] text-[#989692] leading-5 ml-4'>{'200 kb'}</p>
                            </div>
                        ))
                    )}
                    <div
                        className='p-4 rounded-lg text-[#707070] leading-6 text-[16px] font-medium mb-4 bg-[#F9F9F9] mt-5'
                        style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}
                    >
                        <p className='text-[#636363] text-base leading-6 h-[100px] poppins-medium text-[16px]'>
                            {document?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QaDetails;
