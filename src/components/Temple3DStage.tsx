import { Canvas } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { LordHanumanCharacter } from './LordHanumanCharacter'

export type PageTheme = 'home' | 'about' | 'seva' | 'gallery' | 'events' | 'donation' | 'contact'

interface StageLightingProps {
  theme: PageTheme
}

function StageArchitecture({ theme }: StageLightingProps) {
  // Pale sandstone and warm ivory architecture reflecting bright sunrise temple light
  return (
    <group position={[0, -0.6, 0]}>
      {/* Warm courtyard ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 18]} />
        <meshStandardMaterial
          color={theme === 'about' ? '#f0e3cf' : theme === 'seva' ? '#f5e4cb' : theme === 'events' ? '#fae6d2' : '#f5e8d5'}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      {/* Background Classical Pillars with decorative brass capitals */}
      <group position={[-2.8, 1.8, -1.8]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.32, 0.4, 4.4, 16]} />
          <meshStandardMaterial color="#debe95" roughness={0.75} />
        </mesh>
        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[0.9, 0.22, 0.9]} />
          <meshStandardMaterial color="#c29235" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      <group position={[2.8, 1.8, -1.8]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.32, 0.4, 4.4, 16]} />
          <meshStandardMaterial color="#debe95" roughness={0.75} />
        </mesh>
        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[0.9, 0.22, 0.9]} />
          <meshStandardMaterial color="#c29235" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* Ornamental Cusped Arch in background */}
      <group position={[0, 2.2, -2.2]}>
        <mesh>
          <torusGeometry args={[2.5, 0.12, 12, 48, Math.PI]} />
          <meshStandardMaterial color="#c29235" roughness={0.35} metalness={0.75} />
        </mesh>
      </group>

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
  cameraPos = [0, 1.7, 5.2],
  hanumanPos = [0, -0.15, 0],
  hanumanScale = 1.05,
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
        camera={{ position: cameraPos, fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        shadows
      >
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
        <pointLight position={[-3, 3, 2]} intensity={2.2} color="#e67528" />
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
