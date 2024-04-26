import {
    useColorModeValue,
    IconButton,
    Flex,
    Spacer,
} from '@chakra-ui/react'
import { SearchIcon,
        EmailIcon,
        SettingsIcon
 } from '@chakra-ui/icons';
//import { FaMagnifyingGlass } from "react-icons/fa6";


export default function NavFooter() {
    return (
                <Flex align="center" justify="center" h="100%" bg={useColorModeValue('blue.200', 'gray.900')}
                width={"100%"} p={4}>
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

    )
}