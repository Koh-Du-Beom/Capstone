type UUID = string;

interface SignUpUser{ 
	email : string;
	password : string;
	phoneNumber : string;
	authenticateCode : string;
	isEmailDuplicated : boolean;
	signUpDate : string;
}

export default SignUpUser;


