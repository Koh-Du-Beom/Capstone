type UUID = string;

interface SignUpUser{ 
	userIdentifier : UUID;
	email : string;
	password : string;
	phoneNumber : string;
	isAuthenticated : boolean;
	isDuplicated : boolean;
	signUpDate : string;
}


