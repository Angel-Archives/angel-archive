import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import SortIcon from '@mui/icons-material/Sort';

export const Sort = ({ onSortChange }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState("Count Ascending");

    const sortOptions = [
        { label: "Count ↑", value: "count_asc" },
        { label: "Count ↓", value: "count_desc" },
        { label: "A-Z", value: "alpha_asc" },
        { label: "Z-A", value: "alpha_desc" },
    ];

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSortChange = (option) => {
        setSelectedOption(option.label);
        onSortChange(option.value); // Pass the value to the parent to handle sorting logic
        handleClose();
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <SortIcon />
            </IconButton>
            <Typography variant="h6" sx={{ marginLeft: 1 }}>
                Sort by: {selectedOption}
            </Typography>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {sortOptions.map((option, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => handleSortChange(option)}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
