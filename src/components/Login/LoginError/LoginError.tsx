import classes from './style.module.css';

const LoginError : React.FC = () => {
	return (
		<div className={classes.errorBox}>
			<div className={classes.errorMsg}>
				<h2 className={classes.red}>메일 주소 혹은 비밀번호가 일치하지 않습니다.</h2>
				<h2 className={classes.error_description}>입력한 내용을 다시 확인해주세요.</h2>
			</div>
		</div>
	)
}

export default LoginError