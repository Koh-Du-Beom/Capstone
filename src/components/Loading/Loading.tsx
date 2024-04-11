import React from 'react';
import classes from './Loading.module.css'; // 스피너 CSS 스타일

const Loading: React.FC = () => {
	return (
		<div className={classes.loading_container}>
			<div className={classes.loading}></div>
		</div>
	)
}

export default Loading;