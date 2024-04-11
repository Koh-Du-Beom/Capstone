type UUID = string;

interface SignUpUser{ 
	email : string;
	password : string;
	phoneNumber : string;
	isEmailAuthenticated : boolean;
	isEmailDuplicated : boolean;
	signUpDate : string;
}

export default SignUpUser;


