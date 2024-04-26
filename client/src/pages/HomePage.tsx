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

import TextCard from "../components/TextCard";
import { useOutletContext } from "react-router-dom";

function HomePage() {
    const { user } = useOutletContext();
    return (
        
        <>
            <Container position="absolute" mx="2%" my="6%" >    
                <Text  fontSize={'5xl'}>Welcome back {user.first_name}</Text>         
            </Container>
            <TextCard/>
            <Card position="absolute" mx="12%" my="14%" border="1px solid black">
            <CardHeader>
                <Heading size='md'>You have {(user.matches).length} matches:</Heading>
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

export default HomePage;