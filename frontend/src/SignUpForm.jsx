import { useState } from "react";
import { ProfilePictureSelector } from "./ProfilePictureSelector";

// editted

export function SignUpForm() {
    // useState variables to manage input values
    const [profilePic, setProfilePic] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Handle Form Submission
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log({ profilePic, username, email, password })
    }

    return (
        <form onSubmit={handleSubmit}>
            <ProfilePictureSelector />
            <div>
                <label htmlFor="username">UserName:</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button type="submit">Sign Up</button>
        </form>
    )
}
