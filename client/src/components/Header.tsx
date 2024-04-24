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
                alignItems={"center"}
                direction={"row"}
                alignSelf={"center"}
                justifyContent={"space-between"}
                bg={useColorModeValue('blue.200', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                >
        
                    

                    <Box 
                    
                    paddingRight="5px">
                    <Flex
                        alignItems={"center"}>
                            <Link
                            to={"/matches"}>
                                Matches
                            </Link>
                            <Link
                            to={"/chat"}>
                                Chat
                            </Link>
                            <Link
                            to={"/friends"}>
                                Friends
                            </Link>
                    </Flex>
                </Box>
                <Image src={imgsrc} height='50px' padding={"0"} />
                <Box
                paddingLeft="5px">
                    <Flex
                        alignItems={"center"}>
                            <Link
                            to={"/profile"}>
                                Profile
                            </Link>
                            <Text
                            padding="10px">
                                Sign Out
                            </Text>
                    </Flex>
                </Box>
                
                
        


            </Flex>

        </Box>
    )
}




