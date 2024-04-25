//import { Link } from "react-router-dom";
import { Container, Box, Text, Flex, Image, Heading, useRadio } from '@chakra-ui/react'
import imgsrc from "../assets/profilePic.jpg"
import { useState, useEffect } from "react";

interface User {
    name: string;
    age: number;
    major: string;
    bio: string;
    // Add other properties as needed
}

function ProfilePage()  {
    
    const [state, setState] = useState<{
        loading: boolean;
        user: User | null;
        loggedin: boolean;
    }>({
        loading: true,
        user: null,
        loggedin: false
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(apiURL + '/profile', {
                    method: 'GET', 
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
    
    {state.user && (
    console.log(state.user.name)
    )}

    return (
        <>
            <Flex justifyContent='flex-start' padding='10' direction='row' gap={4}>
                <Image src={imgsrc} height='100px' width='100px' padding='0' />
                <Flex justifyContent='center' alignItems='center'>
                {state.user && (
                        <Heading fontSize='30px'>{state.user.name}</Heading>
                    )}
                </Flex>
            </Flex>

            {state.user && (
            <Flex gap={4} direction='column'>
                <Text>Age: {state.user.age}</Text>
                <Text>Major: {state.user.major}</Text>
                <Text>Bio: {state.user.bio}</Text>
            </Flex>
            )}
        </>
    );
}

export default ProfilePage;