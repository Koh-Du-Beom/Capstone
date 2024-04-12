import { useEffect, useRef, useState } from 'react';
import classes from './EmailAuthentication.module.css';
import SignUpUser from '../../../types/SignUpUser.type';
import axios from 'axios';

interface AuthenticationProps{
	toggleModal : () => void;
	signUpData : SignUpUser;
}


const EmailAuthentication: React.FC<AuthenticationProps> = ({ toggleModal, signUpData }) => {
 
	const [authCode, setAuthCode] = useState<string>('');
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [timeLeft, setTimeLeft] = useState<number>(0); // 인증기간을 임시로 5분을 잡음
	
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		let timer: ReturnType<typeof setInterval> | null = null;
  
		if (timeLeft > 0) {
			timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
		}
	
		return () => {
			if (timer) clearInterval(timer); // timer가 null이 아니면 clearInterval 호출
		};
  }, [timeLeft]);


	const sendAuthenticateEmail = () => {
		//이메일로 인증버튼 보내주는 함수 기능 구현해야됨.
		setTimeLeft(300);
	}

	const formatTimeLeft = () => {
    // 남은 시간을 MM:SS 형식으로 변환
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

	const completeSignUp = async (event : React.FormEvent) => {
		event.preventDefault();
		
		const signUpDate = new Date().toISOString();

		const finalSignUpData = {
			...signUpData,
			signUpDate : signUpDate,
			authenticateCode : authCode,
		};

		const body = JSON.stringify(finalSignUpData);

		try {
			const response = await axios.post('endpoint_url', body, {
				headers : {
					'Content-Type' : 'application/json',
				}
			});

			if (response){
				//응답 제대로 왔으면 그에 맞는 화면 구성
			}
			else{
				//회원가입 제대로 안됐으면 맞는 화면 구성
			}
		} catch(error){
			console.error('회원가입 중 에러 발생', error);
		}
	}

  return (
    <form className={classes.modalOverlay} onSubmit={completeSignUp}>
			
      <div className={classes.modalContent} onClick={e => e.stopPropagation()} ref={modalRef}>
				<div className={classes.close_button_container}>
					<button className={classes.close_button} onClick={toggleModal}></button>
				</div>
        <div className={classes.title}>
					<h2 className={classes.big_title}>이메일 인증</h2>
					<h4 className={classes.small_title}><span>{signUpData.email}</span>로 인증메일을 발송하시겠어요?</h4>
					<button className={classes.authenticate_button} onClick={sendAuthenticateEmail}>인증메일 받기</button>
				</div>

				ui는 상의 후 변경

				<div className={classes.authCodeWrapper}>
					<input 
						className={classes.input}
						placeholder='받은 인증코드를 정확히 입력해주세요'
						value={authCode}
						onChange={(e) => setAuthCode(e.target.value)}
						id='authCode'
					/>
					<span className={classes.timer}>
						{timeLeft > 0 ? formatTimeLeft() : ''}
					</span>
				</div>

				
				<button className={classes.authenticate_button} onClick={completeSignUp}>회원가입 완료하기</button>
      </div>
    </form>
  )
}

export default EmailAuthentication;