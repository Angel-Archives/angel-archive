import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { fetchAngelsImages } from "../src/utils/queries";

export function SignUpForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        const loadImages = async () => {
            const angels = await fetchAngelsImages();
            if (angels.length) {
                const angelsWithFullURLs = angels.map((angel) => ({
                    ...angel,
                    image_url: `https://axvoarmndarkuqawtqss.supabase.co/storage/v1/object/public/sonny_angel_images/${angel.image_profile_pic}`,
                }));
                setImages(angelsWithFullURLs);
            }
            setLoading(false);
        };
        loadImages();
    }, []);

    const toggleImages = () => {
        setPopupVisible(!popupVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setErrorMessage('');
        setSuccessMessage('');
    
        if (!profilePic) {
            setErrorMessage('Please select a profile picture.');
            return;
        }
    
        if (!email || !password || !username || !profilePic) {
            setErrorMessage('Please fill in all fields and select a profile picture.');
            return;
        }
    
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters.');
            return;
        }
    
        const { user, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });
    
        console.log('User response:', user);
        if (signUpError) {
            console.log('Sign-up error:', signUpError);
            setErrorMessage(`Sign up error: ${signUpError.message}`);
            return;
        }
    
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
        if (sessionError || !session) {
            setErrorMessage('Error establishing authentication session.');
            return;
        }
    
        const currentUser = session.user;
    
        const { data, error: insertError } = await supabase.from('users').insert([
            {
                id: currentUser.id, 
                email: email,
                username: username,
                profile_pic: profilePic, 
            }
        ]);
    
        if (insertError) {
            setErrorMessage(`Error inserting user data: ${insertError.message}`);
            return;
        }
    
        setSuccessMessage('Sign up successful!');
        clearForm();
        console.log('Signed up successfully:', data);
    };
    
        const clearForm = () => {
        setEmail("");
        setPassword("");
        setUsername("");
        setProfilePic(null);
        setErrorMessage("");
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>

                <div className="profile-picture-container">
                    <div className="profile-placeholder" onClick={toggleImages}>
                        {profilePic ? (
                            <img
                                src={profilePic}
                                alt="Selected"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                }}
                            />
                        ) : (
                            <span
                                className="plus-button"
                                style={{
                                    fontSize: "30px",
                                    color: "#4CAF50",
                                    cursor: "pointer",
                                }}
                            >
                                +
                            </span>
                        )}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={toggleImages}
                    style={{
                        marginTop: "10px",
                        padding: "8px 16px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    {profilePic ? "Change Profile Picture" : "Select Profile Picture"}
                </button>

                <div>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>

                {popupVisible && (
                    <div
                        style={{
                            position: "fixed",
                            top: "0",
                            left: "0",
                            right: "0",
                            bottom: "0",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        onClick={() => setPopupVisible(false)} 
                    >
                        <div
                            style={{
                                backgroundColor: "white",
                                padding: "20px",
                                borderRadius: "8px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "80%",
                                maxHeight: "80%",
                                overflowY: "auto",
                            }}
                            onClick={(e) => e.stopPropagation()} 
                        >
                            <h3>Select a Profile Picture</h3>
                            {loading ? (
                                <p>Loading images...</p>
                            ) : (
                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(5, 1fr)",
                                        gap: "10px",
                                        width: "100%",
                                    }}
                                >
                                    {images.map((img) => (
                                        <div
                                            key={img.id}
                                            onClick={() => {
                                                setProfilePic(img.image_url);
                                                setPopupVisible(false);
                                            }}
                                            style={{
                                                textAlign: "center",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <img
                                                src={img.image_url}
                                                alt={img.name}
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    objectFit: "cover",
                                                    borderRadius: "50%",
                                                }}
                                            />
                                            <p style={{ color: "black" }}>{img.name}</p> {/* Text color black */}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
                {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
