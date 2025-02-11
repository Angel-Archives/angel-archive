import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data?.user || null);
        };
        checkUser();
    }, []);

    const signIn = async (identifier, password) => {
        let email = identifier;

        if (!identifier.includes("@")) {
            const { data, error } = await supabase
                .from("users")
                .select("email")
                .eq("username", identifier)
                .single();

            if (error || !data) throw new Error("Username not found.");
            email = data.email;
        }

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) throw new Error("Incorrect email or password.");

        const { data: sessionData } = await supabase.auth.getUser();
        setUser(sessionData?.user);
        navigate("/dashboard"); 
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        navigate("/"); 
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}