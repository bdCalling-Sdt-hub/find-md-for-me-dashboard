import { Button } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div
            className='w-full h-screen flex items-center justify-center ]'
            style={{
                backgroundImage: `url("https://s3-alpha-sig.figma.com/img/6922/88e6/c78056a3130b32520a1208594410002b?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gnIfqxDLSmhFt~en-SumZrS~Q26DVJn25A~5al1CgOoPXZ9lPW55~EoLBosYBSnjsR6aGHV6tqEDRoVbk~ftymWmkQu0XUZUUHZqDxgnt~jXFHh663WnN-iK2GhKUXjq5sEYgNL5dWJ6ZiMKcR6ZvGXqg4hCpGptyTF4zodvIB7ztCo8PiMNmBhx2l3pcnKi5l132XF24gOCVAooYjg5O06Zw0rrYR2Tgn1YwAvvPGm5ZduIc6fWh8BlL9seSbJ3Lht7-JO80999Kq-EwAGa91Zp73J0hJJL8gX0hFDMzf-QW4Hwc0kMBa148gIemaTquUtU-j3fcYNXE~GYjevfhQ__")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className='w-[743px] bg-white p-20 '>
                <div className=' mt-5'><img className="w-[390px] h-[296px] m-auto" src="https://s3-alpha-sig.figma.com/img/060a/e8bc/540ea3155cfd8368f7d87ed8a94ed0be?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eHiVfzrYdQGhtOncJEw0me-3PHF8WCHMMQktfsgJiZKYavTux7xVUAOBkI89rHCZFOtO6DtVzGCUPLBy-t~Xtkisu7hpbpvkt0eviFNIQHlBMcv7jqIJgogJPS-6K~VnuKMRT5g8oPaRZc20oL4ogl-vK-pc0NQ7d2rS15BPK3S~DgXp2oVoluE1zSWhEJgG6tBjs-i0qSdLxzV1B80QlPW7tAvlfyQSVODhc3U3QjG1YwWJksiGpkzlPlIdTyfGqXwqtCh~PlDD0hP0-duSMc4vZeamLYjV~7wwcQNHLQKYh8csSmvqnkSLU7oZvcJZIbgCj4Jsbe5ntiQLWIxIzQ__" /></div>
                <p className='text-[#202224] text-center text-[32px] font-bold text-base leading-6 p-20'>Looks like you’ve got lost….</p>
                <Link to="/" style={{ display: "flex", width: "100%", marginTop: 30, alignItems: "center", justifyContent: "center" }}>
                    <Button className="mx-auto text-[20px] font-bold rounded-lg w-[320px] h-[40px] bg-[#005FBF] text-[#FCFCFC]">
                        Back to Dashboard
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
