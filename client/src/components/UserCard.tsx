import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Box, Stack, useColorModeValue, StackDivider } from '@chakra-ui/react'

export default function UserCard(props) {
    const user = props.user;
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
                    </Stack>
                </CardBody>
            </Card>

    )
}