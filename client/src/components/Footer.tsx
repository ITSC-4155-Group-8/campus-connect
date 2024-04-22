import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue,
    Flex
} from '@chakra-ui/react'

export default function Footer() {
    return (
        <Flex
            justify="center" align="center" p={4}
            bg={useColorModeValue('blue.200', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
            >
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Text>© 2024 CampusConnect. All rights reserved</Text>
                
            </Container>
        </Flex>
    )
}