
import Divider from '../Divider/Index';
import classes from './style.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login : React.FC = () => {
	const [focused, setFocused] = useState<string | null>(null);

	const handleFocus = (id: string) => {
		setFocused(id);
	}

	const handleBlur = () => {
		setFocused(null);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		//함수 구현
	}

	const navigate = useNavigate();

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
				/>
				{focused === 'email' && <span className={classes.message}><span className={classes.red}>TIP</span>이메일 아이디만 입력해주세요!</span>}
				<input
					id='login_password'
					className={classes.input}
					type='password'
					placeholder='비밀번호를 입력해주세요'
					onFocus={() => handleFocus('password')}
					onBlur={handleBlur}
				/>
				{/* {focused === 'password' && <span className={classes.message}>비밀번호를 입력해주세요</span>} */}
			</div>
			
			<Divider/>

			<button 
				className={classes.login_button}
				onClick={() => {}}
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