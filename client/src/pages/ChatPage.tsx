import { Container, Box, Text, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

function ChatPage() {
    const { user } = useOutletContext();
    const [state, setState] = useState<object[]>([])
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(apiURL + '/matches', {
                    credentials: "include",
                })
                const matches = (await response.json()).accepted
                const match_arr: object[] = []
                matches.forEach(async (m: object) => {
                    const r = await fetch(apiURL + '/users/' + m.match_id, {
                        credentials: "include",
                    })
                    const u = await r.json()
                    match_arr.push([m, u])
                    if (match_arr.length === matches.length) {
                        setState(match_arr)
                    }
                });

            } catch (e) {
                console.error(e)
            }
        }
        fetchData();
    }, [])
    return (
        <>
            <Text>
                Welcome to the Chat Page
            </Text>
        </>
    )
}

export default ChatPage;