import { useRef, useState } from "react";
import { useFrame, Canvas, ThreeEvent } from '@react-three/fiber';
import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF } from '@react-three/drei';
import { ComputerModel } from '../three/computer'; 

function Box(props: any) {
  const mesh = useRef<Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => (mesh.current.rotation.y += 0.003));

  return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 3 : 2}
        onClick={(event: ThreeEvent<MouseEvent>) => setActive(!active)}
        onPointerOver={(event: ThreeEvent<PointerEvent>) => setHover(true)}
        onPointerOut={(event: ThreeEvent<PointerEvent>) => setHover(false)}>
        <boxGeometry args={[1,1,1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
  )
}


export const SamsLushScreen = () => {

  return (
    <div className="h-[calc(100vh_-_4rem_-_5.3mm)] w-full overflow-y-auto">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[0, 0, 0]} />
        {/* <ComputerModel position={[0,0,0]} /> */}
      </Canvas>
    </div>
  )
}