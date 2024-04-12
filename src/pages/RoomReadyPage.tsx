import TopNavBar from "../components/NavBar/TopNavBar/TopNavBar";
import CameraCheck from "../components/RoomReady/CameraCheck/CameraCheck";
import RoomReady from "../components/RoomReady/RoomReady";

const RoomReadyPage: React.FC = () => {
	return (
		<>

			<TopNavBar/>
			<RoomReady/>
		</>
		// 카메라 보여주기 + 마이크 정보 등 
	)
}

export default RoomReadyPage;