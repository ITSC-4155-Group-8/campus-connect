import { Card, CardHeader, CardBody, Heading, Text, Box, Button, Stack, useColorModeValue, StackDivider } from '@chakra-ui/react'
import { useState } from 'react';

export default function UserCard(props) {
    const user = props.user;
    const match = props.match;
    const [buttonText, setButtonText] = useState('False');
    const handleClick =async () => {setButtonText('True')
        const response = await fetch(apiURL + '/matches/'+match.match_object_id+"/accept", {
            credentials: "include",
            method: "POST",
        })
    } ;
    return (
            <Card
            backgroundColor={useColorModeValue('blue.200', 'gray.800')}style={{ border: "2px solid black" }}>
                <CardHeader>
                    <Heading size='md'>{user.first_name} {user.last_name}</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='2'>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                School Year
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {user.school_year}
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
                                {match.compatibility_score}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Compatibility description
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                {match.compatibility_description}
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
