import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, Flex } from '@chakra-ui/react';

import Header from "./components/Header";
import Footer from "./components/Footer";

import SplashPage from "./pages/SplashPage";
import OnboardingPage from "./pages/OnboardingPage";

function App() {
    const [state, setState] = useState({
        user: null
    });

    if (!state.user) return (
        <>
            <Container style={{height: "calc(100vh - 60px)"}} maxWidth="container.lg">
                <SplashPage />
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
