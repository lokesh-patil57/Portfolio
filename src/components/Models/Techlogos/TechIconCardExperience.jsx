import { Center, Environment, Float, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { DemandFrameloop } from "../../perf/DemandFrameloop";

const TechIconCardExperience = ({ model, isDark = true, active = true }) => {
  const isMobile = useIsMobile();
  const { scene } = useGLTF(model.modelPath);
  const sceneInstance = useMemo(() => scene.clone(true), [scene]);

  const effectiveScale = useMemo(() => {
    const baseScale = model?.scale ?? 1;
    
    // Use mobileScale if available and on mobile
    if (isMobile && model?.mobileScale !== undefined) {
      return model.mobileScale;
    }
    
    if (!isMobile) return baseScale;

    // Keep already-tiny logo models readable; shrink medium/large ones on mobile.
    const factor =
      typeof baseScale === "number" && baseScale <= 0.12 ? 1 : baseScale >= 2 ? 0.55 : 0.75;

    if (typeof baseScale === "number") return baseScale * factor;
    if (Array.isArray(baseScale)) return baseScale.map((v) => (typeof v === "number" ? v * factor : v));
    return baseScale;
  }, [isMobile, model?.scale, model?.mobileScale]);

  useEffect(() => {
    if (model.name === "Interactive Developer") {
      sceneInstance.traverse((child) => {
        if (child.isMesh) {
          if (child.name === "Object_5") {
            child.material = new THREE.MeshStandardMaterial({ color: isDark ? "white" : "black" });
          }
        }
      });
    }
  }, [model.name, sceneInstance, isDark]);

  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop="demand"
      performance={{ min: 0.5 }}
      camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <DemandFrameloop active={active} />
      <Suspense fallback={null}>
        <ambientLight intensity={isDark ? 0.5 : 0.8} />
        <directionalLight position={[5, 5, 5]} intensity={isDark ? 1.5 : 2} />
        <spotLight
          position={[10, 15, 10]}
          angle={0.3}
          penumbra={1}
          intensity={isDark ? 2.5 : 3}
        />
        <Environment preset={isDark ? "city" : "sunset"} />
        <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
          <Center>
            <group scale={effectiveScale} rotation={model.rotation}>
              <primitive object={sceneInstance} />
            </group>
          </Center>
        </Float>

        <OrbitControls enableZoom={false} />
      </Suspense>
    </Canvas>
  );
};

export default React.memo(TechIconCardExperience);