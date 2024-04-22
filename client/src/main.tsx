import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme';

import App from './App.tsx'

import HomePage from './pages/HomePage';
import MatchesPage from './pages/MatchesPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div>Error: Page Not Found</div>,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "matches",
                element: <MatchesPage/>
            }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>,
)
