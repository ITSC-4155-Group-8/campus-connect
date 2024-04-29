import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Box, Button, Stack, useColorModeValue, StackDivider } from '@chakra-ui/react'

export default function UserCard(props) {
    const user = props.user;
    return (
            <Card
            backgroundColor={useColorModeValue('blue.200', 'gray.800')}style={{ border: "2px solid black" }}>
                <CardHeader>
                    <Heading size='md'>{user.first_name} {user.last_name}</Heading>
                </CardHeader>
            </Card>
        
    )
    
}
