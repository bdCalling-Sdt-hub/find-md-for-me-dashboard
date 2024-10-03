import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { RiDashboard3Line, RiLogoutBoxLine } from "react-icons/ri";
import { PiNotebookDuotone } from "react-icons/pi";
import { GrDocumentUser } from "react-icons/gr";
import { LiaUsersCogSolid } from "react-icons/lia";
import { PiUsersThreeLight } from "react-icons/pi";
import { TbUserPlus } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { RiTeamLine } from "react-icons/ri"; 
import logo from "../../assets/logo.png"
import Swal from 'sweetalert2';
import { BASE_URL } from '../../main';
const { SubMenu } = Menu;

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogOut = async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Unauthorized user',
            });
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {                
                throw new Error('Failed to log out user');
            }

            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Logged out successfully',
            });
            localStorage.removeItem('token');
            navigate("/auth");
            window.location.reload();
        } catch (error) {
            // console.error('Failed to log out', error); 
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to log out',
            });
        }
    }

    const menuItems = [
        {
            id: 1,
            title: "Dashboard",
            icon: <RiDashboard3Line size={24} />,
            path: "/"
        },
        {
            id: 2,
            title: "Intake Information",
            icon: <PiNotebookDuotone size={24} />,
            path: "/total-list"
        },
        {
            id: 3,
            title: "Client Document",
            icon: <GrDocumentUser size={24} />,
            path: "/client-document"
        },
        {
            id: 4,
            title: "User Management",
            icon: <LiaUsersCogSolid size={24} />,
            path: "/user-management"
        },
        {
            id: 5,
            title: "Admin Management",
            icon: <PiUsersThreeLight size={24} />,
            path: "/admin-management"
        },
        {
            id: 6,
            title: "Client Team",
            icon: <RiTeamLine size={24} />,
            path: 'client-team',
        },
        {
            id: 7,
            title: "Create User Account",
            icon: <TbUserPlus size={24} />,
            path: "/user-account-create"
        },
        {
            id: 8,
            title: "Settings",
            icon: <CiSettings size={24} />,
            path: "/Make-admin",
            subMenu: [
                {
                    id: 1,
                    title:"Add Tier",
                    path: "/add-tier",
                },
                {
                    id: 1,
                    title: "About Us",
                    path: "/about-us",
                },
                {
                    id: 2,
                    title: "FAQ",
                    path: "/faq",
                },
                {
                    id: 4,
                    title: "Privacy Policy",
                    path: "/privacy-policy"
                },
                {
                    id: 5,
                    title: "Terms And Conditions",
                    path: "/terms-condition"
                },
                {
                    id: 6,
                    title: "States Covered",
                    path: "/states-covered",
                },
                {
                    id: 7,
                    title: "Client Portal",
                    path: "/client-portal",
                },
            ]
        },
    ];

    return (
        <div className=''>
            <div className='py-[30px]'>
                <Link to="/" className=" flex justify-center items-center">
               <img src={logo} alt="" className='h-[35px]' />
                </Link>
            </div>

            <Menu mode="inline" defaultSelectedKeys={["item-0"]}>
                {menuItems.map((item, index) =>
                    item.subMenu ? (
                        <SubMenu
                            key={`sub-${index}`}
                            icon={item.icon}
                            title={item.title}
                            style={{
                                color: "#575757",
                                fontSize: "16px",
                                marginBottom: "10px",
                            }}
                        >
                            {item.subMenu.map((subItem, subIndex) => (
                                <Menu.Item
                                    key={`sub-${index}-${subIndex}`}
                                    icon={subItem.icon}
                                    style={{
                                        color: "#415D71",
                                        fontSize: "16px",
                                        marginBottom: "10px",
                                    }}
                                >
                                    <Link to={`${subItem.path}`} className="text-[14px] leading-[21px]">
                                        {subItem.title}
                                    </Link>
                                </Menu.Item>
                            ))}
                        </SubMenu>
                    ) : (
                        <Menu.Item
                            key={`item-${index}`}
                            icon={item.icon}
                            style={{
                                color: "#415D71",
                                fontSize: "16px",
                                marginBottom: "10px"
                            }}
                        >
                            <Link to={item.path} className="text-[14px] leading-[21px]">
                                {item.title}
                            </Link>
                        </Menu.Item>
                    )
                )}
            </Menu>

            <div
                onClick={handleLogOut}
                className="flex text-[#415D71] items-center gap-3 cursor-pointer px-6 hover:bg-gray-200 py-2 mx-2 rounded-lg transition-all"
            >
                <RiLogoutBoxLine size={24} color="#415D71" />
                Logout
            </div>
        </div>
    );
}

export default Sidebar;
