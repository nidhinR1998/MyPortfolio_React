import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload, Stars, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

const ParticleWave = () => {
    const pointsRef = useRef();

    // Wave configuration
    const count = 4000;
    const SEPARATION = 2.5;
    const AMOUNTX = 80;
    const AMOUNTY = 50;

    // Generate initial particle positions
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                if (i >= count * 3) break;
                positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2; // x
                positions[i + 1] = 0; // y (will be animated)
                positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2; // z
                i += 3;
            }
        }
        return positions;
    }, [count, AMOUNTX, AMOUNTY, SEPARATION]);

    useFrame((state) => {
        if (!pointsRef.current || !pointsRef.current.geometry) return;
        const time = state.clock.getElapsedTime();
        const positions = pointsRef.current.geometry.attributes.position.array;
        if (!positions) return;

        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
            for (let iy = 0; iy < AMOUNTY; iy++) {
                if (i >= count * 3) break;

                // Complex wave math combining multiple sine waves with different frequencies
                const waveX = Math.sin((ix + time * 0.8) * 0.2) * 2.5;
                const waveY = Math.sin((iy + time * 1.2) * 0.25) * 2.5;
                const waveZ = Math.sin((ix + iy + time * 0.5) * 0.1) * 3;
                const noise = Math.sin((ix * iy + time) * 0.05) * 0.5;

                positions[i + 1] = waveX + waveY + waveZ + noise;
                i += 3;
            }
        }
        // Tell ThreeJS to update the buffer
        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Slowly rotate the entire field
        pointsRef.current.rotation.y = time * 0.05;
    });

    return (
        <points ref={pointsRef} position={[0, -12, -15]} rotation={[0.4, 0, 0]}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.12}
                color="#38bdf8"
                transparent
                opacity={0.6}
                sizeAttenuation={true}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

const Rig = () => {
    useFrame((state) => {
        // Subtle scroll drift — much gentler now
        const scrollPercent = Math.min(
            window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1),
            1
        );

        // Mouse parallax: gentle X and Y shift only
        const targetX = -state.mouse.x * 2;
        const targetY = state.mouse.y * 1.5 + 5; // keep hero visible on load
        const targetZ = 20 - scrollPercent * 3; // subtle dive, not aggressive

        state.camera.position.lerp(
            new THREE.Vector3(targetX, targetY, targetZ),
            0.04
        );
        state.camera.lookAt(0, 0, 0);
    });
    return null;
};

const ThreeDBackground = () => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, pointerEvents: 'none', background: '#020617' }}>
            <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
                <Rig />
                {/* Subtle ambient light so colors pop without washing out */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#38bdf8" />

                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />

                <Sparkles
                    count={200}
                    scale={20}
                    size={2}
                    speed={0.5}
                    opacity={0.5}
                    color="#38bdf8"
                />

                <ParticleWave />

                <fog attach="fog" args={['#020617', 5, 45]} />

                <Preload all />
            </Canvas>
        </div>
    );
};

export default ThreeDBackground;
