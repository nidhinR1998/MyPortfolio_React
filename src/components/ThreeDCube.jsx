import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Define the rotating Cube component
const RotatingCube = () => {
    const meshRef = useRef(null);

    // Load local textures or use solid colors as fallback if textures don't exist
    // We will assign a unique color to each face's material for a tech-stack look
    const materials = [
        new THREE.MeshStandardMaterial({ color: '#f89820', roughness: 0.1, metalness: 0.8 }), // Java Orange
        new THREE.MeshStandardMaterial({ color: '#3776ab', roughness: 0.1, metalness: 0.8 }), // Python Blue
        new THREE.MeshStandardMaterial({ color: '#10b981', roughness: 0.1, metalness: 0.8 }), // Ab Initio Green
        new THREE.MeshStandardMaterial({ color: '#8b5cf6', roughness: 0.1, metalness: 0.8 }), // AI Purple
        new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.1, metalness: 0.5 }), // Dark Base
        new THREE.MeshStandardMaterial({ color: '#38bdf8', roughness: 0.1, metalness: 0.8 })  // React Cyan
    ];

    // Rotate the cube constantly
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    const [hovered, setHover] = useState(false);

    // Create an animated glow effect mathematically using sine waves
    useFrame(({ clock }) => {
        if (meshRef.current && hovered) {
            const s = 1 + Math.sin(clock.elapsedTime * 5) * 0.05;
            meshRef.current.scale.set(s, s, s);
        } else if (meshRef.current && !hovered) {
            // return to normal scale
            meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        }
    });

    return (
        <mesh
            ref={meshRef}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            castShadow
            receiveShadow
            material={materials}
        >
            <boxGeometry args={[2.5, 2.5, 2.5]} />
        </mesh>
    );
};

const ThreeDCube = () => {
    return (
        <div style={{ width: '100%', height: '100%', minHeight: '300px', cursor: 'grab' }}>
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#38bdf8" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#8b5cf6" />

                <RotatingCube />

                {/* OrbitControls enables the user to drag to rotate the view */}
                <OrbitControls
                    enableZoom={false}
                    autoRotate={false}
                    enablePan={false}
                    dampingFactor={0.05}
                />
            </Canvas>
        </div>
    );
};

export default ThreeDCube;
