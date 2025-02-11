import React, { useState } from "react";
import supabase from "../config/supabaseClient";

export function LoginForm() {
    const [identifier, setIdentifier] = useState(""); 
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        let email = identifier;

        if (!identifier.includes("@")) {
            const { data, error } = await supabase
                .from("users")
                .select("email")
                .eq("username", identifier)
                .single();

            if (error || !data) {
                setErrorMessage("Username not found.");
                return;
            }

            email = data.email; 
        }

        const { data: userExists, error: userError } = await supabase
            .from("users")
            .select("id")
            .eq("email", email)
            .single();

        if (userError || !userExists) {
            setErrorMessage("User not found. Please check your email.");
            return;
        }

        const { error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (loginError) {
            setErrorMessage("Incorrect password. Please try again.");
            return;
        }

        setSuccessMessage("Login successful!");
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
                {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}

                <button type="submit">Log In</button>
            </form>
        </div>
    );
}
