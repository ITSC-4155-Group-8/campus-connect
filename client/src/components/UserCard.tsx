import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Box, Stack, StackDivider } from '@chakra-ui/react'

export default function UserCard() {
    return (
            <Card>
                <CardHeader>
                    <Heading size='md'>user.first user.last</Heading>
                </CardHeader>
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                School Year
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                user.year
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Major
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                user.major
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='xs' textTransform='uppercase'>
                                Email
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                user.email
                            </Text>
                        </Box>
                    </Stack>
                </CardBody>
            </Card>

    )
}