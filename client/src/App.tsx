import { Route, Switch } from "wouter";
import { Container } from '@chakra-ui/react';

import Header from "./components/Header";
import Footer from "./components/Footer"; 

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import APITestPage from './pages/APITestPage';
import AboutUsPage from './pages/AboutUsPage'; 

function App() {
    return (
        <>
            <Header />

            <Container maxWidth="container.lg">
                {/* Routes below are matched exclusively - the first matched route gets rendered */}
                <Switch>
                    <Route path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/apitest" component={APITestPage} />
                    <Route path="/about" component={AboutUsPage} />
                    <Route>404: No such page!</Route>
                </Switch>
            </Container>

            <Footer />
        </>
    )
}

export default App
