import { useState } from 'react';

import { 
    Input,
    Flex,
    Text,
 } from '@chakra-ui/react'
 import UserCard from '../components/UserCard';
function MatchesPage() {
    const [ state, setState ] = useState([
        {
            name: "Andrew Bertlshofer",
            year: "Senior",
            major: "CS",
            email: "abertlsh@uncc.edu",
            compatibility_score: "100",
            compatibility_description: "big amount of text",
            
        },
        {
            name: "Andrew Bertlshofer",
            year: "Senior",
            major: "CS",
            email: "abertlsh@uncc.edu"
        },
        {
            name: "Andrew Bertlshofer",
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