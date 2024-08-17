import MetaTag from '../../components/MetaTag';
import Heading from '../../components/Heading';
import { Button } from 'antd';
import JoditEditor from 'jodit-react';
import { useRef, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../main';

const AboutUs = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = JSON.parse(localStorage.getItem('token'));
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${BASE_URL}about`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const result = await response.json();
                
                setContent(result.data.description);
                setId(result.data.id);  // Set ID if data exists
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const updateDescriptions = async () => {
        console.log(content)
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
            const response = await fetch(`${BASE_URL}about-store-or-update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id: id,  // Include ID for update or null for insert
                    description: content
                }),
            });

            if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update description',
                });
                return;
            }

            const result = await response.json();
            Swal.fire({
                icon: 'success',
                title: result.message,
                text: 'Description updated successfully',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update descriptions',
            });
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleSubmit = () => {
        updateDescriptions();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "About Us Updated Successfully",
            showConfirmButton: false,
            timer: 1500
        });
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-5 h-[86vh] overflow-auto">
            <MetaTag title={"About Us"} />
            <Heading title={"About Us"} style={"text-left mb-6"} />

            {/* editor  */}
            <div className='editor'>
                <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={newContent => setContent(newContent)}
                />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 40 }}>
                <Button
                    onClick={handleSubmit}
                    style={{
                        background: "#1DA1F2",
                        width: 134,
                        height: 48,
                        border: "none",
                        outline: "none",
                        color: "#FCFCFC",
                        borderRadius: 8,
                    }}
                    className='roboto-regular text-[14px] leading-[17px] flex items-center justify-center'
                >
                    Save & Change
                </Button>
            </div>
        </div>
    );
}

export default AboutUs;
