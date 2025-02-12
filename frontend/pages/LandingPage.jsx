import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { styled } from '@mui/system';
import { useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LeftSection = styled(Box)({
    width: "45%",
    backgroundImage: "url('/src/assets/AngelArchiveLandingPage.png')",
    backgroundSize: "cover", 
    backgroundPosition: "center",
    height: "calc(100vh - 80px)", 
});


const RightSection = styled(Box)(({ theme }) => ({
    width: "55%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", 
}));

const Container = styled(Paper)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    padding: theme.spacing(1, 3), 
    display: "flex",
    justifyContent: "flex-start", 
    alignItems: "center",
    height: "80px",
    letterSpacing: "1px", 
    color: "#fff",
    borderRadius: "8px",
    textAlign: "left",
    boxShadow: theme.shadows[3],
}));

const JoinButtonContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
});

const JoinButton = styled(Button)(({ theme }) => ({
    fontSize: "1.5rem",
    padding: theme.spacing(2, 4),
    borderRadius: "25px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: "300px",
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
    },
}));

export function LandingPage() {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Redirect user to signup page
    const handleJoinNow = () => {
        navigate("/signup");
    }

    return (
        <Box sx={{ height: "calc(100vh - 80px)", overflow: "hidden" }}> 
            <Box display="flex" height="100%" flexDirection={isMobile ? "column" : "row"}  sx={{
                    backgroundImage: "url('/src/assets/AngelArchiveBackground4.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                 }}>
                <LeftSection sx={{ 
                    width: isMobile ? "100%" : "45%", 
                    height: "100%", 
                }} />
                
                <RightSection sx={{ 
    width: isMobile ? "100%" : "55%", 
    padding: isMobile ? "20px" : "40px" 
}}>
    {[
        { text: "Favorite: Only the Best Wings", color: "#FFB6C1" },
        { text: "In Search Of: The Angel of Your Dreams", color: "#FFD700" },
        { text: "Willing To Trade: Halo for Halo", color: "#98FB98" }
    ].map((item, index) => (
        <Container key={index} sx={{ backgroundColor: item.color }}>
            <Typography
                variant="h4"
                sx={{ 
                    fontSize: "clamp(1rem, 2.5vw, 4rem)", // Adjusts dynamically
                    fontWeight: 600 
                }}
            >
                {item.text}
            </Typography>
        </Container>
    ))}

    <JoinButtonContainer>
        <JoinButton variant="contained" onClick={handleJoinNow}>
            Join Now! 
        </JoinButton>
    </JoinButtonContainer>
</RightSection>

            </Box>
        </Box>
    );
}
