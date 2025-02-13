import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { Typography } from "@mui/material";

export function Counter({ userId, angelId, angelName, initialCount }) {
    const [counter, setCounter] = useState(() => {
        return Number.isNaN(Number(initialCount)) ? 0 : Number(initialCount);
    });

    const updateUserCollection = async (newCount) => {
        const timestamp = new Date().toISOString();

        if (newCount === 0) {
            await supabase
                .from("user_collections")
                .delete()
                .match({ users_id: userId, angels_id: angelId });
        } else {
            const { data, error } = await supabase
                .from("user_collections")
                .upsert([{
                    users_id: userId,
                    angels_id: angelId,
                    angels_name: angelName,
                    count: newCount,
                    is_favorite: false,
                    in_search_of: false,
                    willing_to_trade: false,
                    updated_at: timestamp
                }], { onConflict: ["users_id", "angels_id"] });

            if (error) console.error("Error updating user_collections:", error);
        }
    };

    const handleDecrement = async () => {
        setCounter((prev) => {
            const newCount = Math.max(prev - 1, 0); 
            updateUserCollection(newCount); 
            return newCount;
        });
    };

    const handleIncrement = async () => {
        setCounter((prev) => {
            const newCount = prev + 1;
            updateUserCollection(newCount); 
            return newCount;
        });
    };

    useEffect(() => {
        const validInitialCount = Number.isNaN(Number(initialCount)) ? 0 : Number(initialCount);
        setCounter(validInitialCount);
    }, [initialCount]);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
                component="span"
                sx={{
                    color: "primary.dark", 
                    fontWeight: "bold", 
                    cursor: "pointer", 
                    fontSize: "24px", 
                    padding: "0 12px"
                }}
                onClick={handleDecrement}
            >
                -
            </Typography>
            
            <span style={{ margin: "0 10px", fontSize: "22px", fontWeight: "600", color: "black" }}>
                {counter}
            </span> 

            <Typography
                component="span"
                sx={{
                    color: "primary.dark", 
                    fontWeight: "bold", 
                    cursor: "pointer", 
                    fontSize: "24px", 
                    padding: "0 12px"
                }}
                onClick={handleIncrement}
            >
                +
            </Typography>
        </div>
    );
}
