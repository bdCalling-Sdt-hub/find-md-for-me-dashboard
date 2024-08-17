import React from 'react';
import { FaRegQuestionCircle, FaTrash } from 'react-icons/fa';
const Faq = () => {
    return (
        <div>
            <div  className='mb-6 flex gap-6'>
                <FaRegQuestionCircle size={28} color='#12354E' />
                <div className='w-full'>
                    {/ question  /}
                    <div
                        className='p-4 rounded-lg text-[#707070] leading-6 text-[16px] font-medium mb-4'
                        style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}
                    >
                        <p className='text-[#575757] text-base leading-6 poppins-medium '> text</p>
                    </div>

                    {/ answer /}
                    <div
                        className='p-4 rounded-lg text-[#707070] text-base leading-6 poppins-regular  '
                        style={{ boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px' }}
                    >
                        text
                    </div>
                </div>
                <div className='w-10 cursor-pointer h-10 border border-[#E6E5F1] rounded-lg flex items-center justify-center'>
                    <FaTrash size={20} color='red' />
                </div>
            </div>
        </div>
    );
};

export default Faq;