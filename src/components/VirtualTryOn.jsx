// VirtualTryOn.js
import React, { useRef, useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import '@tensorflow/tfjs';

const VirtualTryOn = ({ onClose, Product }) => {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    let videoStream;

    const runPoseNet = async () => {
      const net = await posenet.load();

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoStream = stream;
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }

      const detectPose = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Make sure video dimensions are set properly
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          video.width = video.videoWidth;
          video.height = video.videoHeight;

          const { keypoints } = await net.estimateSinglePose(video, {
            flipHorizontal: false,
          });

          // Clear the canvas
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  // Draw keypoints manually
  keypoints.forEach(keypoint => {
    if (keypoint.score > 0.5) {
      ctx.beginPath();
      ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.closePath();
    }
  });


          // Check if both palms are detected (keypoints 9 and 10)
          const leftPalmDetected = keypoints[9]?.score > 0.5;
          const rightPalmDetected = keypoints[10]?.score > 0.5;

          if (leftPalmDetected && rightPalmDetected) {
            console.log('Both palms detected!');
          } else if (leftPalmDetected) {
            console.log('Left palm detected!');
          } else if (rightPalmDetected) {
            console.log('Right palm detected!');
          }
        }

        requestAnimationFrame(detectPose);
      };

      detectPose();
    };

    runPoseNet();

    return () => {
      // Cleanup: Stop the video stream when the component unmounts
      if (videoStream) {
        const tracks = videoStream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const handleOnClose = () => {
    // Call onClose to close the virtual try-on
    onClose();
  };

  return (
    <div className="virtual-try-on">
      <video ref={videoRef} playsInline autoPlay style={{ width: '100%', height: '100%' }} />
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      <button onClick={handleOnClose}>Close Virtual Try-On</button>
    </div>
  );
};

export default VirtualTryOn;
