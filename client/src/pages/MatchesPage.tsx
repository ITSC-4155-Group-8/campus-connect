import { 
    Input,
    Flex,
    Select,
    Spacer,
    Button, 
    Heading,
    Divider,
    Box,
    Text
 } from '@chakra-ui/react'

function Matches() {
    return (
        <>
            <Flex
            justifyContent={'flex-start'}
            padding='10'
            direction={'column'}>
                <Text
                fontSize='30px'>
                    Welcome, here are your matched users
                </Text>  
            </Flex>
        </>
    )
}

export default Matches;