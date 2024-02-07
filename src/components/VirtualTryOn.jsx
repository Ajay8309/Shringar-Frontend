// import React, { useRef, useEffect } from 'react';
// import * as posenet from '@tensorflow-models/posenet';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import '@tensorflow/tfjs';

// const VirtualTryOn = ({ onClose }) => {
//   const videoRef = useRef();
//   const canvasRef = useRef();
//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//   const renderer = new THREE.WebGLRenderer();

//   useEffect(() => {
//     let videoStream;
//     let mixer;

//     const runPoseNet = async () => {
//       const net = await posenet.load();

//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         videoStream = stream;
//         videoRef.current.srcObject = stream;

//         videoRef.current.addEventListener('loadeddata', () => {
//           // Initialize Three.js components
//           camera.position.z = 5;
//           renderer.setSize(window.innerWidth, window.innerHeight);
//           canvasRef.current.appendChild(renderer.domElement);

//           const loader = new GLTFLoader();

//           // Load a different sample 3D model for testing
//           loader.load(
//             'https://p.turbosquid.com/ts-thumb/Pd/l1J8QT/XE/r01_003/jpg/1692304064/1920x1080/fit_q87/696dc3a32d9c4ec474dd66bf06e6f7ce2fd3314b/r01_003.jpg',
//             (gltf) => {
//               const model = gltf.scene;
//               scene.add(model);
          
//               // Create an animation mixer for the model
//               mixer = new THREE.AnimationMixer(model);
//               const action = mixer.clipAction(gltf.animations[0]);
//               action.play();
//             },
//             undefined,
//             (error) => {
//               console.error('Error loading sample 3D model:', error);
//             }
//           );

//           const detectPose = async () => {
//             const video = videoRef.current;
//             const { keypoints } = await net.estimateSinglePose(video, { flipHorizontal: false });

//             // Update the 3D model position based on the index finger position
//             const indexFinger = keypoints[9];
//             if (indexFinger?.score > 0.5 && mixer) {
//               const fingerPosition = new THREE.Vector3(indexFinger.position.x, indexFinger.position.y, 0);
//               mixer.update(0.1);  // Update the animation mixer
//               scene.children[0].position.copy(fingerPosition);
//             }

//             // Render the scene
//             renderer.render(scene, camera);

//             requestAnimationFrame(detectPose);
//           };

//           detectPose();
//         });
//       } catch (error) {
//         console.error('Error accessing camera:', error);
//       }
//     };

//     runPoseNet();

//     return () => {
//       // Cleanup: Stop the video stream when the component unmounts
//       if (videoStream) {
//         const tracks = videoStream.getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   const handleOnClose = () => {
//     // Call onClose to close the virtual try-on
//     onClose();
//   };

//   return (
//     <div className="virtual-try-on">
//       <video ref={videoRef} playsInline autoPlay style={{ display: 'none' }} />
//       <button onClick={handleOnClose}>Close Virtual Try-On</button>
//       <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
//     </div>
//   );
// };

// export default VirtualTryOn;












import React, { useRef, useEffect } from 'react';
import * as posenet from '@tensorflow-models/posenet';
import '@tensorflow/tfjs';

const VirtualTryOn = ({ onClose, Product }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const ringImageRef = useRef();

  useEffect(() => {
    let videoStream;

    const runPoseNet = async () => {
      const net = await posenet.load();

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoStream = stream;
        videoRef.current.srcObject = stream;

        // Wait for the 'loadeddata' event before starting PoseNet
        videoRef.current.addEventListener('loadeddata', () => {
          const detectPose = async () => {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // Make sure video dimensions are set properly
            if (video.videoWidth > 0 && video.videoHeight > 0) {
              video.width = video.videoWidth;
              video.height = video.videoHeight;

              // Set the canvas dimensions to match the video
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;

              const { keypoints } = await net.estimateSinglePose(video, {
                flipHorizontal: false,
              });

              // Clear the canvas
              ctx.clearRect(0, 0, canvas.width, canvas.height);

              // Draw keypoints manually
              keypoints.forEach((keypoint) => {
                if (keypoint.score > 0.5) {
                  ctx.beginPath();
                  ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);
                  ctx.fillStyle = 'red';
                  ctx.fill();
                  ctx.closePath();
                }
              });

              // Check if the index finger is detected
              const indexFinger = keypoints[9];

              if (indexFinger?.score > 0.5 && ringImageRef.current) {
                const fingerPosition = indexFinger.position;
                const ringSize = 50;

                console.log('Finger found');
                console.log('Finger position:', fingerPosition);

                // Draw the ring on the canvas
                ctx.drawImage(ringImageRef.current, fingerPosition.x - ringSize / 2, fingerPosition.y - ringSize / 2, ringSize, ringSize);
              }
            }

            requestAnimationFrame(detectPose);
          };

          detectPose();
        });
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
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
      <button onClick={handleOnClose}>Close Virtual Try-On</button>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />
    </div>
  );
};

export default VirtualTryOn;
