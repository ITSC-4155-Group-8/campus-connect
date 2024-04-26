import {
    Text,
    useColorModeValue,
    Flex
} from '@chakra-ui/react'

export default function Footer() {
    return (
        <Flex
            justify="center" align="center" p={4}
            bg={useColorModeValue('blue.200', 'gray.900')}
            width={"100%"}
            flexDirection={'column'}
            >
                <Text>© 2024 CampusConnect. All rights reserved</Text>
        </Flex>
    )
}