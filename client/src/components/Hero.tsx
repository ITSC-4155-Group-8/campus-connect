import { Link } from "react-router-dom"
import PropTypes from "prop-types"
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
    Spacer,
} from "@chakra-ui/react"

export default function Hero({
    title = "Welcome to Campus-Connect",
    subtitle = "Connect with people on your campus today.",
    image = imgsrc,
    ctaLink = "",
    ctaText = "Test",
    ...rest
}) {
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
                                bg={'blue.100'}
                            >
                                Log In
                            </Button>
                            <Button
                                size="md"
                                bg={'blue.100'}
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

Hero.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    image: PropTypes.string,
    ctaText: PropTypes.string,
    ctaLink: PropTypes.string,
}

// Hero.defaultProps = {
//   title: "React landing page with Chakra UI",
//   subtitle:
//     "This is the subheader section where you describe the basic benefits of your product",
//   image: "<https://source.unsplash.com/collection/404339/800x600>",
//   ctaText: "Create your account now",
//   ctaLink: "/signup",
// }
