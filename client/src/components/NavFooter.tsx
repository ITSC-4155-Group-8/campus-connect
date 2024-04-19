import { Link } from 'react-router-dom'

import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue,
    Icon,
    IconButton,
    Flex,
    Spacer
} from '@chakra-ui/react'
import { SearchIcon,
        EmailIcon,
        SettingsIcon
 } from '@chakra-ui/icons';
//import { FaMagnifyingGlass } from "react-icons/fa6";


export default function NavFooter() {
    return (
        <Box
            height="70px"
            bg={useColorModeValue('blue.200', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Flex align="center" justify="center" h="100%" >
                    <IconButton aria-label='Search' icon={<SearchIcon />} />
                    <Spacer width="30px"/>
                    <IconButton
                        aria-label='Send email'
                        icon={<EmailIcon />}
                    />
                    <Spacer width="30px"/>
                    <IconButton
                        aria-label='Settings'
                        icon={<SettingsIcon />}
                    />
                </Flex>
            </Container>
        </Box>
    )
}