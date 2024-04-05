
import Divider from '../Divider/Index';
import classes from './style.module.css';
import { useState } from 'react';

const Login : React.FC = () => {
	const [focused, setFocused] = useState<string | null>(null);

	const handleFocus = (id: string) => {
		setFocused(id);
	}

	const handleBlur = () => {
		setFocused(null);
	};

	return (
		<form className={classes.container}>
			<h1 className={classes.title}>로그인 화면 문구</h1>
			<div className={classes.wrapper}>
				<input
					id='email'
					className={classes.input}
					type='text'
					placeholder='이메일을 입력해주세요'
					onFocus={() => handleFocus('email')}
					onBlur={handleBlur}
				/>
				{focused === 'email' && <span className={classes.message}><span className={classes.red}>TIP</span>이메일 아이디만 입력해주세요!</span>}
				<input
					id='password'
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
					<h4>회원가입</h4>
				</a>
				<ul className={classes.finds}>
					<li className={classes.find}><h4>계정 찾기</h4></li>
					<li className={classes.find}><h4>비밀번호 찾기</h4></li>
				</ul>
			</div>
		</form>
	)
}

export default Login;