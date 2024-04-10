import axios from "axios";
import classes from './EmailDuplicate.module.css';
import { useEffect } from "react";
import SignUpUser from '../../../types/SignUpUser.type';

interface EmailProp{
  email : string;
  setSignUpForm : Function;
}

const EmailDuplicateCheck:React.FC<EmailProp> = ({ email, setSignUpForm }) => {

  const CheckDuplicate = async(event : React.FormEvent) => {
		event.preventDefault();

		const body = JSON.stringify(email);
		try{
			const response = await axios.post('endpoint_url', body, {
				headers : {
					'Content-Type' : 'application/json',
				}
			});
			
      if(response){
        setSignUpForm((prev : SignUpUser) => ({...prev, isEmailDuplicate: false}));
      }else{
        setSignUpForm((prev : SignUpUser) => ({...prev, isEmailDuplicate: true}));
      }
		}
		catch(error){
			console.error("Error occured!");
		}
	} //이메일 중복여부를 백엔드에 보내서 판단하는 함수

  return (
    <form className={classes.container} onSubmit={CheckDuplicate}>
      <button className={classes.duplicateCheckButton}>
        <h2>이메일 중복확인</h2>
      </button>
    </form>
    
  )
}

export default EmailDuplicateCheck;