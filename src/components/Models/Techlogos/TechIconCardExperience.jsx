import { Center, Environment, Float, OrbitControls, useGLTF, Preload } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useMemo, Suspense } from "react";
import * as THREE from "three";

// Model Loading Component with Error Boundary
const ModelContent = ({ model, isDark }) => {
  const { scene: gltfScene, nodes, materials } = useGLTF(model.modelPath);
  const { invalidate } = useThree();

  const clonedScene = useMemo(() => {
    if (!gltfScene) return null;
    const cloned = gltfScene.clone();
    
    // Apply material customizations
    if (model.name === "Three.js" || model.name === "Interactive Developer") {
      cloned.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.name === "Object_5") {
            child.material = new THREE.MeshStandardMaterial({ 
              color: isDark ? "white" : "black",
              metalness: 0.5,
              roughness: 0.5
            });
            invalidate();
          }
        }
      });
    }
    return cloned;
  }, [gltfScene, isDark, model.name, invalidate]);

  useEffect(() => {
    return () => {
      // Cleanup
      if (clonedScene) {
        clonedScene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat?.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });
      }
    };
  }, [clonedScene]);

  if (!clonedScene) return null;

  return (
    <group scale={model.scale} rotation={model.rotation}>
      <Center>
        <primitive object={clonedScene} />
      </Center>
    </group>
  );
};

// Fallback component
const ModelFallback = () => (
  <group>
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#333" />
    </mesh>
  </group>
);

const TechIconCardExperience = ({ model, isDark = true }) => {
  // Preload models for better performance
  useGLTF.preload(model.modelPath);

  return (
    <Canvas dpr={[1, 2]} performance={{ min: 0.5, max: 1 }}>
      <ambientLight intensity={isDark ? 0.5 : 0.8} />
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 1.5 : 2} castShadow />
      <spotLight
        position={[10, 15, 10]}
        angle={0.3}
        penumbra={1}
        intensity={isDark ? 2.5 : 3}
        castShadow
      />
      <Environment preset={isDark ? "city" : "sunset"} />
      <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
        <Suspense fallback={<ModelFallback />}>
          <ModelContent model={model} isDark={isDark} />
        </Suspense>
      </Float>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      <Preload all />
    </Canvas>
  );
};

export default TechIconCardExperience;