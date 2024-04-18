import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, Flex } from '@chakra-ui/react';

import Header from "./components/Header";
import Footer from "./components/Footer";
import NavFooter from "./components/NavFooter";

import SignupPage from "./pages/SignupPage";
import SplashPage from "./pages/SplashPage";
import OnboardingPage from "./pages/OnboardingPage";

function App() {
    const [state, setState] = useState({
        user: null
    });

    if (!state.user) return (
        <>
            <Header />
            <Container style={{height: "calc(100vh - 120px)"}} maxWidth="container.lg">
                <Flex direction='column' justifyContent='center' height='100%'>
                    <SplashPage/>
                </Flex>
                
            </Container>

            <Footer />
        </>
    );

    if (state.user.new) return (
        <>
            <OnboardingPage />
        </>
    );

    return (
        <>
            <Header />

            <Container maxWidth="container.lg">
                <Outlet />
            </Container>

            <Footer />
        </>
    )
}

export default App
