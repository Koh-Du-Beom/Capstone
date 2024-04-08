import CameraCheck from './CameraCheck/CameraCheck';
import DeviceCheck from './DeviceCheck/DeviceCheck';
import classes from './style.module.css'

const RoomReady : React.FC = () => {
  return (
    <div className={classes.container}>
      <CameraCheck/>
			<DeviceCheck/>
    </div>
  )
}

export default RoomReady;