import { Link } from "react-router-dom";
import imgsrc from "../assets/logo.png"
import {
    Box,
    Flex,
    Text,
    IconButton,
    Image,
    Stack,
    Collapse,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

export default function Header() {

    return (
        <Box height='60px'>
            <Flex
                bg={useColorModeValue('blue.200', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                justifyContent={'center'}>
        
                    <Image src={imgsrc} height='50px' />

                
            </Flex>

        </Box>
    )
}




