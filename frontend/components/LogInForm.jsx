import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function LoginForm() {
    const { signIn } = useAuth();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            await signIn(identifier, password);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email/Username:</label>
                    <input
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
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

                {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}

                <button type="submit">Log In</button>
            </form>
        </div>
    );
}
