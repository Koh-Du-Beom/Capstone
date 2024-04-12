import { Outlet } from "react-router-dom"
import TopNavBar from "../../components/NavBar/TopNavBar/TopNavBar"
import classes from './MainLayout.module.css'

const MainLayout: React.FC = () => {
	return (
		<div>
			<TopNavBar/>
			<div className={classes.contents}>
				<Outlet/>
			</div>
			
		</div>
	)
}

export default MainLayout;