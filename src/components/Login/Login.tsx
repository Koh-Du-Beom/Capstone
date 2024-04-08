
import axios from 'axios';
import Divider from '../Divider/Divider';
import classes from './style.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginError from './LoginError/LoginError';

const Login : React.FC = () => {
	const [focused, setFocused] = useState<string | null>(null);
	const [email, setEmail] = useState<string>();
	const [passWord, setPassWord] = useState<string>();
	const [isLoginError, setIsLoginError] = useState<boolean>(false);
 
	const navigate = useNavigate();

	const handleFocus = (id: string) => {
		setFocused(id);
	}

	const handleBlur = () => {
		setFocused(null);
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		const body = JSON.stringify({ email, passWord });	
		
		try {
			const response = await axios.post('endPoint_url', body, {
				headers : {
					'Content-Type' : 'application/json',
					'Authorization' : 'Bearer ${}', //수정필요
				}
			})

			const token = response.data.token;
			localStorage.setItem('userToken', token);

			setIsLoginError(false); // 에러 해제
			navigate('/roomSelect'); // 성공 시 방 선택 페이지로 redirection
			//추가 구현
			

		}catch(error){
			console.log("Login failed : ", error);
			setIsLoginError(true);
			navigate('/roomSelect'); // 일단은 추가해뒀는데, 원래는 되면 안됨.
		}
		
	}


	return (
		<form className={classes.outlet_container} onSubmit={handleSubmit}>
			<div className={classes.wrapper}>
				<input
					id='login_email'
					className={classes.input}
					type='text'
					placeholder='이메일을 입력해주세요'
					onFocus={() => handleFocus('email')}
					onBlur={handleBlur}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				{focused === 'email' && <span className={classes.message}><span className={classes.red}>TIP</span>이메일 아이디만 입력해주세요!</span>}
				<input
					id='login_password'
					className={classes.input}
					type='password'
					placeholder='비밀번호를 입력해주세요'
					onFocus={() => handleFocus('password')}
					onBlur={handleBlur}
					value={passWord}
					onChange={(e) => setPassWord(e.target.value)}
				/>
			</div>
			
			<Divider/>

			{isLoginError ? <LoginError/> : null }

			<button 
				className={classes.login_button}
				onClick={handleSubmit}
			>
				로그인
			</button>
			<div className={classes.user_help}>
				<a className={classes.signUp}>
					<h4 onClick={()=>{navigate('/signUp')}}>회원가입</h4>
				</a>
				<ul className={classes.finds}>
					<li className={classes.find}><h4>계정 찾기</h4></li>
					<li>|</li>
					<li className={classes.find}><h4>비밀번호 찾기</h4></li>
				</ul>
			</div>
		</form>
	)
}

export default Login;