import { useState } from 'react';

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
    const [ state, setState ] = useState([
        {
            first_name: "Andrew",
            last_name: "Bertlshofer",
            year: "Senior",
            major: "CS",
            email: "abertlsh@uncc.edu"
        },
        {
            first_name: "Andrew",
            last_name: "Bertlshofer",
            year: "Senior",
            major: "CS",
            email: "abertlsh@uncc.edu"
        },
        {
            first_name: "Andrew",
            last_name: "Bertlshofer",
            year: "Senior",
            major: "CS",
            email: "abertlsh@uncc.edu"
        }
    ])
    return (
        <>
            <Flex
            justifyContent={'flex-start'}
            padding='10'
            direction={'column'}
            gap={"1rem"}>
                <Text
                fontSize='30px'>
                    Users You Matched With:
                </Text>  
                {
                state.map(user => <UserCard user={user}/>)
            }
            </Flex>
           
            
        </>
    )
}

export default MatchesPage;