import { Link } from 'wouter'
import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'

export default function Footer() {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Text>© 2024 CampusConnect. All rights reserved</Text>
                <Stack direction={'row'} spacing={6}>
                    <Link href="/about">About Us</Link>
                </Stack>
            </Container>
        </Box>
    )
}