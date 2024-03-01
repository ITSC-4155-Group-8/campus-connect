import { Link } from "wouter";
import { Box, Container, Flex } from "@chakra-ui/react";

function Footer() {
	return <>
		<Box as="footer" className="footer" paddingY="2rem" h="125">
			<Container as="nav" maxWidth="container.xl">
				<Flex align="center" justify="center">
					<Flex gap="1rem" justify="center">
						<Link href="/">Contact Us</Link>
						<Link href="/">About</Link>
					</Flex>
				</Flex>
			</Container>
		</Box>
	</>
}

export default Footer;
