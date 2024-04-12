import { useEffect, useState } from 'react';
import classes from './DeviceCheck.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store'; // 경로는 실제 구조에 맞게 조정하세요.
import { updateConnectionInfo } from '../../../store/connectionSlice'; // 경로는 실제 구조에 맞게 조정하세요.

import cameraIcon from '../../../assets/icon/cameraIcon.svg';
import micIcon from '../../../assets/icon/micIcon.svg';
import personIcon from '../../../assets/icon/personIcon.svg';

const DeviceCheck: React.FC = () => {
	const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
	const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
	
	const [userName, setUserName] = useState<string>('');
	const [onFocus, setOnFocus] = useState<boolean>(false);
	//blur 이벤트가 발생했을 때만 redux변수 업데이트해주기 위함.
	const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>('');
	const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>('');
	
	const dispatch = useDispatch();
	const connectionInfo = useSelector((state : RootState) => state.connectionInfo);

	useEffect(() => {
		const getDevices = async () => {
			try {
				// 사용자에게 오디오와 비디오에 대한 권한을 모두 요청합니다.
				const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
				
				// 권한을 얻은 후에는 사용하지 않는 트랙을 바로 중지합니다.
				stream.getTracks().forEach(track => track.stop());
				const devices = await navigator.mediaDevices.enumerateDevices();
				
				setVideoDevices(devices.filter(device => device.kind === 'videoinput'));
				setAudioDevices(devices.filter(device => device.kind === 'audioinput'));
			} catch (error) {
				console.error('Error accessing media devices.', error);
			}
		};

		getDevices();
	}, []);

	const handleVideoDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedVideoDevice(event.target.value);
	};

	const handleAudioDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedAudioDevice(event.target.value);
	};

	const getVideoLabel = (deviceId : string) => {
		const device = videoDevices.find(device => device.deviceId === deviceId);
		return device ? device.label : '';
	};


	useEffect(()=>{
		if(!onFocus){
			
			dispatch(updateConnectionInfo({
				userName : userName,
				videoDevice : selectedVideoDevice,
				audioDevice : selectedAudioDevice,
			}));
		}
		
	}, [selectedAudioDevice, selectedVideoDevice]);

	return (
		<div className={classes.wrapper}>
			
			<div className={classes.connectionInfos}>
				<div className={classes.connectionInfo}>
					<span><img className={classes.icon} src={personIcon}/></span>
					<input 
						id='userName'
						className={classes.userName}
						type='text'
						placeholder='방 참여 시 이 이름으로 보이게 됩니다.'
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						onFocus={()=>setOnFocus(true)}
						onBlur={()=>setOnFocus(false)}
					/>
				</div>
				
				{/* Video device selector */}
				<div className={classes.connectionInfo}>
					<span><img className={classes.icon} src={cameraIcon}/></span>
					<select value={selectedVideoDevice} onChange={handleVideoDeviceChange} className={classes.deviceSelector}>
						<option value=''>비디오 연결기기를 선택해주세요</option>
						{videoDevices.map(device => (
							<option key={device.deviceId} value={device.deviceId}>
								{device.label || 'Unknown Video Device'}
							</option>
						))}
					</select>
				</div>			

				{/* Audio device selector */}
				<div className={classes.connectionInfo}>
					<span><img className={classes.icon} src={micIcon}/></span>
					<select value={selectedAudioDevice} onChange={handleAudioDeviceChange} className={classes.deviceSelector}>
						<option value=''>오디오 연결기기를 선택해주세요</option>
						{audioDevices.map(device => (
							<option key={device.deviceId} value={device.deviceId}>
								{device.label || 'Unknown Audio Device'}
							</option>
						))}
					</select>
				</div>
				
			</div>
		</div>

	)
};

export default DeviceCheck;
