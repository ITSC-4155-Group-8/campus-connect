import imgsrc from "../assets/logo.png"
import { Link } from 'react-router-dom';
import {
    Box,
    Flex,
    Image,
    useColorModeValue,
} from '@chakra-ui/react'

export default function Header() {

    return (
        <Box 
        height='60px'>
            <Flex
                alignSelf={"center"}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
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
                    
                    paddingRight={"5px"}
                    paddingLeft={"5px"}>
                    <Flex
                        alignItems={"center"}
                        gap={"35px"}>
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

                <Link to={""}><Image src={imgsrc} height='50px' padding={"0"} /></Link>

                <Box
                paddingLeft={"5px"}
                paddingRight={"5px"}>
                    <Flex
                        alignItems={"center"}
                        gap={"35px"}>
                            <Link
                            to={"/profile"}>
                                Profile
                            </Link>
                            <Link to={logoutURL}>
                                Sign Out
                            </Link>
                    </Flex>
                </Box>
                
                
        


            </Flex>

        </Box>
    )
}




