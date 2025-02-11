import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { styled } from '@mui/system';
import { NavBarLanding } from "../components/NavBarLanding";

// Styled components for the landing page
const LeftSection = styled(Box)({
    width: "45%", // Adjust to 45% of the screen width
    backgroundImage: "url('https://www.sonnyangel.com/renewal/wp-content/uploads/2019/10/Tomato.png')", // Example image URL
    backgroundSize: "cover", // fills whole section
    backgroundPosition: "center", // centers in middle of box
});

const RightSection = styled(Box)({
    width: "55%", // 55% of the screen width
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // Space between containers and button
    // height: "100vh", // Full viewport height
});

const Container = styled(Paper)(({ theme }) => ({
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    height: "10%", // Adjust to the height in the right section
    fontSize: "3rem", // Bigger font size for headings,
    letterSpacing: "1px", // A little letter spacing for better readability - spreads out more
    backgroundColor: theme.palette.primary.light, // Example temporary color from the theme
    color: "#fff", // Default text color
}));

const JoinButtonContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60%", // Reduced height for the button section
});

const JoinButton = styled(Button)({
    fontSize: "2rem", // Large font size
    width: "25%", // Button width is 50% of the right section for balance
    padding: "40px", // More padding to make the button larger
    borderRadius: "15px", // Slight rounding for the button edges
});

export function LandingPage() {
    return (
        <Box sx={{ height: "100vh", overflow: "hidden" }}> {/* Ensures no overall page scroll */}
            <NavBarLanding />

            <Box display="flex" height="100vh">
                <LeftSection />
                {/* Right Section: Containers & Button */}
                <RightSection>
                    <Container style={{ backgroundColor: "#FFB6C1" }}> 
                        <Typography variant="h2">
                            Favorite - The Best Wings
                        </Typography>
                    </Container>

                    <Container style={{ backgroundColor: "#FFD700" }}>
                        <Typography variant="h2">
                            In Search Of - The Angel of Your Dreams
                        </Typography>
                    </Container>

                    <Container style={{ backgroundColor: "#98FB98" }}>
                        <Typography variant="h2">
                            Willing To Trade - Halo for Halo
                        </Typography>
                    </Container>


                    <JoinButtonContainer>
                        <JoinButton variant="contained" color="primary">
                            Join Now
                        </JoinButton>
                    </JoinButtonContainer>
                </RightSection>
            </Box>
        </Box>
    );
}
