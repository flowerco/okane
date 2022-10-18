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
import { withRouter } from 'react-router-dom';
//import 'typerwriter.css';
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
		if (status === 'STOP' || status === 'STARTUP')
			setH1(h1 === 0 ? team.length - 1 : h1 - 1);
		setStatus('RUNNINGLEFT');
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
		<div className='h-[calc(100vh_-_4rem_-_5.3mm)] w-full z-50 overflow-hidden'>
			{/* <h1 id='title' className='text-white'>
				{team[h1].name}
			</h1> */}
			<Typewriter
				id='typewriter'
				className='text-white'
				options={{
					strings: team[h1].name,
					pauseFor: 4000,
					autoStart: true,
					loop: true,
					skipAddStyles: true,
				}}
			/>
			<button
				onClick={rightClick}
				className='text-white absolute top-1/2 right-[20%] h-10 aspect-square text-6xl z-50'
			>
				<BiRightArrow />
			</button>
			<button
				onClick={leftClick}
				className='text-white absolute top-1/2 left-[20%] h-10 aspect-square text-6xl z-50'
			>
				<BiLeftArrow />
			</button>
			<Canvas camera={{ position: [0.1, 0, 0], fov: 55 }}>
				<MyControls />
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Suspense fallback={null}>
					<BenModel
						position={[5, -1.2, 0]}
						scale={2.0}
						rotation={[0, -1.6, 0]}
					/>
					<SamModel
						position={[2.4, -1.8, 3.8]}
						scale={2}
						rotation={[0, 3.2, 0]}
					/>
					<SimonModel
						position={[-4.3, -1.8, 3]}
						scale={2.2}
						rotation={[0, 2.3, 0]}
					/>
					<AlexModel
						position={[-4.3, -1.7, -2.5]}
						scale={2.0}
						rotation={[0, 1, 0]}
					/>
					<GregorModel
						position={[2.26, -0.9, -7.8]}
						scale={2.7}
						rotation={[0.3, 0.1, 0]}
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
