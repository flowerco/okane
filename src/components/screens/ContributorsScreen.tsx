// @ts-nocheck

import { Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { SamModel } from '../threejs/SamModel';
import { BenModel } from '../threejs/BenModel';
import { SimonModel } from '../threejs/SimonModel';
import { AlexModel } from '../threejs/AlexModel';
import { GregorModel } from '../threejs/GregorModel';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
import Typewriter from 'typewriter-effect';
import './typewriter.css';

export const ContributorsScreen = () => {
	const team = [
		{ name: 'Ben', text: '' },
		{ name: 'Sam', text: 'Break dancing, obvs' },
		{ name: 'Simon', text: 'Standing stright and floating' },
		{ name: 'Alex', text: '' },
		{ name: 'Gregor', text: '' },
	];

	const [h1, setH1] = useState(0);

	const [status, setStatus] = useState('STARTUP');

	//button logic
	const rightClick = (camera: any) => {
		if (status === 'STOP' || status === 'STARTUP') {
			setH1((h1 + 1) % team.length);
			setStatus('RUNNINGRIGHT');
		}
	};
	const leftClick = (camera: any) => {
		if (status === 'STOP' || status === 'STARTUP') {
			setH1(h1 === 0 ? team.length - 1 : h1 - 1);
			setStatus('RUNNINGLEFT');
		}
	};
	function MyControls() {
		const distToRotate = (72 * Math.PI) / 180;
		const targetIterations = distToRotate / 0.01;
		let counter = 0;

		// camera logic
		useFrame((state) => {
			if (status === 'STARTUP') {
				state.camera.rotation.x = state.camera.rotation.z = 0;
				state.camera.rotation.y = -1.55;
			}
			if (status === 'RUNNINGRIGHT') {
				console.log('Trying to turn right');
				state.camera.rotation.y -= 0.01;
				counter++;
				if (counter > targetIterations) {
					setStatus('STOP');
					counter = 0;
				}
			}
			if (status === 'RUNNINGLEFT') {
				state.camera.rotation.y += 0.01;
				counter--;
				if (counter < -125.66) {
					setStatus('STOP');
					counter = 0;
				}
			}
		});
	}

	return (
		<div className='h-[calc(100vh_-_4rem_-_5.3mm)] w-full overflow-hidden flex flex-col'>
			<div id='typewriter' className=' flex self-center absolute top-12 z-20'>
				<Typewriter
					options={{
						strings: team[h1].name,
						pauseFor: 4000,
						autoStart: true,
						loop: true,
						delay: 300,
					}}
				/>
			</div>
			<button
				onClick={rightClick}
				className='text-white absolute top-[40%] right-[20%] h-10 aspect-square text-6xl z-20'
			>
				<BiRightArrow />
			</button>
			<button
				onClick={leftClick}
				className='text-white absolute top-[40%] left-[20%] h-10 aspect-square text-6xl z-20'
			>
				<BiLeftArrow />
			</button>
			<Canvas camera={{ position: [0.1, 0, 0], fov: 55 }}>
				<MyControls />
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Suspense fallback={null}>
					<BenModel
						position={[5.2, -1.5, -0.2]}
						scale={2.0}
						rotation={[0, -1.5, 0]}
					/>
					<SamModel
						position={[2.3, -2, 5]}
						scale={2.2}
						rotation={[0, 3.2, 0.07]}
					/>
					<SimonModel
						position={[-4.7, -2, 3.5]}
						scale={2.2}
						rotation={[0, 2.3, 0]}
					/>
					<AlexModel
						position={[-4, -2.1, -2.9]}
						scale={2.0}
						rotation={[0, 0.9, 0]}
					/>
					<GregorModel
						position={[1.8, -0.8, -5.8]}
						scale={2}
						rotation={[0.25, -0.25, 0.05]}
					/>
					{/* <gridHelper /> */}
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