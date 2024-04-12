import classes from './TopNavBar.module.css';
import logo from '../../../assets/logo.png';
import { useState } from 'react';
import navBarIcon  from '../../../assets/NavBar/navBarIcon.png';
import navBarIcon_hover from '../../../assets/NavBar/navBarIcon_hover.png';
import { useNavigate } from 'react-router-dom';
import NavBarModal from './NavBarModal/NavBarModal';

const TopNavBar : React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	}

	const [hovered, setIsHovered] = useState<boolean>(false);
	const handleMouseEnter = () => setIsHovered(true);
	const handleMouseLeave = () => setIsHovered(false);

	const navigate = useNavigate();

	return (
		<>
			<nav className={classes.navbar}>
				<div className={classes.placeholder}></div>
				<h1 className={classes.bigTitle} onClick={()=>navigate('/')}>
					<img className={classes.logo} src={logo}/>
				</h1>
				<button
					className={classes.modal}
					onClick={toggleModal}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<img src={hovered ? navBarIcon_hover : navBarIcon}/>
				</button>
			</nav>
			{isModalOpen && <NavBarModal onClose={toggleModal} /> }
		</>
	)
};

export default TopNavBar;