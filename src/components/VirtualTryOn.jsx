import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as THREE from 'three';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import glassesSrc from '../assets/pngegg.png';

const VirtualTryOn = ({image, category}) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [jewelryMesh, setJewelryMesh] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [jewelryCategory, setJewelryCategory] = useState(null);

  useEffect(() => {
    const loadResources = async () => {
      try {
        // Camera Access
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }

        // TensorFlow Model
        await tf.setBackend('webgl');
        const loadedModel = await faceLandmarksDetection.load(
          faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
          {
            shouldLoadIrisModel: true,
            maxFaces: 1,
          }
        );
        setModel(loadedModel);

        // Three.js Setup
        const width = canvasRef.current.clientWidth;
        const height = canvasRef.current.clientHeight;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
        renderer.setSize(width, height);
        renderer.setAnimationLoop(() => renderer.render(scene, camera));

        // Jewelry Mesh
        const jewelryMesh = createJewelryMesh(category);
        scene.add(jewelryMesh);
        setJewelryMesh(jewelryMesh);
      } catch (error) {
        console.error("Initialization error:", error);
        setIsLoading(false);
      }
    };

    loadResources();
  }, [category]);

  

  useEffect(() => {
    const detectAndPositionJewelry = async () => {
      if (!webcamRef.current || !model || !jewelryMesh) return;
      const video = webcamRef.current.video;
      if (video.readyState !== 4) return;

      const faceEstimates = await model.estimateFaces({ input: video });
      if (faceEstimates.length > 0) {
        setIsLoading(false);
        const keypoints = extractKeypoints(faceEstimates[0], category);
        positionAndScaleJewelry(jewelryMesh, keypoints, video);
      }
    };

    // Run detection and positioning every 120ms
    const intervalId = setInterval(() => {
      detectAndPositionJewelry();
    }, 120);

    return () => clearInterval(intervalId);
  }, [model, jewelryMesh, category]);

  const createJewelryMesh = (category) => {
    let jewelryMesh;
  
    switch (category) {
      case 'Rings':
        jewelryMesh = loadRingMesh();
        break;
      case 'Necklaces':
        jewelryMesh = loadNecklaceMesh();
        break;
      case 'Earrings':
        jewelryMesh = loadEarringsMesh();
        break;
      default:
        console.error(`Unknown category: ${category}`);
    }
  
    return jewelryMesh;
  };

  const extractKeypoints = (faceEstimate, category) => {
    let keypoints;
  
    switch (category) {
      case 'ring':
        keypoints = extractRingKeypoints(faceEstimate);
        break;
      case 'necklace':
        keypoints = extractNecklaceKeypoints(faceEstimate);
        break;
      case 'earrings':
        keypoints = extractEarringsKeypoints(faceEstimate);
        break;
      default:
        console.error(`Unknown category: ${category}`);
    }
  
    return keypoints;
  };

  const loadRingMesh = () => {
    const textureLoader = new THREE.TextureLoader();
    const geometry = new THREE.PlaneGeometry(2, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true }); // Example material, replace with ring texture/material
    const ringMesh = new THREE.Mesh(geometry, material);
    return ringMesh;
  };
  
  const loadNecklaceMesh = () => {
    const textureLoader = new THREE.TextureLoader();
    const geometry = new THREE.PlaneGeometry(2, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true }); // Example material, replace with necklace texture/material
    const necklaceMesh = new THREE.Mesh(geometry, material);
    return necklaceMesh;
  };
  
  const loadEarringsMesh = () => {
    const textureLoader = new THREE.TextureLoader();
    const geometry = new THREE.PlaneGeometry(2, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff, transparent: true }); // Example material, replace with earrings texture/material
    const earringsMesh = new THREE.Mesh(geometry, material);
    return earringsMesh;
  };

  const positionAndScaleJewelry = (jewelryMesh, keypoints, video) => {
    // index finger key points, and at what position we want to place that image
  };

  const extractRingKeypoints = (faceEstimate) => {
    // add key points of index finger here
  };

  const extractNecklaceKeypoints = (faceEstimate) => {
    // Extract keypoints specific to necklaces
  };

  const extractEarringsKeypoints = (faceEstimate) => {
    // Extract keypoints specific to earrings
  };

  return (
    <>
    <div style={{borderBottom: '1px solid rgba(0, 0, 0, 0.2)'}}>
      <h1 style={{textAlign: 'center'}}>Virtual Try-On - 2D Image</h1>
    </div>
    <div style={{ position: 'relative', margin:'0 auto', width: '800px', height: '800px' }}>
        {isLoading && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
            <h3>Loading...</h3>
          </div>
        )}
      <Webcam ref={webcamRef} autoPlay playsInline style={{ width: '800px', height: '800px' }} mirrored={true} />
      <canvas ref={canvasRef} style={{ width: '800px', height: '800px', position: 'absolute', top: 0, left: 0 }} />
    </div>
    </>
  );
};

export default VirtualTryOn;
