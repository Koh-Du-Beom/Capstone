import Divider from '../Divider/Index'
import classes from './style.module.css'

const Login : React.FC = () => {
	return (
		<div className={classes.container}>
			<h1 className={classes.title}>Login</h1>
			<div className={classes.wrapper}>
				<input
					id='email'
					className={classes.input}
					type='text'
					placeholder='이메일을 입력해주세요'
				/>

				<input
					id='password'
					className={classes.input}
					type='password'
					placeholder='비밀번호'
				/>
			</div>

		</div>
	)
}

export default Login;