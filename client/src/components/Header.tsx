import { Link } from "wouter";
import { Box, Container, Heading, Flex } from "@chakra-ui/react";

function Header() {
	return <>
		<Box as="header" className="header" paddingY="0.3rem">
			<Container as="nav" maxWidth="container.xl">
				<Flex align="center" justify="space-between">
					<Heading pb="0.5rem">Campus Connect</Heading>
					<Flex gap="1rem" justify="center">
						<Link href="/">Home</Link>
						<Link href="/login">Login</Link>
						<Link href="/apitest">API Test Page</Link>
					</Flex>
				</Flex>
			</Container>
		</Box>
	</>
}

export default Header;
