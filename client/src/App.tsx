import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container,} from '@chakra-ui/react';

import Header from "./components/Header";
import Footer from "./components/Footer";
import NavFooter from "./components/NavFooter";
import Loading from "./components/Loading";
import SplashPage from "./pages/SplashPage";
import SignupPage from "./pages/SignupPage";
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
            <Loading/>
        );
    } else {
        return (
            <>
                {!state.loggedin ? "" : !state.user ? "" : <Header />}
                <Container maxWidth="container.lg">
                    {!state.loggedin ? <SplashPage /> : !state.user ? <SignupPage /> : <>
                    <Outlet context={{user: state.user.user_data, image: state.user.user.profile_pic}} />
                    <NavFooter/>
                    </>}
                </Container>
                {(!state.loggedin || !state.user) ? <Footer/> : ""}
            </>
        );
    }
}

export default App;
