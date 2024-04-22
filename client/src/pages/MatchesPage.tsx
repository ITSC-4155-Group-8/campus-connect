import { 
    Input,
    Flex,
    Select,
    Spacer,
    Button, 
    Heading,
    Divider,
    Box,
    Text,
    Stack,
    StackDivider
 } from '@chakra-ui/react'
 import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
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