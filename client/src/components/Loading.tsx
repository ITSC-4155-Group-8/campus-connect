import { Flex, Image } from '@chakra-ui/react';
import imgsrc from "../assets/logo.png"

export default function Loading() {
	return (
		<>
			<Flex style={{ height: "100vh" }} direction="column" justifyContent="center">
				<Flex direction="row" justifyContent="center">
					<Image src={imgsrc} maxWidth={'400px'} rounded="1rem" />
				</Flex>
			</Flex>
		</>
	);
}