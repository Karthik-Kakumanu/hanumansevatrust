import { useEffect, useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { LordHanumanCharacter } from './LordHanumanCharacter'
import { CHAPTER_TRAJECTORY } from '../data/chapterData'

// PBR Materials Cache for high-performance temple rendering
interface TemplePBRMaterials {
  sandstonePale: THREE.MeshStandardMaterial
  sandstoneCarved: THREE.MeshStandardMaterial
  goldRoyal: THREE.MeshStandardMaterial
  goldAntique: THREE.MeshStandardMaterial
  velvetMaroon: THREE.MeshStandardMaterial
  silkSaffron: THREE.MeshStandardMaterial
  marbleFloor: THREE.MeshStandardMaterial
  brassAura: THREE.MeshStandardMaterial
  diyaFlame: THREE.MeshBasicMaterial
  woodRich: THREE.MeshStandardMaterial
}

function useTemplePBR(): TemplePBRMaterials {
  return useMemo(
    () => ({
      sandstonePale: new THREE.MeshStandardMaterial({
        color: '#e8d2b2',
        roughness: 0.78,
        metalness: 0.05
      }),
      sandstoneCarved: new THREE.MeshStandardMaterial({
        color: '#d6b88d',
        roughness: 0.82,
        metalness: 0.06
      }),
      goldRoyal: new THREE.MeshStandardMaterial({
        color: '#e8b84b',
        roughness: 0.22,
        metalness: 0.88,
        emissive: '#4a3406',
        emissiveIntensity: 0.18
      }),
      goldAntique: new THREE.MeshStandardMaterial({
        color: '#c29235',
        roughness: 0.32,
        metalness: 0.82
      }),
      velvetMaroon: new THREE.MeshStandardMaterial({
        color: '#5c1722',
        roughness: 0.68,
        metalness: 0.12
      }),
      silkSaffron: new THREE.MeshStandardMaterial({
        color: '#e87823',
        roughness: 0.58,
        metalness: 0.1
      }),
      marbleFloor: new THREE.MeshStandardMaterial({
        color: '#f6ebd9',
        roughness: 0.38,
        metalness: 0.22
      }),
      brassAura: new THREE.MeshStandardMaterial({
        color: '#d99f36',
        roughness: 0.28,
        metalness: 0.84
      }),
      diyaFlame: new THREE.MeshBasicMaterial({
        color: '#ff9922'
      }),
      woodRich: new THREE.MeshStandardMaterial({
        color: '#522b19',
        roughness: 0.7,
        metalness: 0.05
      })
    }),
    []
  )
}

/* =========================================================================
   ARCHITECTURAL GEOMETRIES: PILLARS, ARCHES, BELLS & DIYAS
   ========================================================================= */
function TemplePillar({
  position,
  scale = 1
}: {
  position: [number, number, number]
  scale?: number
}) {
  const mats = useTemplePBR()
  return (
    <group position={position} scale={scale}>
      {/* Octagonal Plinth */}
      <mesh position={[0, -0.6, 0]} material={mats.sandstoneCarved} receiveShadow>
        <cylinderGeometry args={[0.55, 0.68, 0.45, 8]} />
      </mesh>
      {/* Lower Molded Base */}
      <mesh position={[0, -0.28, 0]} material={mats.goldAntique}>
        <cylinderGeometry args={[0.48, 0.56, 0.2, 16]} />
      </mesh>
      {/* Fluted Column Shaft */}
      <mesh position={[0, 1.8, 0]} material={mats.sandstonePale} castShadow receiveShadow>
        <cylinderGeometry args={[0.38, 0.44, 4.0, 16]} />
      </mesh>
      {/* Ornate Capital & Bracket */}
      <mesh position={[0, 3.9, 0]} material={mats.goldRoyal} castShadow>
        <boxGeometry args={[1.05, 0.28, 1.05]} />
      </mesh>
      <mesh position={[0, 4.15, 0]} material={mats.sandstoneCarved}>
        <boxGeometry args={[1.25, 0.22, 1.25]} />
      </mesh>
    </group>
  )
}

function MandapaArch({
  position,
  width = 6,
  height = 6.5,
  scale = 1
}: {
  position: [number, number, number]
  width?: number
  height?: number
  scale?: number
}) {
  const mats = useTemplePBR()
  return (
    <group position={position} scale={scale}>
      {/* Monumental Cusped Arch Torana */}
      <mesh position={[0, height * 0.52, 0]}>
        <torusGeometry args={[width * 0.48, 0.22, 14, 48, Math.PI]} />
        <primitive object={mats.goldAntique} attach="material" />
      </mesh>
      {/* Golden Kalash Pinnacle */}
      <mesh position={[0, height * 1.05, 0]} material={mats.goldRoyal}>
        <coneGeometry args={[0.26, 0.65, 16]} />
      </mesh>
      <mesh position={[0, height * 1.38, 0]} material={mats.goldRoyal}>
        <sphereGeometry args={[0.1, 14, 14]} />
      </mesh>
    </group>
  )
}

function HangingBell({ position }: { position: [number, number, number] }) {
  const mats = useTemplePBR()
  const bellRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (bellRef.current) {
      const t = state.clock.elapsedTime
      bellRef.current.rotation.z = Math.sin(t * 1.8 + position[0]) * 0.08
    }
  })

  return (
    <group ref={bellRef} position={position}>
      {/* Brass Chain */}
      <mesh position={[0, -0.4, 0]} material={mats.brassAura}>
        <cylinderGeometry args={[0.018, 0.018, 0.85, 8]} />
      </mesh>
      {/* Resonant Bell Body */}
      <mesh position={[0, -0.95, 0]} material={mats.goldRoyal} castShadow>
        <cylinderGeometry args={[0.1, 0.22, 0.32, 18]} />
      </mesh>
      {/* Clapper / Tongue */}
      <mesh position={[0, -1.14, 0]} material={mats.goldAntique}>
        <sphereGeometry args={[0.05, 10, 10]} />
      </mesh>
    </group>
  )
}

function DiyaLamp({ position }: { position: [number, number, number] }) {
  const mats = useTemplePBR()
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (lightRef.current) {
      const t = state.clock.elapsedTime
      lightRef.current.intensity = 2.2 + Math.sin(t * 8 + position[0] * 3) * 0.4
    }
  })

  return (
    <group position={position}>
      {/* Carved Stone / Brass Pedestal */}
      <mesh material={mats.goldAntique} castShadow>
        <cylinderGeometry args={[0.18, 0.28, 0.45, 16]} />
      </mesh>
      {/* Oil Bowl */}
      <mesh position={[0, 0.26, 0]} material={mats.goldRoyal}>
        <cylinderGeometry args={[0.26, 0.16, 0.12, 16]} />
      </mesh>
      {/* Glowing Sacred Flame */}
      <mesh position={[0, 0.36, 0]} material={mats.diyaFlame}>
        <coneGeometry args={[0.07, 0.2, 12]} />
      </mesh>
      <pointLight
        ref={lightRef}
        position={[0, 0.44, 0]}
        intensity={2.2}
        color="#ff9922"
        distance={4.5}
        decay={2}
      />
    </group>
  )
}

/* =========================================================================
   THE 12 CONNECTED CHAPTER MILESTONES (Continuous 3D Camera Trajectory)
   ========================================================================= */


/* =========================================================================
   PERSISTENT TEMPLE WORLD CANVAS INTERPOLATOR
   ========================================================================= */
function PersistentTempleScene({
  scrollProgress
}: {
  scrollProgress: React.MutableRefObject<number>
}) {
  const { camera, pointer } = useThree()
  const targetVec = useRef(new THREE.Vector3())
  const [currentPose, setCurrentPose] = useState<
    'blessing' | 'namaskar' | 'heroic' | 'seated-meditation' | 'protective'
  >('blessing')
  const [hanumanPos, setHanumanPos] = useState<[number, number, number]>([0, 0, 0])
  const [hanumanScale, setHanumanScale] = useState(1.0)

  const mats = useTemplePBR()

  useFrame((_, delta) => {
    const p = THREE.MathUtils.clamp(scrollProgress.current, 0, 1)

    // Find bounding milestones in the trajectory
    let idx = 0
    for (let i = 0; i < CHAPTER_TRAJECTORY.length - 1; i++) {
      if (p >= CHAPTER_TRAJECTORY[i].scrollFrac && p <= CHAPTER_TRAJECTORY[i + 1].scrollFrac) {
        idx = i
        break
      }
    }

    const cA = CHAPTER_TRAJECTORY[idx]
    const cB = CHAPTER_TRAJECTORY[idx + 1] || CHAPTER_TRAJECTORY[idx]
    const range = cB.scrollFrac - cA.scrollFrac || 1
    const factor = THREE.MathUtils.clamp((p - cA.scrollFrac) / range, 0, 1)
    const smooth = THREE.MathUtils.smoothstep(factor, 0, 1)

    // Base interpolated camera position
    const cx = THREE.MathUtils.lerp(cA.camX, cB.camX, smooth)
    const cy = THREE.MathUtils.lerp(cA.camY, cB.camY, smooth)
    const cz = THREE.MathUtils.lerp(cA.camZ, cB.camZ, smooth)

    // Add subtle, elegant mouse parallax
    const parallaxX = pointer.x * 0.35
    const parallaxY = pointer.y * 0.2

    camera.position.x = THREE.MathUtils.damp(camera.position.x, cx + parallaxX, 3.2, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, cy + parallaxY, 3.2, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, cz, 3.2, delta)

    // Base interpolated camera lookAt target
    const tx = THREE.MathUtils.lerp(cA.targetX, cB.targetX, smooth)
    const ty = THREE.MathUtils.lerp(cA.targetY, cB.targetY, smooth)
    const tz = THREE.MathUtils.lerp(cA.targetZ, cB.targetZ, smooth)

    targetVec.current.set(tx, ty, tz)
    camera.lookAt(targetVec.current)

    // Active state designation for Hanuman
    const active = factor > 0.5 ? cB : cA
    if (active.hanumanPose !== currentPose) {
      setCurrentPose(active.hanumanPose)
    }
    setHanumanPos(active.hanumanPos)
    setHanumanScale(active.hanumanScale)
  })

  return (
    <>
      {/* Warm Sunrise Ivory Atmosphere & Heavenly Mist */}
      <color attach="background" args={['#fbf5eb']} />
      <fog attach="fog" args={['#f6ebd9', 7, 36]} />

      {/* Radiant Sunrise Sun & Warm Sanctuary Ambient Light */}
      <ambientLight intensity={1.1} color="#fff6eb" />
      <directionalLight
        position={[8, 16, 9]}
        intensity={2.6}
        color="#ffe5b0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-4, 3, 2]} intensity={2.8} color="#e87823" />
      <pointLight position={[4, 3, -1]} intensity={3.2} color="#f5c542" />
      <pointLight position={[0, 4, -4]} intensity={2.0} color="#ffbe53" />

      {/* CONTINUOUS REFLECTIVE MARBLE COURTYARD FLOOR */}
      <mesh position={[0, -1.15, -4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[26, 48]} />
        <primitive object={mats.marbleFloor} attach="material" />
      </mesh>

      {/* FLOATING SACRED INCENSE SPARKS */}
      <Float speed={0.5} rotationIntensity={0.02} floatIntensity={0.08}>
        <Sparkles count={75} scale={[14, 8, 28]} size={2.0} speed={0.2} color="#e5b84c" />
      </Float>

      {/* ===================================================================
          TEMPLE ARCHITECTURE: MONUMENTAL ENTRANCE, PILLARS & ARCHES
          =================================================================== */}
      {/* Grand Entrance Gateway (Z = 6 to 12) */}
      <group position={[0, 0, 8]}>
        <MandapaArch position={[0, 0.4, 0]} width={7.2} height={7.4} scale={1.15} />
        <TemplePillar position={[-4.2, 0, 0]} scale={1.1} />
        <TemplePillar position={[4.2, 0, 0]} scale={1.1} />
        <HangingBell position={[-2.4, 3.6, 0]} />
        <HangingBell position={[2.4, 3.6, 0]} />
        <DiyaLamp position={[-2.8, -0.9, 1.2]} />
        <DiyaLamp position={[2.8, -0.9, 1.2]} />
      </group>

      {/* Inner Mandapa Hallway Pillars (Z = 2 to 4) */}
      <group position={[0, 0, 3]}>
        <TemplePillar position={[-3.6, 0, 0]} />
        <TemplePillar position={[3.6, 0, 0]} />
        <HangingBell position={[-2.0, 3.4, 0]} />
        <HangingBell position={[2.0, 3.4, 0]} />
        <DiyaLamp position={[-2.2, -0.9, 0]} />
        <DiyaLamp position={[2.2, -0.9, 0]} />
      </group>

      {/* Central Sanctum Archway (Framing Lord Hanuman at Z = 0) */}
      <group position={[0, 0, -1.6]}>
        <MandapaArch position={[0, 0.6, 0]} width={5.8} height={6.2} />
        <TemplePillar position={[-3.2, 0, 0]} />
        <TemplePillar position={[3.2, 0, 0]} />
        {/* Sacred Diya Lamps flanking the Deity */}
        <DiyaLamp position={[-1.8, -0.9, 0.5]} />
        <DiyaLamp position={[1.8, -0.9, 0.5]} />
      </group>

      {/* Background Classical Carved Wall Screen (Z = -3.5) */}
      <group position={[0, 0.8, -3.5]}>
        <mesh receiveShadow>
          <boxGeometry args={[14, 8, 0.2]} />
          <meshStandardMaterial color="#ebdcc8" roughness={0.8} />
        </mesh>
        {/* Carved stone relief panel lines */}
        {[-4, -2, 0, 2, 4].map((x, i) => (
          <mesh key={i} position={[x, 0, 0.12]}>
            <boxGeometry args={[0.08, 8, 0.05]} />
            <meshStandardMaterial color="#c29235" metalness={0.6} />
          </mesh>
        ))}
      </group>

      {/* ===================================================================
          LIVING 3D LORD HANUMAN MODEL
          Centered, beautifully lit, animated, and persistent
          =================================================================== */}
      <LordHanumanCharacter
        position={hanumanPos}
        scale={hanumanScale}
        pose={currentPose}
        floatAnim={true}
      />
    </>
  )
}

/* =========================================================================
   IMMERSIVE WORLD COMPONENT (FULL-SCREEN PERSISTENT 3D BACKGROUND)
   ========================================================================= */
export default function ImmersiveWorld({
  scrollProgress
}: {
  scrollProgress: React.MutableRefObject<number>
}) {
  const [hasWebGL, setHasWebGL] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setHasWebGL(false)
    } catch {
      setHasWebGL(false)
    }
  }, [])

  if (!hasWebGL) {
    return (
      <div className="immersive-world-bg webgl-fallback" aria-hidden="true">
        <div className="fallback-sunrise-temple" />
      </div>
    )
  }

  return (
    <div className="immersive-world-bg" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.8, 14.0], fov: 40 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
        shadows
      >
        <PersistentTempleScene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}
