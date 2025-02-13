import React, { createContext, useContext, useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data?.user || null);
            setLoading(false);
        };

        checkUser();

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });

        return () => {
            listener?.subscription?.unsubscribe();
        };
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
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
