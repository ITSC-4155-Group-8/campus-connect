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
import { useOutletContext, Link } from "react-router-dom";

function HomePage() {
    const { user } = useOutletContext();
    return (
        
        <>
            <Container position="absolute" mx="2%" my="6%" >    
                <Text  fontSize={'5xl'}>Welcome back {user.first_name}</Text>         
            </Container>
            <TextCard/>
            <Card position="absolute" mx="30%" my="14%" border="1px solid black">
            <CardHeader>
                <Heading size='md'>You have {(user.match_queue).length} matches:</Heading>
            </CardHeader>
            <CardBody>
                    <Button as={Link} variant='solid' colorScheme='blue' to={"/matches"}>
                        See Matches
                    </Button>
                
            </CardBody>
            </Card>
            <Flex style={{ height: "calc(100vh - 120px)" }}></Flex>       
        </>
    )
}

export default HomePage;