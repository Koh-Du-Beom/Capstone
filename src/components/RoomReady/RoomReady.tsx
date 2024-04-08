import CameraCheck from './CameraCheck/RoomReady';
import classes from './style.module.css'

const RoomReady : React.FC = () => {
  return (
    <div className={classes.container}>
      <CameraCheck/>
    </div>
  )
}

export default RoomReady;