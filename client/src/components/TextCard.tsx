import {
    Heading,
    Text,
    Box, 
    Card, 
    CardHeader, 
    CardBody, 
    Stack,
    StackDivider,
} from '@chakra-ui/react'

export default function Header() {
    return (
        <Card position="absolute" mx="2%" my="14%" border="1px solid black">
                        <CardHeader>
                            <Heading size='md'>You have 3 new messages.</Heading>
                        </CardHeader>
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading size='xs'>
                                        Jack
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                            Hello
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs'>
                                        Bob
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                            How are you doing
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs'>
                                        Will
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                            Whats up
                                    </Text>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
    )
}