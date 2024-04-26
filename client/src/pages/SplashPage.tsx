import Hero from "../components/Hero";
import { Flex } from '@chakra-ui/react';

function SplashPage() {
    return (
        <>
            <Flex style={{ height: "calc(100vh - 120px)" }}  direction='column' justifyContent='center' height='100%'>
                <Hero />
            </Flex>
        </>
    )
}

export default SplashPage;