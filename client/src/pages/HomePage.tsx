import { useState, useEffect } from "react";
import {
    Button,
    Heading,
    Flex,
    Text,
    Card, 
    CardHeader, 
    CardBody, 
    Container,
} from '@chakra-ui/react'

import Loading from "../components/Loading";
import TextCard from "../components/TextCard";

interface User {
    first_name: string;
    last_name:String;
    matches:[];
}

function HomePage() {
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
                    method:'GET',   
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
            <Container position="absolute" mx="2%" my="6%" >    
                <Text  fontSize={'5xl'}>Welcome back {state.user?.first_name}</Text>         
            </Container>
            <TextCard/>
            <Card position="absolute" mx="12%" my="14%" border="1px solid black">
            <CardHeader>
                <Heading size='md'>You have {(state.user?.matches)?.length} matches:</Heading>
            </CardHeader>
            <CardBody>
                <Button variant='solid' colorScheme='blue'>
                    See Matches
                </Button>
            </CardBody>
            </Card>
            <Flex style={{ height: "calc(100vh - 120px)" }}></Flex>       
        </>
    )
}
}

export default HomePage;