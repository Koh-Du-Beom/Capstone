import { useEffect, useRef, useState } from "react";
import { getWebCamera, Styles } from "./getWebCamera";

const CameraCheck: React.FC = () => {
	const [playing, setPlaying] = useState<boolean>(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	
	useEffect(() => {
    getWebCamera((stream: MediaStream) => {
      if (videoRef.current) {
        setPlaying(true);
        videoRef.current.srcObject = stream;
      }
    });
  }, []);

	const startOrStop = () => {
    if (playing && videoRef.current) {
      const s = videoRef.current.srcObject as MediaStream;
      s.getTracks().forEach((track : MediaStreamTrack) => {
        track.stop();
      });
    } else {
      getWebCamera((stream => {
				if (videoRef.current) {
          setPlaying(true);
          videoRef.current.srcObject = stream;
        }
      }));
    }
    setPlaying(!playing);
  }

	return (
		<>
			<div>
				<video ref={videoRef} autoPlay style={Styles.Video} />
				<button onClick={() => startOrStop()}>{playing ? 'Stop' : 'Start'} </button>
			</div >
		</>
	);
};

export default CameraCheck;