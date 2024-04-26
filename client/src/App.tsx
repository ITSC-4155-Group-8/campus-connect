import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container, Image, Flex } from '@chakra-ui/react';
import imgsrc from "./assets/logo.png"

import Header from "./components/Header";
import Footer from "./components/Footer";
import SplashPage from "./pages/SplashPage";
import SignupPage from "./pages/SignupPage";
import MainPage from "./pages/MainPage";
import MatchesPage from "./pages/MatchesPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
    const [state, setState] = useState({
        loading: true,
        user: null,
        loggedin: false
    });
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(apiURL + '/profile', {
                    credentials: "include",
                })
                if (response.status == 404) {
                    setState({ user: null, loading: false, loggedin: true })
                } else {
                    const json = await response.json()
                    setState({ user: json, loading: false, loggedin: true })
                }
            } catch {
                setState({ user: null, loading: false, loggedin: false })
            }
        }

        fetchData();
    }, [])

    if (state.loading) {
        return (
            <>
                <Flex style={{height: "100vh"}} direction="column" justifyContent="center">
                    <Flex direction="row" justifyContent="center">
                        <Image src={imgsrc} maxWidth={'400px'} rounded="1rem" />
                    </Flex>
                </Flex>
            </>
        );
    } else {
        return (
            <>
                <Header />
                <Container style={{ height: "calc(100vh - 120px)" }} maxWidth="container.lg">
                    {!state.loggedin ? <SplashPage /> : !state.user ? <SignupPage /> : <Outlet />}
                </Container>
                <Footer />
            </>
        );
    }
}

export default App;
