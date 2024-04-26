import { useState, useEffect } from 'react';

import { 
    Flex,
    Button,
    Text,
 } from '@chakra-ui/react'
 import UserCard from '../components/UserCard';
function MatchesPage() {
    const [ state, setState ] = useState([])
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(apiURL + '/matches', {
                    credentials: "include",
                })
                const matches = (await response.json()).match_queue
                let match_arr = []
                matches.forEach(async m => {
                    const r = await fetch(apiURL + '/users/' + m.match_id, {
                        credentials: "include",
                    })
                    const u = await r.json()
                    match_arr.push([m, u])
                    if (match_arr.length === matches.length) {
                        setState(match_arr) 
                    }
                });
                
            } catch {
                
            }
        }

        fetchData();
    }, [])

    async function generate(){
        const response = await fetch(apiURL + '/generate_matches', {
            credentials: "include",
            method: "POST",
        })
    }

    return (
        <>
            <Flex
            justifyContent={'flex-start'}
            padding='10'
            direction={'column'}
            gap={"1rem"}>
                <Button variant='solid' colorScheme='blue' onClick={generate}>
                    Generate Matches
                </Button>
                <Text
                fontSize='30px'>
                    Users Your Matched With:
                </Text>  
                {
                state.map(m => <UserCard match_id={m[0].id} user={m[1]}/>)
            }
            </Flex>
        </>
    )
}

export default MatchesPage;