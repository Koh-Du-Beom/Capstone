import classes from './NavBarModal.module.css';
import logo from '../../../../assets/logo.png';
import Divider from '../../../Divider/Divider';
import { useEffect, useState } from 'react';
import navBarIcon from '../../../../assets/NavBar/navBarIcon.png';
import navBarIcon_hover from '../../../../assets/NavBar/navBarIcon_hover.png';
import { useNavigate } from 'react-router-dom';

interface PropsType{
	onClose : () => void;
}

const NavBarModal: React.FC<PropsType> = ( { onClose } ) => {
	const [active, setActive] = useState<boolean>(false);
	const [hovered, setIsHovered] = useState<boolean>(false);

	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	useEffect(()=>{
		setActive(true);

		return (
			() => { setActive(false)}
		)
	}, [])

	const modalClass = active ? `${classes.modalContent} ${classes.modalActive}` : `${classes.modalContent} ${classes.modalEnter}`;

	const navigate = useNavigate();

	return (
		<div className={classes.modalBackdrop} onClick={onClose}>
			<div className={modalClass} onClick={e => e.stopPropagation()}>
				<h1 className={classes.bigTitle}>
					<div className={classes.placeholder}></div>
					<div>
						<img className={classes.logo} src={logo}/>
					</div>
					<button 
						className={classes.closeButton} 
						onClick={onClose}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<img src={!hovered? navBarIcon : navBarIcon_hover}/>	
					</button> 
				</h1>
				<Divider/>
				<div className={classes.contents}>
					<h3 className={classes.content} onClick={() => navigate('/main/myPage')}>마이페이지</h3>
					<h3 className={classes.content} onClick={() => navigate('/main/roomSelect')}>방 참여하기</h3>
					<h3 className={classes.content} onClick={() => navigate('/main/')}>어떤 페이지 할지 고민</h3>
				</div>
			</div>
		</div>
	)
}

export default NavBarModal;