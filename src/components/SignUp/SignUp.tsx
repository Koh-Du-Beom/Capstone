import classes from './style.module.css';
import { isCorrectEmail, isCorrectPassWord, isCorrectPhoneNumber } from '../../util/regExp';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EmailDuplicateCheck from './EmailDuplicateCheck/EmailDuplicateCheck';
import SignUpUser from '../../types/SignUpUser.type';
import EmailAuthentication from './EmailAuthentication/EmailAuthentication';


interface ErrorState {
  email?: string;
  password?: string;
  passwordCheck?: string;
  phoneNumber?: string;
}

const SignUp :React.FC = () => {
	const navigate = useNavigate();
	const [signUpForm, setSignUpForm] = useState<SignUpUser>({
		email: '',
		isEmailDuplicated: false,
		authenticateCode: '',
    password: '',
    phoneNumber: '',
		signUpDate : '',
  }); //폼 제출 시 확인사항
	const [passwordCheck, setPassWordCheck] = useState<string>('');

  const [errors, setErrors] = useState<ErrorState>({}); //에러 메세지

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordCheckRef = useRef<HTMLInputElement>(null);
	const phoneNumberRef = useRef<HTMLInputElement>(null);
	// 마지막에 제출 시 오류가 있는 부분에 focus를 주기위함.

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const toggleModal = () => {
		setModalOpen(!modalOpen);
	}

	const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSignUpForm(prev => ({...prev, [name]: value}));
		setErrors(prev => ({...prev, [name] : ''}));
	}//input 안에서 state의 변경을 해주는 부분. errorMsg도 자연스럽게 없애기

	const validateEmail = () => {
    return isCorrectEmail(signUpForm.email);
  };

	const validatePassWord = () => {
		return isCorrectPassWord(signUpForm.password);
	}

	const validatePassWordCheck = () => {
		return signUpForm.password === passwordCheck;
		
	}

	const validatePhoneNumber = () => {
		return isCorrectPhoneNumber(signUpForm.phoneNumber);
	}

	useEffect(()=>{
		if(signUpForm.isEmailDuplicated){ 
			setErrors(prev => ({...prev, email : '중복된 이메일입니다.'}));
		}
	}, [signUpForm.isEmailDuplicated]);

	const handleSignUp = () => {
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

		if(signUpForm.isEmailDuplicated){
			return;
		} //이메일이 중복되었으면 가입을 막음.
		

		
		//이메일 인증코드 발송하는 로직

		toggleModal();
		
	}

	return (
		<div className={classes.outlet_container}>
			<h1 className={classes.big_title}>회원가입</h1>
			
			<div className={classes.contents}>
				<div className={classes.content}>
					<h3 className={classes.content_title}>이메일</h3>
					<div className={classes.content_box}>
						<input 	
							ref={emailRef}		
							id='signup_email'
							name='email'
							className={`${classes.input} ${classes.email}`}
							type='text'
							placeholder='아이디 입력 (이메일 형식)'	
							value={signUpForm.email}	
							onChange={handleChange}
						/>
						<EmailDuplicateCheck email={signUpForm.email} setSignUpForm={() => setSignUpForm}/>
				
					</div>
					
					
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
						value={passwordCheck}	
						onChange={(e) => setPassWordCheck(e.target.value)}		
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
				onClick={handleSignUp}
			>
				이메일 인증하기
			</button>
			<div className={classes.right_align}>
				<a className={classes.link_login} onClick={()=>navigate('/login')}>이미 아이디가 있으신가요?</a>
			</div>
			

			{ modalOpen ? <EmailAuthentication toggleModal={toggleModal} signUpData={signUpForm}/> : ''}
		</div>
	)
};

export default SignUp;