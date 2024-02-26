import { Link, Route, Switch } from "wouter";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import APITestPage from './pages/APITestPage';
import './App.css'

function App() {
    return (
        <>
            <header className="header">
                <nav>
                    <Link href="/">Home</Link>
                    <Link href="/login">Login</Link>
                    <Link href="/apitest">API Test Page</Link>
                </nav>
            </header>

            <div>
                {/* Routes below are matched exclusively - the first matched route gets rendered */}
                <Switch>
                    <Route path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/apitest" component={APITestPage} />
                    {/*
                    <Route path="/users/:name">
                        {(params) => <>Hello, {params.name}!</>}
                    </Route>
                    */}
                    {/* Default route in a switch */}
                    <Route>404: No such page!</Route>
                </Switch>
            </div>

            {/* Footer is under construction 
            {<footer className="sticky-footer">
                <div id="links">
                    <a href="">Contact Us</a>
                    <a href="">About</a>
                </div>
            </footer>} */}
        </>
    )
}

export default App
