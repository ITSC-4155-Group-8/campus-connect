import { useState, useEffect } from "react";

function APITestPage() {
	const [state, setState] = useState({ text: "" });
	useEffect(() => {
		async function fetchData() {
			const response = await fetch(import.meta.env.PROD ? '/api' : 'http://localhost:5000/api')
			const text = await response.text()
			setState({ text: text })
		}

		fetchData();
	}, [])
	return (
		<>
			API Test Page
			<p>{state.text}</p>
		</>
	)
}

export default APITestPage;
