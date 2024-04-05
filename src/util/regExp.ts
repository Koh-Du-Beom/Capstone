
const isCorrectEmail = (email : string) : boolean => {
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	return emailRegex.test(email);
}

const isCorrectPassWord = (password : string) : boolean => {
	const passwdRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
	return passwdRegex.test(password);
}

const isCorrectPhoneNumber = (phoneNumber : string) : boolean => {
	const phoneNumberRegex = /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/;
	return phoneNumberRegex.test(phoneNumber);
}

export { isCorrectEmail, isCorrectPassWord, isCorrectPhoneNumber };