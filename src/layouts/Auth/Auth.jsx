import { Outlet } from "react-router-dom";
import authBg from "../../assets/Image/Authbg.png";


const Auth = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                background: `url(${authBg})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
            className="flex items-center justify-center"
        >
            <div className="flex items-center justify-center rounded-[12px] bg-[#F9F9F9] px-[57px] py-16">
                <Outlet />
            </div>
        </div>
    );
}

export default Auth;
