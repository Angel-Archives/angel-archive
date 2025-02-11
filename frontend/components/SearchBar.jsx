import { Box, InputBase} from "@mui/material";

const sectionStyle = {
    display: "flex",
    alignItems: "center",
};

export function SearchBar(){
    return (
        <Box sx={{ ...sectionStyle, flex: 1, justifyContent: "center" }}>
            <InputBase
                placeholder="Search..."
                    aria-label="search"
                        sx={{
                        backgroundColor: "pink",
                        borderRadius: "4px",
                        padding: "0 15px",
                        width: { xs: "70%", sm: "40%" },
                        fontSize: "1rem",
                    }}
                />
        </Box>

    )
}