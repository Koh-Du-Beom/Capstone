import classes from './style.module.css';
import { isCorrectEmail, isCorrectPassWord, isCorrectPhoneNumber } from '../../util/regExp';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    return isCorrectEmail(signUpForm.email);
  };

	const validatePassWord = () => {
		return isCorrectPassWord(signUpForm.password);
	}

	const validatePassWordCheck = () => {
		return signUpForm.password === signUpForm.passwordCheck;
		
	}

	const validatePhoneNumber = () => {
		return isCorrectPhoneNumber(signUpForm.phoneNumber);
	}

	const navigate = useNavigate();

	const handleSubmit = async (event : React.FormEvent) => {
		event.preventDefault();

		const newErrors : ErrorState = {};

		// 각 입력 필드의 유효성 검사 함수 실행
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassWord();
    const isPasswordCheckValid = validatePassWordCheck();
    const isPhoneNumberValid = validatePhoneNumber();

    if (!isEmailValid) {
			newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

		if (!isPasswordValid) {
			newErrors.password = '올바른 비밀번호 형식이 아닙니다.';
		} 
		
		if (!isPasswordCheckValid) {
			newErrors.passwordCheck = '이전의 비밀번호 입력과 다릅니다.';
		}
		
		if (!isPhoneNumberValid) {
			newErrors.phoneNumber = '올바른 연락처 형식이 아닙니다.';
		} 

		setErrors(newErrors);

		if (newErrors.email) {
			emailRef.current?.focus();
			return;
		}
		
		if (newErrors.password) {
			passwordRef.current?.focus();
			return;
		}

		if (newErrors.passwordCheck) {
			passwordCheckRef.current?.focus();
			return;
		} 

		if (newErrors.phoneNumber) {
			phoneNumberRef.current?.focus();
			return;
		}

		const body = JSON.stringify(signUpForm);
		console.log(body);
		
		try{
			const response = await axios.post('endpoint_url', body, {
				headers : {
					'Content-Type' : 'application/json',
					'Authorization' : 'Bearer ${}'
				}
			});
			
			navigate('/login'); // 성공 시 방 선택 페이지로 redirection
		}
		catch(error){
			console.log("Login failed : ", error);
			navigate('/login')
			//추가 기능 구현
		}
		
	}

	// 회원가입 시에 이메일 중복
	// 아이디 옆에 이메일 중복여부 확인하고, 
	// 정보 입력이 다 끝나면 다음 페이지에 이메일 인증을 하는 모달창 띄우고 
	// 회원가입 완료처리를 할 수 있게

	return (
		<form className={classes.outlet_container} onSubmit={handleSubmit}>
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
					/>
					{errors.password? <span className={classes.error}>{errors.password}</span> : ''}
				</div>

				<div className={classes.content}>
					<h3 className={classes.content_title}>비밀번호 확인</h3>
					<input 			
						ref={passwordCheckRef}
						id='signup_passwordCheck'
						name='passwordCheck'
						className={classes.input}
						type='password'
						placeholder='비밀번호를 다시 입력해주세요.'		
						value={signUpForm.passwordCheck}	
						onChange={handleChange}		
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
						placeholder='전화번호를 입력해주세요(예 : 010-1234-5678)'
						value={signUpForm.phoneNumber}		
						onChange={handleChange}		
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
			<div className={classes.right_align}>
				<a className={classes.link_login} onClick={()=>navigate('/login')}>이미 아이디가 있으신가요?</a>
			</div>
			
		</form>
	)
};

export default SignUp;