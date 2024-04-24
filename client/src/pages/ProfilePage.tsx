// import { Link } from "react-router-dom";
import { Container, Box, Text, Flex, Image, Heading } from '@chakra-ui/react'
import imgsrc from "../assets/profilePic.jpg"

function ProfilePage() {
    return (
        <>
            <Flex
            justifyContent={'flex-start'}
            padding='10'
            direction={'row'}
            gap={"50px"}>
                <Image src={imgsrc} height='100px' width='100px' padding={"0"} />


                <Heading
                fontSize='30px'>
                    John Smith
                </Heading>  

            </Flex>

            <Flex
            gap={"15"}
            direction={"column"}>
            <Text>
                Age: 
            </Text>
            <Text>
                Hometown: 
            </Text>
            <Text>
                Major: 
            </Text>
            <Text>
                Bio: 
                
            </Text>
            </Flex>

        </>
    )
}

export default ProfilePage;