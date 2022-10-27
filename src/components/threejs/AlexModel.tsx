import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Mesh } from 'three';

export function AlexModel(props: any) {
	const group = useRef<Mesh>(null!);
	const { nodes, materials, animations } = useGLTF(
		'/models/alex_model.glb'
	) as any;
	const { actions } = useAnimations(animations, group);

	useEffect(() => {
		const animAction = actions['Armature|mixamo.com|Layer0'];
		animAction!.play();
	});

	return (
		<group ref={group} {...props} dispose={null}>
			<group name='Scene'>
				<group name='Armature001'>
					<group name='EyeLeft001' />
					<group name='EyeRight001' />
					<group name='Wolf3D_Body001' />
					<group name='Wolf3D_Hair001' />
					<group name='Wolf3D_Head001' />
					<group name='Wolf3D_Outfit_Bottom001' />
					<group name='Wolf3D_Outfit_Footwear001' />
					<group name='Wolf3D_Outfit_Top001' />
					<group name='Wolf3D_Teeth001' />
					<primitive object={nodes.Hips} />
					<skinnedMesh
						name='Wolf3D_Body002'
						geometry={nodes.Wolf3D_Body002.geometry}
						material={materials['Wolf3D_Body.001']}
						skeleton={nodes.Wolf3D_Body002.skeleton}
					/>
					<skinnedMesh
						name='Wolf3D_Hair002'
						geometry={nodes.Wolf3D_Hair002.geometry}
						material={materials['Wolf3D_Hair.001']}
						skeleton={nodes.Wolf3D_Hair002.skeleton}
					/>
					<skinnedMesh
						name='EyeLeft002'
						geometry={nodes.EyeLeft002.geometry}
						material={materials['Wolf3D_Eye.001']}
						skeleton={nodes.EyeLeft002.skeleton}
						morphTargetDictionary={nodes.EyeLeft002.morphTargetDictionary}
						morphTargetInfluences={nodes.EyeLeft002.morphTargetInfluences}
					/>
					<skinnedMesh
						name='EyeRight002'
						geometry={nodes.EyeRight002.geometry}
						material={materials['Wolf3D_Eye.001']}
						skeleton={nodes.EyeRight002.skeleton}
						morphTargetDictionary={nodes.EyeRight002.morphTargetDictionary}
						morphTargetInfluences={nodes.EyeRight002.morphTargetInfluences}
					/>
					<skinnedMesh
						name='Wolf3D_Outfit_Bottom002'
						geometry={nodes.Wolf3D_Outfit_Bottom002.geometry}
						material={materials['Wolf3D_Outfit_Bottom.001']}
						skeleton={nodes.Wolf3D_Outfit_Bottom002.skeleton}
					/>
					<skinnedMesh
						name='Wolf3D_Outfit_Footwear002'
						geometry={nodes.Wolf3D_Outfit_Footwear002.geometry}
						material={materials['Wolf3D_Outfit_Footwear.001']}
						skeleton={nodes.Wolf3D_Outfit_Footwear002.skeleton}
					/>
					<skinnedMesh
						name='Wolf3D_Outfit_Top002'
						geometry={nodes.Wolf3D_Outfit_Top002.geometry}
						material={materials['Wolf3D_Outfit_Top.001']}
						skeleton={nodes.Wolf3D_Outfit_Top002.skeleton}
					/>
					<skinnedMesh
						name='Wolf3D_Teeth002'
						geometry={nodes.Wolf3D_Teeth002.geometry}
						material={materials['Wolf3D_Teeth.001']}
						skeleton={nodes.Wolf3D_Teeth002.skeleton}
						morphTargetDictionary={nodes.Wolf3D_Teeth002.morphTargetDictionary}
						morphTargetInfluences={nodes.Wolf3D_Teeth002.morphTargetInfluences}
					/>
					<skinnedMesh
						name='Wolf3D_Head002'
						geometry={nodes.Wolf3D_Head002.geometry}
						material={materials['Wolf3D_Skin.001']}
						skeleton={nodes.Wolf3D_Head002.skeleton}
						morphTargetDictionary={nodes.Wolf3D_Head002.morphTargetDictionary}
						morphTargetInfluences={nodes.Wolf3D_Head002.morphTargetInfluences}
					/>
				</group>
			</group>
		</group>
	);
}

useGLTF.preload('/models/alex_model.glb');
