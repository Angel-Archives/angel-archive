import React, { useState } from "react";
import { Sort } from "./Sort";
import {Box} from "@mui/material"
export const SideBar = () => {
    const [sortedData, setSortedData] = useState([]);
    
    const options = [
        { label: "Alphabetically", value: "alphabetical" },
        { label: "By Date", value: "date" },
        { label: "By Price", value: "price" }
    ];

    const handleSortChange = (option) => {
        // Handle sorting logic based on the selected option
        console.log("Sort by:", option.label);
        // Example sorting logic (replace with your data sorting):
        switch (option.value) {
            case "alphabetical":
                // Sort data alphabetically
                break;
            case "date":
                // Sort data by date
                break;
            case "price":
                // Sort data by price
                break;
            default:
                break;
        }
    };

    return (
        <Box bgcolor={"pink"} flex={1} p={2} sx={{display: {xs:"none", sm: "block"}}}>
            <Sort options={options} onSortChange={handleSortChange}/>
            {/* Render your sortedData here */}
        </Box>
    );
};
