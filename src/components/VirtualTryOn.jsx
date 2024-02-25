import React, { useRef, useEffect, useState } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import '@tensorflow/tfjs';

const VirtualTryOn = ({ onClose, Product }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
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
        net = await posenet.load();
        console.log('PoseNet model loaded successfully.');
      } catch (error) {
        console.error('Error loading PoseNet model:', error);
      }

      const detectPose = async () => {
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
    </div>
  );
};

export default VirtualTryOn;