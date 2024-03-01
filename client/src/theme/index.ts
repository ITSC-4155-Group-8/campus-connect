import { extendTheme } from "@chakra-ui/react"

const overrides = {
	styles: {
		global: {
			header: {
				top: 0,
				left: 0,
				right: 0,
				color: "white",
				backgroundColor: "#4444f0",
				boxShadow: "0 0 10px 0 black"
			},
			footer: {
				top: 0,
				left: 0,
				right: 0,
				color: "white",
				backgroundColor: "#4444f0",
				boxShadow: "0 0 10px 0 black"
			}
		}
	},
	colors: {
		gray: {
			100: '#fafafa',
			200: '#f7f7f7',
		},
	},
};

export default extendTheme(overrides);