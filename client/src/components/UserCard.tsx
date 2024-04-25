import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Box, Button, Stack, useColorModeValue, StackDivider } from '@chakra-ui/react'
import { useState } from 'react';

export default function UserCard(props) {
    const user = props.user;
    const [buttonText, setButtonText] = useState('False');
    const handleClick = () => {setButtonText('True')} ;
    return (
            <Card
            backgroundColor={useColorModeValue('blue.200', 'gray.800')}style={{ border: "2px solid black" }}>
                <CardHeader>
                    <Heading size='md'>{user.name}</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='2'>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                School Year
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {user.year}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Major
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {user.major}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Email
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {user.email}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Compatibility Score
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {user.compatibility_score}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Compatibility description
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {user.compatibility_description}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Do you want to match?
                            </Heading>
                            <Button onClick={handleClick}>{buttonText}</Button>
                        </Box>
                        
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Do they want to match?
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {user.match_wants_match}
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>
        
    )
    
}
