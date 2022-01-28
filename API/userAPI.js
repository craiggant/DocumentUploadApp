export async function fetchUser({ username = '', password = '' }) {
	const response = await fetch('/api/fetchuser', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, password }),
	});
	const result = await response.json();

	return result;
}
