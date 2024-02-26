import { Link, Route, Switch } from "wouter";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <>
            <nav>
                <Link href="/">Home</Link>
                <Link href="/login">Login</Link>
            </nav>

            <div>
                {/* Routes below are matched exclusively - the first matched route gets rendered */}
                <Switch>
                    <Route path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />

                    <Route path="/users/:name">
                        {(params) => <>Hello, {params.name}!</>}
                    </Route>

                    {/* Default route in a switch */}
                    <Route>404: No such page!</Route>
                </Switch>
            </div>
        </>
    )
}

export default App
