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
import ProfilePage from './pages/ProfilePage'; 
import MatchesPage from './pages/MatchesPage'; 
import ChatPage from './pages/ChatPage'; 
import FriendsPage from './pages/FriendsPage.tsx';

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
                path: "profile",
                element: <ProfilePage />
            },
            {
                path: "chat",
                element: <ChatPage />
            }, 
            {
                path: "friends",
                element: <FriendsPage />
            }, 
            {
                path: "profile",
                element: <ProfilePage />
            },
            {
                path: "matches",
                element: <MatchesPage />
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
