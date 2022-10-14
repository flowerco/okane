import { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { SamModel } from "../threejs/SamModel";

export const ContributorsScreen = () => {
  return (
    <div className="h-[calc(100vh_-_4rem_-_5.3mm)] w-full z-50">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <SamModel
            position={[0, -2.5, 0]}
            scale={2.5}
            rotation={[0.2, 0.3, 0]}
          />
        </Suspense>
        <OrbitControls />
        <Stars
          radius={50} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={5000} // Amount of stars (default=5000)
          factor={4} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />
      </Canvas>
    </div>
  );
};
