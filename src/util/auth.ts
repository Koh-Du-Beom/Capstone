const getAuthToken = () => {
	const token = localStorage.getItem('token');
	return token;
}

export default getAuthToken;