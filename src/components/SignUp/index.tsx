import classes from './style.module.css';
import { isCorrectEmail, isCorrectPassWord, isCorrectPhoneNumber } from '../../util/regExp';
import { useEffect, useRef, useState } from 'react';

interface FormState {
  email: string;
  password: string;
  passwordCheck: string;
  phoneNumber: string;
}

interface ErrorState {
  email?: string;
  password?: string;
  passwordCheck?: string;
  phoneNumber?: string;
}

const SignUp :React.FC = () => {
	const [signUpForm, setSignUpForm] = useState<FormState>({
    email: '',
    password: '',
    passwordCheck: '',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState<ErrorState>({});

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordCheckRef = useRef<HTMLInputElement>(null);
	const phoneNumberRef = useRef<HTMLInputElement>(null);

	const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSignUpForm(prev => ({...prev, [name]: value}));
		setErrors(prev => ({...prev, [name] : ''}));
	}

	const validateEmail = () => {
    const isValid = isCorrectEmail(signUpForm.email);
    if (!isValid) {
      setErrors(prev => ({ ...prev, email: '올바른 이메일 형식이 아닙니다.' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
    return isValid;
  };

	const validatePassWord = () => {
		const isValid = isCorrectPassWord(signUpForm.password);
		if (!isValid){
			setErrors(prev => ({ ...prev, password: '올바른 비밀번호 형식이 아닙니다.' }));
		}else{
			setErrors(prev => ({ ...prev, password: '' }));
		}
		return isValid;
	}

	const validatePassWordCheck = () => {
		const isValid = signUpForm.password === signUpForm.passwordCheck;
		if(!isValid){
			setErrors(prev => ({ ...prev, passwordCheck: '이전의 비밀번호 입력과 다릅니다.' }));
		}else{
			setErrors(prev => ({ ...prev, passwordCheck: '' }));
		}
		return isValid;
	}

	const validatePhoneNumber = () => {
		const isValid = isCorrectPhoneNumber(signUpForm.phoneNumber);
		if (!isValid){
			setErrors(prev => ({ ...prev, phoneNumber: '올바른 연락처 형식이 아닙니다.' }));
		}else{
			setErrors(prev => ({ ...prev, phoneNumber: '' }));
		}
		return isValid;
	}

	const handleBlur = (validator: () => boolean, ref: React.RefObject<HTMLInputElement>) => {
    const isValid = validator();
    if (!isValid) {
      ref.current?.focus();
    }
  };
	
	const handleEmailBlur = () => handleBlur(validateEmail, emailRef);
	const handlePasswordBlur = () => handleBlur(validatePassWord, passwordRef);
	const handlePassWordCheckBlur = () => handleBlur(validatePassWordCheck, passwordCheckRef);
	const handlePhoneNumberBlur = () => handleBlur(validatePhoneNumber, phoneNumberRef);



	useEffect(() => {
    if (errors.email && emailRef.current) {
      emailRef.current.focus();
    } else if (errors.password && passwordRef.current) {
      passwordRef.current.focus();
    } else if (errors.passwordCheck && passwordCheckRef.current) {
      passwordCheckRef.current.focus();
    } else if (errors.phoneNumber && phoneNumberRef.current) {
      phoneNumberRef.current.focus();
    }
  }, [errors]);

	return (
		<form className={classes.outlet_container}>
			<h1 className={classes.big_title}>회원가입</h1>
			
			<div className={classes.contents}>
				<div className={classes.content}>
					<h3 className={classes.content_title}>이메일</h3>
					<input 	
						ref={emailRef}		
						id='signup_email'
						name='email'
						className={classes.input}
						type='text'
						placeholder='아이디 입력 (이메일 형식)'	
						value={signUpForm.email}	
						onChange={handleChange}	
						onBlur={handleEmailBlur}
					/>
					{errors.email? <span className={classes.error}>{errors.email}</span> : ''}
				</div>
				

				<div className={classes.content}>
					<h3 className={classes.content_title}>비밀번호</h3>
					<input 			
						ref={passwordRef}
						id='signup_password'
						name='password'
						className={classes.input}
						type='password'
						placeholder='비밀번호 입력(영문자, 숫자, 특수문자 포함 8~15자)'
						value={signUpForm.password}		
						onChange={handleChange}	
						onBlur={handlePasswordBlur}		
					/>
					{errors.password? <span className={classes.error}>{errors.password}</span> : ''}
				</div>

				<div className={classes.content}>
					<h3 className={classes.content_title}>비밀번호 확인</h3>
					<input 			
						ref={passwordCheckRef}
						id='signup_password_check'
						name='password_check'
						className={classes.input}
						type='password'
						placeholder='비밀번호를 다시 입력해주세요.'		
						value={signUpForm.passwordCheck}	
						onChange={handleChange}		
						onBlur={handlePassWordCheckBlur}
					/>
					{errors.passwordCheck? <span className={classes.error}>{errors.passwordCheck}</span> : ''}
				</div>

				<div className={classes.content}>
					<h3 className={classes.content_title}>전화번호</h3>
					<input 			
						ref={phoneNumberRef}
						id='signup_phoneNumber'
						name='phoneNumber'
						className={classes.input}
						type='text'
						placeholder='전화번호를 입력해주세요.'
						value={signUpForm.phoneNumber}		
						onChange={handleChange}	
						onBlur={handlePhoneNumberBlur}		
					/>
					{errors.phoneNumber? <span className={classes.error}>{errors.phoneNumber}</span> : ''}
				</div>
				
			</div>
			
			<button 
				className={classes.signUp_button}
				onClick={() => {}}
			>
				회원가입 완료하기
			</button>

		</form>
	)
};

export default SignUp;