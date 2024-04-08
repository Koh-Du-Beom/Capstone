import { useEffect, useState } from 'react';
import classes from './DeviceCheck.module.css';

const DeviceCheck: React.FC = () => {
	const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
	const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
	const [selectedVideoDevice, setSelectedVideoDevice] = useState<string>('');
	const [selectedAudioDevice, setSelectedAudioDevice] = useState<string>('');

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

	return (
		<div className={classes.wrapper}>
			<div className={classes.connectionInfo}>
				{/* Video device selector */}
				<select value={selectedVideoDevice} onChange={handleVideoDeviceChange} className={classes.deviceSelector}>
					{videoDevices.map(device => (
						<option key={device.deviceId} value={device.deviceId}>
							{device.label || 'Unknown Video Device'}
						</option>
					))}
				</select>

				{/* Audio device selector */}
				<select value={selectedAudioDevice} onChange={handleAudioDeviceChange} className={classes.deviceSelector}>
					{audioDevices.map(device => (
						<option key={device.deviceId} value={device.deviceId}>
							{device.label || 'Unknown Audio Device'}
						</option>
					))}
				</select>
			</div>
		</div>

	)
};

export default DeviceCheck;
