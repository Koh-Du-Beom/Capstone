import CameraCheck from './CameraCheck/CameraCheck';
import DeviceCheck from './DeviceCheck/DeviceCheck';
import classes from './style.module.css'

const RoomReady : React.FC = () => {
  return (
    <div className={classes.container}>
       <div className={classes.videoContainer}>
					<CameraCheck />
					{/* 기타 UI 요소 추가, 예: 닉네임 설정 필드 등 */}
				</div>
				<div className={classes.checkContainer}>
					<DeviceCheck />
					{/* 'Join session' 버튼 추가 */}
					<button className={classes.joinSessionButton}>Join session</button>
				</div>
				
    </div>
  )
}

export default RoomReady;