import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { styled } from '@mui/system';
import { NavBarLanding } from "../components/NavBarLanding";

const LeftSection = styled(Box)({
    width: "45%",
    backgroundImage: "url('https://www.sonnyangel.com/renewal/wp-content/uploads/2019/10/Tomato.png')", //temp
    backgroundSize: "cover",
    backgroundPosition: "center",
});

const RightSection = styled(Box)({
    width: "55%",
    padding: "40px",
});

const Container = styled(Paper)(({ theme }) => ({
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    height: "10%", 
    letterSpacing: "1px", 
    color:"#fff"
}));

const JoinButtonContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60%",
});

const JoinButton = styled(Button)({
    fontSize: "2rem",
    width: "25%",
    padding: "40px",
    borderRadius: "15px",
});

export function LandingPage() {
    return (
        <Box sx={{ height: "100vh", overflow: "hidden" }}>
            <NavBarLanding />

            <Box display="flex" height="100vh">
                <LeftSection />
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
