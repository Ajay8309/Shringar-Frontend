<<<<<<< HEAD
import React, { useRef, useEffect, useState } from 'react';
=======
// VirtualTryOn.js
import React, { useRef, useEffect } from 'react';
>>>>>>> parent of ebc5193 (added virtual-try-on component)
import * as posenet from '@tensorflow-models/posenet';
import '@tensorflow/tfjs';

const VirtualTryOn = ({ onClose, Product }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
<<<<<<< HEAD
  const imageRef = useRef();
  const [fingerPosition, setFingerPosition] = useState({ x: 0, y: 0 });
  const [videoReady, setVideoReady] = useState(false);
  let videoStream;

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoStream = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadeddata = () => {
          console.log('Video data loaded successfully.');
          setVideoReady(true);
        };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };
=======
>>>>>>> parent of ebc5193 (added virtual-try-on component)

  useEffect(() => {
    initializeCamera();

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    let net;

    const runPoseNet = async () => {
      try {
<<<<<<< HEAD
        net = await posenet.load();
        console.log('PoseNet model loaded successfully.');
=======
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoStream = stream;
        videoRef.current.srcObject = stream;
>>>>>>> parent of ebc5193 (added virtual-try-on component)
      } catch (error) {
        console.error('Error loading PoseNet model:', error);
      }

      const detectPose = async () => {
<<<<<<< HEAD
        if (videoReady) {
          const { keypoints } = await net.estimateSinglePose(videoRef.current, {
            flipHorizontal: false,
          });

          console.log('Detected Keypoints:', keypoints);

          // Check if the index finger is detected
          const indexFinger = keypoints[9];

          if (indexFinger?.score > 0.5) {
            const fingerX = indexFinger.position.x;
            const fingerY = indexFinger.position.y;
            console.log("x", fingerX , "y", fingerY);
            setFingerPosition({ x: fingerX, y: fingerY });
=======
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
>>>>>>> parent of ebc5193 (added virtual-try-on component)
          }
        }

        requestAnimationFrame(detectPose);
      };

      detectPose();
    };

    runPoseNet();

    return () => {
      if (net) {
        net.dispose();
      }
    };
  }, [videoReady]);

  const handleOnClose = () => {
    onClose();
  };

  return (
    <div className="virtual-try-on">
<<<<<<< HEAD
      <video ref={videoRef} playsInline autoPlay style={{ maxWidth: '100%', maxHeight: '100%' }} />
      <button onClick={handleOnClose}>Close Virtual Try-On</button>
      {videoReady && imageRef.current && (
        <img
          ref={imageRef}
          src={Product}
          alt="Ring"
          style={{
            position: 'absolute',
            left: fingerPosition.x,
            top: fingerPosition.y,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
=======
      <video ref={videoRef} playsInline autoPlay style={{ width: '100%', height: '100%' }} />
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      <button onClick={handleOnClose}>Close Virtual Try-On</button>
>>>>>>> parent of ebc5193 (added virtual-try-on component)
    </div>
  );
};

export default VirtualTryOn;
