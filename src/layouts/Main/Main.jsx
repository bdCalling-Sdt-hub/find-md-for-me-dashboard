import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className="grid grid-cols-12 bg-[#F1F2F6]">   
            <div className=' col-span-2 h-screen overflow-y-auto bg-[#ffffff] px-[25px]'>
                <Sidebar />
            </div>
            <div className=" h-screen overflow-auto col-span-10 w-full  text-black rounded-md">
                <Header/>
                <div className="bg-[#F1F2F6] m-6 ">
                    <Outlet />
                </div>
            </div>
         </div>
    )
}

export default Main
