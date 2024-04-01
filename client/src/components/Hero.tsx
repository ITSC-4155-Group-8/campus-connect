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
} from "@chakra-ui/react"

export default function Hero() {
    return (
        <>
            <Flex direction="column">
                <Heading textAlign="center">Welcome to CampusConnect</Heading>
                <Flex direction="row-reverse">
                    <Box w={{ base: "70%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
                        <Image src={imgsrc} sizes="90%" rounded="1rem" shadow="2xl" />
                    </Box>
                    <Flex direction="column">
                        <Text>

                            Connect with people on your campus today.
                        </Text>
                        <Flex>
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
