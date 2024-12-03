import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL, IMAGE_URL } from '../../main';

const Header = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
   

    const fetchUserData = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}user`, {
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
            setUser(result);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
            fetchUserData();
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }



    return (
        <div className='bg-[#ffffff] flex items-end justify-end gap-6 py-3 pr-6'>
            <Link to={{pathname:"/notification"}}>
            <div className='flex item-center justify-center w-[50px] h-[50px] rounded-[100%] bg-[#F2F2F2] relative'>
                <div className='flex item-center justify-center '>
                <div className='w-[18px] h-[18px] rounded-[100%] bg-[#00B047] text-white text-center text-[12px] itme-center justify-center absolute right-2 top-1 '>{user?.notification}</div>
                    <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="0.0683594" width="39.3333" height="40" rx="19.6667" fill="#F2F2F2" />
                        <path d="M20.6663 14.855C20.4823 14.855 20.333 14.7057 20.333 14.5217V13.4017C20.333 13.0344 20.0337 12.735 19.6663 12.735C19.299 12.735 18.9997 13.0344 18.9997 13.4017V14.5217C18.9997 14.7057 18.8503 14.855 18.6663 14.855C18.4823 14.855 18.333 14.7064 18.333 14.5217V13.4017C18.333 12.6664 18.931 12.0684 19.6663 12.0684C20.4017 12.0684 20.9997 12.6664 20.9997 13.4017V14.5217C20.9997 14.7064 20.8503 14.855 20.6663 14.855Z" fill="#333333" />
                        <path d="M19.6663 28.068C18.3797 28.068 17.333 27.0214 17.333 25.7347C17.333 25.5507 17.4823 25.4014 17.6663 25.4014C17.8503 25.4014 17.9997 25.5507 17.9997 25.7347C17.9997 26.6534 18.7477 27.4014 19.6663 27.4014C20.585 27.4014 21.333 26.6534 21.333 25.7347C21.333 25.5507 21.4823 25.4014 21.6663 25.4014C21.8503 25.4014 21.9997 25.5507 21.9997 25.7347C21.9997 27.0214 20.953 28.068 19.6663 28.068Z" fill="#333333" />
                        <path d="M25.3333 26.0684H14C13.4487 26.0684 13 25.6197 13 25.0684C13 24.7757 13.1273 24.499 13.35 24.3084C14.4007 23.4204 15 22.1284 15 20.7604V18.735C15 16.1617 17.0933 14.0684 19.6667 14.0684C22.24 14.0684 24.3333 16.1617 24.3333 18.735V20.7604C24.3333 22.129 24.9327 23.4204 25.978 24.3037C26.206 24.499 26.3333 24.7757 26.3333 25.0684C26.3333 25.6197 25.8853 26.0684 25.3333 26.0684ZM19.6667 14.735C17.4607 14.735 15.6667 16.529 15.6667 18.735V20.7604C15.6667 22.3257 14.9813 23.8024 13.786 24.813C13.7093 24.8784 13.6667 24.971 13.6667 25.0684C13.6667 25.2524 13.816 25.4017 14 25.4017H25.3333C25.5173 25.4017 25.6667 25.2524 25.6667 25.0684C25.6667 24.971 25.624 24.8784 25.55 24.815C24.3527 23.8024 23.6667 22.325 23.6667 20.7604V18.735C23.6667 16.529 21.8727 14.735 19.6667 14.735Z" fill="#333333" />
                    </svg>                    
                </div>                
            </div>
            </Link>
            
            <Link to={{ pathname: "/profile", state: {user: user?.user } }} className='bg-white px-2 rounded-lg py-1'>
                <div className='flex items-center gap-[10px]' >
                    <img
                        style={{ width: 40, height: 40, borderRadius: "100%", border: "2px solid black" }}
                        src={IMAGE_URL + user?.user.image || 'https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'}
                        alt=""
                    />
                    <div>
                        <p className='text-sm text-[#404040] font-bold '>{user?.user?.first_name + ' ' + user?.user?.last_name}</p>
                        <p className='text-[12px] font-semibold text-[#565656]'>{user?.user?.uset_type}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Header