import axios from "axios";
import classes from './EmailDuplicate.module.css';
import { useEffect } from "react";


interface EmailProp{
  email : string;
}

const EmailDuplicateCheck:React.FC<EmailProp> = ({ email }) => {

  useEffect(()=>{
    console.log(email);
    
  }, [email]);

  const CheckDuplicate = async(event : React.FormEvent) => {
		event.preventDefault();

		const body = JSON.stringify(email);
		try{
			const response = await axios.post('endpoint_url', body, {
				headers : {
					'Content-Type' : 'application/json',
				}
			});
			
			if(!response){
				
				return;
			}
			
			
		}
		catch(error){
			console.error("Error occured!");
		}
	} //이메일 중복 여부

  return (
    <form className={classes.container} onSubmit={CheckDuplicate}>
      <button className={classes.duplicateCheckButton}>
        <h2>이메일 중복확인</h2>
      </button>
    </form>
    
  )
}

export default EmailDuplicateCheck;