import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store'; // 경로는 실제 구조에 맞게 조정하세요.

const CameraCheck: React.FC = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const { videoDevice } = useSelector((state: RootState) => state.connectionInfo);

	useEffect(() => {
		if (videoDevice) {
			const constraints = {
				video: { deviceId: { exact: videoDevice } }
			};

			navigator.mediaDevices.getUserMedia(constraints)
				.then(stream => {
					if (videoRef.current) {
						videoRef.current.srcObject = stream;
					}
				})
				.catch(error => {
						console.error('Error accessing the camera.', error);
				});
		}
	}, [videoDevice]);

	return (
			<>
				<div>
					<video ref={videoRef} autoPlay playsInline muted></video>
				</div>
			</>
	);
}

export default CameraCheck;