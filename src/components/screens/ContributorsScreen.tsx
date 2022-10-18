// @ts-nocheck
import { useRef } from 'react';
import { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { SamModel } from '../threejs/SamModel';
import { BenModel } from '../threejs/BenModel';
import { SimonModel } from '../threejs/SimonModel';
import { AlexModel } from '../threejs/AlexModel';
import { GregorModel } from '../threejs/GregorModel';
import { StaticReadUsage } from 'three';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';

export const ContributorsScreen = () => {
	const team = [
		{ name: 'Sam', text: 'Break dancing, obvs' },
		{ name: 'Alex', text: 'Standing stright and floating' },
	];

	let status = 'STARTUP';

	const handleClick = (camera:any) => {
		status = 'RUNNING';
	};

  const getPosition = (personCount:number) => {

     const position = [5*Math.cos(72*personCount), 1.5, 5*Math.sin(72*personCount)]
     console.log(`Position for person ${personCount}: `, position);
     return position;
  }

	function MyControls() {
 
    const distToRotate = 72 * Math.PI / 180;
		let iterCount = 0;
		const targetIterations = distToRotate / 0.01;
    
		useFrame((state) => {
      if (status === 'STARTUP') {
        state.camera.rotation.x = state.camera.rotation.z = 0;
        state.camera.rotation.y = -1.55;
      }
      if (status === 'RUNNING') {
        // console.log('Current camera rotation: ', state.camera.rotation);
				state.camera.rotation.y -= 0.01;
				iterCount++;
			}
			if (iterCount > targetIterations) {
				status = 'STOP';
				iterCount = 0;
			}
		});
	}

	return (
		<div className='h-[calc(100vh_-_4rem_-_5.3mm)] w-full z-50 overflow-hidden'>
			<button
				onClick={handleClick}
				className='text-white absolute top-1/2 right-[20%] h-10 aspect-square text-6xl z-50'
			>
				<BiRightArrow />
			</button>
			<Canvas camera={{ position: [0.1, 0, 0], fov: 55 }}>
				<MyControls />
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Suspense fallback={null}>
					<BenModel
						position={[5,0,0]}
						scale={2.0}
						rotation={[0, 1.6, 0]}
					/>
					<SamModel
						position={[1.26,0,4.8]}
						scale={2.0}
						rotation={[0, -1.6, 0]}
					/>
					<SimonModel
						position={[-4.3,0,2.5]}
						scale={2.0}
						rotation={[0, 3.2, 0]}
					/>
					<AlexModel
						position={[-4.3,0,-2.5]}
						scale={2.0}
						rotation={[0, 0, 0]}
					/>
					<GregorModel
						position={[1.26, 0, -4.8]}
						scale={2.0}
						rotation={[0, 0, 0]}
					/>
					<gridHelper />
				</Suspense>
				{/* <OrbitControls target={[0, 0, 0]} />  */}
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
