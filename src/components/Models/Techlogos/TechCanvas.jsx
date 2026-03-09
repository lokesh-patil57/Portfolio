import { Canvas } from "@react-three/fiber";
import { Float, Center, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { DemandFrameloop } from "../../perf/DemandFrameloop";

const TechModel = ({ model }) => {

  const { scene } = useGLTF(model.modelPath);

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.6}
      floatIntensity={0.6}
    >
      <Center>
        <primitive
          object={scene}
          scale={model.scale}
          rotation={model.rotation}
        />
      </Center>
    </Float>
  );
};

const TechCanvas = ({ models, isDark }) => {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop="demand"
      gl={{ antialias: false, powerPreference: "high-performance" }}
      performance={{ min: 0.5 }}
      camera={{ position: [0, 0, 12], fov: 50 }}
    >
      <DemandFrameloop active />
      {/* Lighting */}
      <ambientLight intensity={0.7} />

      <directionalLight
        position={[5,5,5]}
        intensity={1.5}
      />

      <Suspense fallback={null}>
        {models.map((model, i) => (
          <group key={i} position={[
            (i % 5) * 3 - 6,
            -Math.floor(i / 5) * 3,
            0
          ]}>
            <TechModel model={model}/>
          </group>
        ))}
      </Suspense>

    </Canvas>
  );
};

export default TechCanvas;