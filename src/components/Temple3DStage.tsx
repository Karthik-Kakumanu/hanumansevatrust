import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { LordHanumanCharacter } from './LordHanumanCharacter'

export type PageTheme = 'home' | 'about' | 'seva' | 'gallery' | 'events' | 'donation' | 'contact'

interface StageArchitectureProps {
  theme: PageTheme
}

// Camera controller ensuring the view looks directly at Lord Hanuman's chest/heart with subtle mouse glide
function CameraController({ defaultPos }: { defaultPos: [number, number, number] }) {
  const { camera, pointer } = useThree()
  const targetLookAt = useRef(new THREE.Vector3(0, 0.25, 0))

  useFrame((_, delta) => {
    // Subtle mouse parallax
    const targetX = defaultPos[0] + pointer.x * 0.4
    const targetY = defaultPos[1] + pointer.y * 0.25
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 2.5)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 2.5)
    camera.lookAt(targetLookAt.current)
  })

  return null
}

function StageArchitecture({ theme }: StageArchitectureProps) {
  return (
    <group position={[0, -0.6, 0]}>
      {/* 1. Courtyard Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.5, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial
          color={
            theme === 'about'
              ? '#efe2cd'
              : theme === 'seva'
              ? '#f5e2c7'
              : theme === 'events'
              ? '#fae5d0'
              : theme === 'donation'
              ? '#fff2e0'
              : '#f6ebd9'
          }
          roughness={0.7}
          metalness={0.06}
        />
      </mesh>

      {/* 2. Classical Carved Sandstone Pillars */}
      <group position={[-2.6, 1.2, -1.8]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.3, 0.38, 4.0, 16]} />
          <meshStandardMaterial color="#d6b88d" roughness={0.75} />
        </mesh>
        <mesh position={[0, 2.0, 0]}>
          <boxGeometry args={[0.85, 0.2, 0.85]} />
          <meshStandardMaterial color="#c29235" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Hanging Temple Bell on Left Pillar */}
        <group position={[0.4, 1.4, 0.2]}>
          <mesh>
            <cylinderGeometry args={[0.015, 0.015, 0.7, 8]} />
            <meshStandardMaterial color="#c29235" metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.4, 0]}>
            <cylinderGeometry args={[0.08, 0.16, 0.22, 16]} />
            <meshStandardMaterial color="#e5b84c" metalness={0.85} roughness={0.25} />
          </mesh>
        </group>
      </group>

      <group position={[2.6, 1.2, -1.8]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.3, 0.38, 4.0, 16]} />
          <meshStandardMaterial color="#d6b88d" roughness={0.75} />
        </mesh>
        <mesh position={[0, 2.0, 0]}>
          <boxGeometry args={[0.85, 0.2, 0.85]} />
          <meshStandardMaterial color="#c29235" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Hanging Temple Bell on Right Pillar */}
        <group position={[-0.4, 1.4, 0.2]}>
          <mesh>
            <cylinderGeometry args={[0.015, 0.015, 0.7, 8]} />
            <meshStandardMaterial color="#c29235" metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.4, 0]}>
            <cylinderGeometry args={[0.08, 0.16, 0.22, 16]} />
            <meshStandardMaterial color="#e5b84c" metalness={0.85} roughness={0.25} />
          </mesh>
        </group>
      </group>

      {/* 3. Theme-Specific Background Environment */}
      {theme === 'home' && (
        /* Grand Temple Arch with Golden Kalash */
        <group position={[0, 1.8, -2.2]}>
          <mesh>
            <torusGeometry args={[2.4, 0.12, 12, 48, Math.PI]} />
            <meshStandardMaterial color="#c29235" roughness={0.35} metalness={0.78} />
          </mesh>
          <mesh position={[0, 2.5, 0]}>
            <coneGeometry args={[0.18, 0.45, 16]} />
            <meshStandardMaterial color="#e8b84b" metalness={0.88} roughness={0.2} />
          </mesh>
        </group>
      )}

      {theme === 'about' && (
        /* Classical Stone Jali Lattice Screen */
        <group position={[0, 1.4, -2.4]}>
          <mesh>
            <boxGeometry args={[4.8, 3.2, 0.08]} />
            <meshStandardMaterial color="#e3d0b3" roughness={0.82} />
          </mesh>
          {/* Decorative stone lattice grid lines */}
          {[-1.5, -0.75, 0, 0.75, 1.5].map((x, i) => (
            <mesh key={`h-${i}`} position={[x, 0, 0.05]}>
              <boxGeometry args={[0.06, 3.2, 0.04]} />
              <meshStandardMaterial color="#c29235" metalness={0.6} />
            </mesh>
          ))}
          {[-1.0, -0.5, 0, 0.5, 1.0].map((y, i) => (
            <mesh key={`v-${i}`} position={[0, y, 0.05]}>
              <boxGeometry args={[4.8, 0.06, 0.04]} />
              <meshStandardMaterial color="#c29235" metalness={0.6} />
            </mesh>
          ))}
        </group>
      )}

      {theme === 'seva' && (
        /* Sacred Annadaan Brass Vessels & Tulsi Altar */
        <group position={[0, 0, -1.8]}>
          {/* Brass offering bowl left */}
          <group position={[-1.6, -0.2, 0.4]}>
            <mesh>
              <cylinderGeometry args={[0.32, 0.22, 0.25, 20]} />
              <meshStandardMaterial color="#e8b84b" metalness={0.85} roughness={0.25} />
            </mesh>
            {/* Sacred Rice / Grain offering */}
            <mesh position={[0, 0.12, 0]}>
              <sphereGeometry args={[0.26, 12, 12]} />
              <meshStandardMaterial color="#fffcf5" roughness={0.6} />
            </mesh>
          </group>
          {/* Brass offering bowl right */}
          <group position={[1.6, -0.2, 0.4]}>
            <mesh>
              <cylinderGeometry args={[0.32, 0.22, 0.25, 20]} />
              <meshStandardMaterial color="#e8b84b" metalness={0.85} roughness={0.25} />
            </mesh>
            <mesh position={[0, 0.12, 0]}>
              <sphereGeometry args={[0.26, 12, 12]} />
              <meshStandardMaterial color="#e87823" roughness={0.6} />
            </mesh>
          </group>
        </group>
      )}

      {theme === 'gallery' && (
        /* Celestial Floating Lotus Petals & Prabhavali Arches */
        <group position={[0, 1.6, -2.0]}>
          <mesh>
            <torusGeometry args={[2.2, 0.08, 12, 40, Math.PI]} />
            <meshStandardMaterial color="#e8b84b" metalness={0.8} />
          </mesh>
          <mesh position={[0, 1.2, 0]}>
            <torusGeometry args={[1.5, 0.06, 12, 32, Math.PI]} />
            <meshStandardMaterial color="#c29235" metalness={0.7} />
          </mesh>
        </group>
      )}

      {theme === 'events' && (
        /* Festive Rathayatra Pavilion with Marigold Garlands */
        <group position={[0, 2.6, -1.9]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 5.2, 8]} />
            <meshStandardMaterial color="#c29235" />
          </mesh>
          {/* Hanging Marigold Garland drops */}
          {[-2.0, -1.2, -0.4, 0.4, 1.2, 2.0].map((x, i) => (
            <group key={i} position={[x, -0.3, 0]}>
              <mesh>
                <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
                <meshStandardMaterial color="#f1b84b" roughness={0.7} />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {theme === 'donation' && (
        /* Garbhagriha Inner Sanctum with Sacred Golden Diya Lamps */
        <group position={[0, 0, -1.6]}>
          <group position={[-1.8, -0.15, 0.2]}>
            <mesh>
              <cylinderGeometry args={[0.15, 0.25, 0.45, 16]} />
              <meshStandardMaterial color="#c29235" metalness={0.8} />
            </mesh>
            {/* Glowing Diya Flame */}
            <mesh position={[0, 0.28, 0]}>
              <coneGeometry args={[0.06, 0.16, 12]} />
              <meshBasicMaterial color="#ffaa33" />
            </mesh>
            <pointLight position={[0, 0.35, 0]} intensity={1.5} color="#ff9922" distance={3} />
          </group>

          <group position={[1.8, -0.15, 0.2]}>
            <mesh>
              <cylinderGeometry args={[0.15, 0.25, 0.45, 16]} />
              <meshStandardMaterial color="#c29235" metalness={0.8} />
            </mesh>
            {/* Glowing Diya Flame */}
            <mesh position={[0, 0.28, 0]}>
              <coneGeometry args={[0.06, 0.16, 12]} />
              <meshBasicMaterial color="#ffaa33" />
            </mesh>
            <pointLight position={[0, 0.35, 0]} intensity={1.5} color="#ff9922" distance={3} />
          </group>
        </group>
      )}

      {/* Floating Sacred Golden Aura Sparkles */}
      <Float speed={0.6} rotationIntensity={0.02} floatIntensity={0.1}>
        <Sparkles count={45} scale={[6, 5, 5]} size={1.8} speed={0.25} color="#e5b84c" />
      </Float>
    </group>
  )
}

export default function Temple3DStage({
  theme = 'home',
  pose = 'blessing',
  cameraPos = [0, 0.35, 4.8],
  hanumanPos = [0, 0, 0],
  hanumanScale = 1.0,
  className = ''
}: {
  theme?: PageTheme
  pose?: 'blessing' | 'namaskar' | 'heroic' | 'seated-meditation' | 'protective'
  cameraPos?: [number, number, number]
  hanumanPos?: [number, number, number]
  hanumanScale?: number
  className?: string
}) {
  return (
    <div className={`temple-3d-stage-wrapper ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: cameraPos, fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        shadows
      >
        <CameraController defaultPos={cameraPos} />

        {/* Bright Warm Sunlight & Ambient Devotional Illumination */}
        <ambientLight intensity={0.95} color="#fff1db" />
        <directionalLight
          position={[4, 8, 5]}
          intensity={2.4}
          color="#ffe2a8"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* Saffron & Rose Temple Rim Lights */}
        <pointLight position={[-3, 2.5, 2]} intensity={2.2} color="#e67528" />
        <pointLight position={[3, 2, -1]} intensity={2.8} color="#f5c542" />

        {/* The 3D Architecture */}
        <StageArchitecture theme={theme} />

        {/* The Animated Lord Hanuman Character */}
        <LordHanumanCharacter
          position={hanumanPos}
          scale={hanumanScale}
          pose={pose}
          floatAnim={true}
        />
      </Canvas>
    </div>
  )
}
