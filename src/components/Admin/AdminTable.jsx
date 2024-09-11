/* eslint-disable no-unused-vars */
import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';

const AdminTable = () => {
    const handleDelete=()=>{
        Swal.fire({
            title: "Are Your Sure ?",
            html: `Do you want to  delete Admin profile ? <br> Only Super admin can delete Admin profile`,
            confirmButtonText: 'Confirm',
            customClass: {
              confirmButton: 'custom-send-button',
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(result) 
            }
        });
    }
    return (
        <div>
            <table className="w-full table">
                <thead>
                    <tr className="text-left w-full bg-[#E7EBED] custom-table-list">
                        {
                            ["S.ID ", "Name", "Email", "User Type", "Actions"].map((item, index)=>{
                                return (
                                    <th key={index} className={`text-[#575757] raleway-medium text-[18px] leading-7`}>
                                        {item}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        [...Array(9)].map((item, index)=>
                        <React.Fragment key={index}>
                            <tr className={`${(index + 1) % 2 === 0 ? 'bg-[#FCF8F9]' : 'bg-white'} w-full`}>
                                <td>#123{index}</td>
                                <td>Nadir Hossain{index + 1}</td>

                                <td className="text-[#707070] h-[60px]  raleway-regular text-base ">nadirhossain{index+1}@gmail.com</td>
                                <td className="text-[#707070] h-[60px]  raleway-regular text-base ">ADMIN</td>

                                <td>
                                    <div className="flex items-center  h-[60px]">
                                        <div onClick={handleDelete} className="flex cursor-pointer items-center border w-10 h-10 rounded-[6px] border-[#E6E5F1] justify-center">
                                            <RiDeleteBin6Line size={22} color="#B6C0C8" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </React.Fragment>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AdminTable