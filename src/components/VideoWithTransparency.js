import React, { useRef, useEffect } from 'react';
import videoSource from '../assets/vid/coin2.mp4';

const VideoWithTransparency = ({ className }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    video.onloadeddata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    };

    const render = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const len = frame.data.length;
      for (let i = 0; i < len; i += 4) {
        const r = frame.data[i];
        const g = frame.data[i + 1];
        const b = frame.data[i + 2];

        // 그린 스크린
        if (g > 100 && r < 100 && b < 100) {
          frame.data[i + 3] = 0; 
        }

        // 블랙 스크린
        // if (r < 10 && g < 10 && b < 10) {
        //   frame.data[i + 3] = 0; 
        // }
      }

      ctx.putImageData(frame, 0, 0);
      requestAnimationFrame(render);
    };

    video.muted = true;
    video.loop = true;
    video.play().catch((error) => {
      console.error("자동 재생에 실패했습니다:", error);
    });

    video.onplay = () => {
      render();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* 숨겨진 비디오 */}
      <video
        ref={videoRef}
        src={videoSource}
        className="hidden"
        crossOrigin="anonymous"
        loop
      />
      {/* 비디오를 렌더링하는 캔버스 */}
      <canvas ref={canvasRef} className="w-full h-auto" />
    </div>
  );
};

export default VideoWithTransparency;