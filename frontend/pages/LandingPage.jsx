import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { styled } from '@mui/system';
import { NavBarLanding } from "../components/NavBarLanding";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    const theme = useTheme();
    const navigate = useNavigate();

    const handleJoinNow = () => {
        navigate("/signup");
    }

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
                        <Button 
                            color="inherit" 
                            variant="outlined" 
                            sx={{ 
                                fontSize: '2.5rem', 
                                height: '96px', 
                                padding: '20px 40px', 
                                marginLeft: '16px',
                                width: '300px', 
                                borderRadius: "15px", 
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText, 
                                // see if added white border is needed -> can't see since background right now is white 
                                // border: "2px solid #fff",
                                // change colors for hover if want to -> prob should, not aesthetically pleasing right now 
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.light, 
                                    borderColor: theme.palette.primary.dark, 
                                },
                            }}
                            onClick={handleJoinNow}
                        >
                            Join Now! 
                        </Button>
                    </JoinButtonContainer>
                </RightSection>
            </Box>
        </Box>
    );
}
