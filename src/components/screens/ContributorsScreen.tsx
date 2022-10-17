// @ts-nocheck
import { useRef } from 'react';
import { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { SamModel } from '../threejs/SamModel';
import { BenModel } from '../threejs/BenModel';
import { SimonModel } from '../threejs/SimonModel';
import { AlexModel } from '../threejs/AlexModel';
export const ContributorsScreen = () => {
	return (
		<div className='h-[calc(100vh_-_4rem_-_5.3mm)] w-full z-50 overflow-hidden'>
			<button className='bg-white'>HELLO</button>
			<Canvas camera={{ position: [0.1, 0, 0], fov: 60 }}>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Suspense fallback={null}>
					<SamModel
						position={[-4, -1.7, 0]}
						scale={2.0}
						rotation={[0, 1.6, 0]}
					/>
					<AlexModel
						position={[5, -1.5, 0]}
						scale={2.0}
						rotation={[0, -1.6, 0]}
					/>
					<SimonModel
						position={[0, -1.7, 4.5]}
						scale={2.0}
						rotation={[0, 3.2, 0]}
					/>
					<gridHelper />
				</Suspense>
				<OrbitControls target={[0, 0, 0]} />
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
