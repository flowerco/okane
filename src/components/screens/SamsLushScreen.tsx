import { Suspense, useRef, useState } from "react";
import { useFrame, Canvas, ThreeEvent } from '@react-three/fiber';
import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF, Stars } from '@react-three/drei';
// import { Model } from '../three/Computer'; 
import { GLTF } from 'three-stdlib'
import * as THREE from 'three'


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

function loadGLTFModel(scene: any, glbPath: any, options: any) {
  const { receiveShadow, castShadow } = options;
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    loader.load(
      glbPath,
      (gltf) => {
        const obj = gltf.scene;
        obj.name = "dinosaur";
        obj.position.y = 0;
        obj.position.x = 0;
        obj.receiveShadow = receiveShadow;
        obj.castShadow = castShadow;
        scene.add(obj);

        obj.traverse(function (child) {
          if (child instanceof Mesh) {
            child.castShadow = castShadow;
            child.receiveShadow = receiveShadow;
          }
        });

        resolve(obj);
      },
      undefined,
      function (error) {
        console.log(error);
        reject(error);
      }
    );
  });
}

type GLTFResult = GLTF & {
  nodes: {
    defaultMaterial: THREE.Mesh
    defaultMaterial_1: THREE.Mesh
    defaultMaterial_2: THREE.Mesh
    defaultMaterial_3: THREE.Mesh
  }
  materials: {
    ['06___Default']: THREE.MeshStandardMaterial
    ['03___Default']: THREE.MeshStandardMaterial
  }
}

export function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/computer.glb') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.defaultMaterial.geometry} material={materials['06___Default']} />
            <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials['06___Default']} />
            <mesh geometry={nodes.defaultMaterial_2.geometry} material={materials['06___Default']} />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.defaultMaterial_3.geometry} material={materials['03___Default']} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/computer.glb')

export const SamsLushScreen = () => {
  return (
    <div className="h-[calc(100vh_-_4rem_-_5.3mm)] w-full z-50">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <Box position={[0, 0, 0]} /> */}
        <Suspense fallback={null} >
          <Model position={[0,0,0]} />
        </Suspense>
        <Stars 
          radius={100} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={5000} // Amount of stars (default=5000)
          factor={4} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade
        />
      </Canvas>
    </div>
  )
}