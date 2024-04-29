import { 
    Container, 
    Box, 
    Text, 
    Flex } 
from '@chakra-ui/react'
import React from 'react';
import { useOutletContext, Link } from "react-router-dom";
import FriendCard from '../components/FriendCard';
import { useState, useEffect } from 'react';
    
function FriendsPage() {
    const { user } = useOutletContext();
    const [ state, setState ] = useState([])
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(apiURL + '/matches', {
                    credentials: "include",
                })
                const matches = (await response.json()).accepted
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
    return (
        <>
            <Container position="absolute" mx="2%" my="6%" >    
                <Text  fontSize={'4xl'}>Freinds List:</Text>      
                <Text  fontSize={'xl'}>You have {(user.matches).length} freinds.</Text>  
                {
                state.map(m => <FriendCard user={m[1]}/>)
                }   
            </Container>
            
            <Flex style={{ height: "calc(100vh - 120px)" }}></Flex>  
        </>
    )
}

export default FriendsPage;