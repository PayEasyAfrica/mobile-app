export async function login(username: string, password: string) {
	return new Promise<{ token: string }>((resolve, reject) => {
		// Simulate an API call that takes 1 second to respond
		setTimeout(() => {
			// If the username and password are both "admin", return a token
			if (username === 'admin' && password === 'admin') {
				resolve({ token: 'mock-token' });
			} else {
				reject(new Error('Invalid username or password'));
			}
		}, 1000);
	});
}

export async function checkToken(token: string) {
	return new Promise<boolean>((resolve, reject) => {
		// Simulate an API call that takes 1 second to respond
		setTimeout(() => {
			// If the token is "mock-token", return true, otherwise return false
			if (token === 'mock-token') {
				resolve(true);
			} else {
				resolve(false);
			}
		}, 1000);
	});
}
