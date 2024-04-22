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
 import UserCard from '../components/UserCard';
function MatchesPage() {
    return (
        <>
            <Flex
            justifyContent={'flex-start'}
            padding='10'
            direction={'column'}>
                <Text
                fontSize='30px'>
                    Users You Matched With:
                </Text>  
            </Flex>

            <UserCard user={{
                first_name: "Andrew",
                last_name: "Bertlshofer",
                year: "Senior",
                major: "CS",
                email: "abertlsh@uncc.edu"
            }}/>

        </>
    )
}

export default MatchesPage;