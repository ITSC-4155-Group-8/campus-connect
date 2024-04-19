import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container, Image, Flex } from '@chakra-ui/react';
import imgsrc from "./assets/logo.png"

import Header from "./components/Header";
import Footer from "./components/Footer";
import SplashPage from "./pages/SplashPage";
import SignupPage from "./pages/SignupPage";

function App() {
    const [state, setState] = useState({
        loading: true,
        user: null
    });
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(apiURL + '/profile', {
                    credentials: "include",
                })
                const json = await response.json()
                setState({ user: json, loading: false })
            } catch {
                setState({ user: null, loading: false })
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
                    {!state.user ? <SplashPage /> : state.user.new ? <SignupPage /> : <Outlet />}
                </Container>
                <Footer />
            </>
        );
    }
}

export default App;
