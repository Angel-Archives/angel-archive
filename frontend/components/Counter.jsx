import { useState } from "react";
import supabase from "../config/supabaseClient";

export function Counter({ userId, angelId, angelName }) {  
    const [counter, setCounter] = useState(0);

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
        setCounter(prev => {
            const newCount = Math.max(prev - 1, 0);
            updateUserCollection(newCount);
            return newCount;
        });
    };

    const handleIncrement = async () => {
        setCounter(prev => {
            const newCount = prev + 1;
            updateUserCollection(newCount);
            return newCount;
        });
    };

    return (
        <div>
            <button onClick={handleDecrement}>-</button>
            <span>{counter}</span>
            <button onClick={handleIncrement}>+</button>
        </div>
    );
}
