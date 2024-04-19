import { Container, Box, Text, Flex } from '@chakra-ui/react'

function MainPage() {
    return (
        <>
            <Flex
            justifyContent={'flex-start'}
            padding='10'
            direction={'column'}>
                <Text
                fontSize='30px'>
                    Welcome back, John
                </Text>  
                <Text
                paddingTop='5'
                fontSize='15px'>
                    You have no new updates

                </Text>
            </Flex>
        </>
    )
}

export default MainPage;