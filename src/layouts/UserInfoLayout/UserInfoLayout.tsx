import { Outlet } from 'react-router-dom';
import classes from './style.module.css';

const UserInfoLayout :React.FC = () => {
	return (
		<div className={classes.container}>
			<h1 className={classes.title}>프로젝트 이름</h1>
			<div className={classes.children}>
				<Outlet/>
			</div>
		</div>
	)
};

export default UserInfoLayout;

