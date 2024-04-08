
const getWebCamera = (callback: (stream: MediaStream) => void): void => {
  try {
    const constraints = {
      video: true,
      audio: false,
    };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(callback)
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  
  }
}

interface Style {
  [key: string]: React.CSSProperties;
}

const Styles: Style = {
  Video: { width: "100%", height: "100%", background: 'rgba(245, 240, 215, 0.5)' },
  None: { display: 'none' },
};

export { getWebCamera, Styles };