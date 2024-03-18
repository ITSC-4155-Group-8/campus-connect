import { Divider } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'


function AboutPage() {
    return (
        <>
            <Heading paddingTop='25'
            paddingBottom='15'>
                About Us
            </Heading>
            <Box h='200'>
            <Divider orientation='horizontal' size = '20' />
            <p>
            We created CampusConnect to make it easier for students on campuses everywhere to find new friends. 
            </p>
            </Box>
        </>
    )
}

export default AboutPage;