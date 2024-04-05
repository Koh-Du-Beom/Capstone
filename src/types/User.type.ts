type UUID = string;

interface User{ 
	userIdentifier : UUID;
	email : string;
	password : string;
	name : string;
	phoneNumber : string;
	isAuthenticated : boolean;
	isAdministrator : boolean;
	signUpDate : string;
}