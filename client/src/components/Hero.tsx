import { Link } from "react-router-dom"
import imgsrc from "../assets/logo.png"
import {
    Box,
    Button,
    Flex,
    Image,
    Heading,
    Stack,
    Text,
    Center,
} from "@chakra-ui/react"

export default function Hero() {
    return (
        <>
            <Flex direction="column">
                <Heading textAlign="center">Welcome to CampusConnect</Heading>
                <Flex direction="row-reverse" flexWrap="wrap" justifyContent='center'>
                        <Image src={imgsrc} maxWidth={'400px'} rounded="1rem" />
                    <Flex direction="column" justifyContent='center'flexWrap='wrap'>
                        <Text>

                            Connect with people on your campus today.
                        </Text>
                        <Flex justifyContent={'center'}>
                            <Button
                                size="md"
                            >
                                Log In
                            </Button>
                            <Button
                                size="md"
                            >
                                Sign Up
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}
