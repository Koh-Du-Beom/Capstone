type UUID = string;

interface SignUpUser{ 
	userIdentifier : UUID;
	email : string;
	password : string;
	phoneNumber : string;
	isEmailAuthenticated : boolean;
	isEmailDuplicated : boolean;
	signUpDate : string;
}

export default SignUpUser;


