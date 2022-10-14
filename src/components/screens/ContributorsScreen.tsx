import { Suspense, useRef, useState } from "react";
import { useFrame, Canvas, ThreeEvent } from '@react-three/fiber';
import { Mesh } from 'three';
import { useGLTF, useAnimations, OrbitControls, Stars } from '@react-three/drei';


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

function Model(props:any) {
  const group = useRef<Mesh>(null!);
  const { nodes, materials, animations } = useGLTF('/me_model.glb') as any
  const { actions } = useAnimations(animations, group);

  // useEffect(() => {
  //   const animAction = actions['Armature|mixamo.com|Layer0'];
  //   console.log(animAction);
  //   animAction.play();
  // });

  useFrame(({ clock }) => {
    group.current.rotation.y = clock.getElapsedTime() * 0.6;
  })

  return (
    <group {...props} ref={group} dispose={null}>
      <primitive object={nodes.Hips} />
      <skinnedMesh geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Glasses.geometry} material={materials.Wolf3D_Glasses} skeleton={nodes.Wolf3D_Glasses.skeleton} />
      <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
      <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
    </group>
  )
}

useGLTF.preload('/me_model.glb')

export const ContributorsScreen = () => {
  return (
    <div className="h-[calc(100vh_-_4rem_-_5.3mm)] w-full z-50">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <Box position={[-3, 0, 0]} />
        <Box position={[3, 0, 0]} /> */}
        <Suspense fallback={null} >
          <Model position={[0,-2.5,0]} scale={2.5} rotation={[0.2,0.3,0]}/>
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
  )
}