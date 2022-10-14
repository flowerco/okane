/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: MLAB (https://sketchfab.com/MLAB)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/civilization-one-intro-earth-95391b2c6788410b9020b43056d034d5
title: Civilization One Intro - Earth
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/earth.gltf')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.Object_5.geometry} material={materials['lambert2SG.001']} />
            <mesh geometry={nodes.Object_6.geometry} material={materials['lambert2SG.001']} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/earth.gltf')
