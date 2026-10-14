import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export interface CharacterPoseMode {
  posture: 'blessing' | 'namaskar' | 'heroic' | 'seated-meditation' | 'protective'
  focusLevel?: number
}

export function LordHanumanCharacter({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
  pose = 'blessing',
  floatAnim = true,
  lookTarget
}: {
  position?: [number, number, number]
  scale?: number
  pose?: 'blessing' | 'namaskar' | 'heroic' | 'seated-meditation' | 'protective'
  floatAnim?: boolean
  lookTarget?: [number, number, number]
}) {
  const rootRef = useRef<THREE.Group>(null)
  const spineRef = useRef<THREE.Group>(null)
  const neckRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  const gadaRef = useRef<THREE.Group>(null)
  const tailRef = useRef<THREE.Group>(null)
  const haloRef = useRef<THREE.Group>(null)

  // Rich, culturally grounded PBR materials with regal gold, radiant brass, ochre silk & devotional skin
  const mats = useMemo(() => {
    return {
      skin: new THREE.MeshStandardMaterial({
        color: '#c8753e', // Devotional ochre/sindoor warm skin tone
        roughness: 0.45,
        metalness: 0.1,
      }),
      silkSaffron: new THREE.MeshStandardMaterial({
        color: '#e87425',
        roughness: 0.58,
        metalness: 0.12,
      }),
      velvetMaroon: new THREE.MeshStandardMaterial({
        color: '#5c1b24',
        roughness: 0.65,
        metalness: 0.15,
      }),
      goldRoyal: new THREE.MeshStandardMaterial({
        color: '#e2b34a',
        roughness: 0.22,
        metalness: 0.88,
        emissive: '#4a3406',
        emissiveIntensity: 0.18,
      }),
      goldAntique: new THREE.MeshStandardMaterial({
        color: '#c29235',
        roughness: 0.32,
        metalness: 0.82,
      }),
      ivoryStone: new THREE.MeshStandardMaterial({
        color: '#f4ebd9',
        roughness: 0.72,
        metalness: 0.05,
      }),
      sandstoneBase: new THREE.MeshStandardMaterial({
        color: '#d6b88d',
        roughness: 0.85,
        metalness: 0.05,
      }),
      sindoorRed: new THREE.MeshStandardMaterial({
        color: '#bd2b1f',
        roughness: 0.4,
        metalness: 0.05,
      }),
      pearlWhite: new THREE.MeshStandardMaterial({
        color: '#fffbf2',
        roughness: 0.25,
        metalness: 0.35,
      })
    }
  }, [])

  // Skeletal procedural kinematics loop
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    // 1. Natural breathing rhythm
    if (spineRef.current) {
      const breath = Math.sin(t * 1.5) * 0.02
      spineRef.current.position.y = 1.05 + breath
      spineRef.current.rotation.x = Math.sin(t * 1.5) * 0.012
    }

    // 2. Subtle conscious head gaze
    if (headRef.current) {
      if (lookTarget) {
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, lookTarget[0] * 0.2, delta * 3)
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, lookTarget[1] * 0.15, delta * 3)
      } else {
        headRef.current.rotation.y = Math.sin(t * 0.8) * 0.04
        headRef.current.rotation.x = -0.04 + Math.sin(t * 1.1) * 0.02
      }
    }

    // 3. Arched Tail (Maha-Laangula) undulating with life
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(t * 1.2) * 0.07
      tailRef.current.rotation.y = Math.cos(t * 0.9) * 0.05
    }

    // 4. Radiant Prabhavali (Halo) gentle celestial rotation
    if (haloRef.current) {
      haloRef.current.rotation.z = t * 0.12
    }

    // 5. Pose-specific Arm & Gada Kinematics
    if (rightArmRef.current && leftArmRef.current && gadaRef.current) {
      if (pose === 'blessing') {
        // Abhaya Mudra: Right hand raised palm forward, Left hand resting on Gada
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.92 + Math.sin(t * 1.5) * 0.015, delta * 4)
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.32, delta * 4)
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0.12, delta * 4)
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.42, delta * 4)
        gadaRef.current.position.set(-0.85, 0.45, 0.2)
        gadaRef.current.rotation.z = THREE.MathUtils.lerp(gadaRef.current.rotation.z, 0.12 + Math.sin(t * 0.8) * 0.02, delta * 4)
      } else if (pose === 'namaskar') {
        // Anjali Mudra: Both hands joined reverently in front of chest
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.75, delta * 4)
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.25, delta * 4)
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.75, delta * 4)
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.25, delta * 4)
        gadaRef.current.position.set(-0.95, 0.2, -0.1)
        gadaRef.current.rotation.z = 0.25
      } else if (pose === 'heroic') {
        // Heroic Stance: Gada held firmly with right hand resting on hip, gazing forward
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.35, delta * 4)
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.52, delta * 4)
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.85, delta * 4)
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.2, delta * 4)
        gadaRef.current.position.set(-0.7, 0.6, 0.3)
        gadaRef.current.rotation.z = -0.15
      } else {
        // Protective Guardian posture
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.4, delta * 4)
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.2, delta * 4)
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0.15, delta * 4)
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.35, delta * 4)
      }
    }

    // Optional gentle levitation/sacred pedestal sway
    if (floatAnim && rootRef.current) {
      rootRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.035
    }
  })

  return (
    <group ref={rootRef} position={position} scale={scale}>
      {/* ===================================================================
          1. SACRED MULTI-TIERED LOTUS PEDESTAL (PADMA PEETHA)
          =================================================================== */}
      <group position={[0, -0.4, 0]}>
        {/* Plinth */}
        <mesh position={[0, 0, 0]} material={mats.sandstoneBase} receiveShadow>
          <cylinderGeometry args={[1.55, 1.75, 0.3, 16]} />
        </mesh>
        <mesh position={[0, 0.22, 0]} material={mats.goldAntique}>
          <cylinderGeometry args={[1.42, 1.52, 0.16, 16]} />
        </mesh>
        {/* Tier of sculpted Golden Lotus Petals */}
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = (i / 14) * Math.PI * 2
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 1.35, 0.35, Math.sin(angle) * 1.35]}
              rotation={[0.28, -angle + Math.PI / 2, 0]}
              material={mats.goldRoyal}
            >
              <coneGeometry args={[0.2, 0.38, 4]} />
            </mesh>
          )
        })}
        <mesh position={[0, 0.42, 0]} material={mats.goldRoyal}>
          <cylinderGeometry args={[1.28, 1.35, 0.1, 32]} />
        </mesh>
      </group>

      {/* ===================================================================
          2. LEGS & PLEATED SAFFRON DHOTI
          =================================================================== */}
      <group position={[0, 0, 0]}>
        {/* Left Leg */}
        <group position={[-0.28, 0.4, 0]}>
          <mesh position={[0, 0.3, 0]} material={mats.silkSaffron} castShadow>
            <cylinderGeometry args={[0.22, 0.18, 0.75, 16]} />
          </mesh>
          <mesh position={[0, -0.08, 0.09]} material={mats.goldRoyal}>
            <sphereGeometry args={[0.08, 14, 14]} />
          </mesh>
          <mesh position={[0, -0.4, 0]} material={mats.skin} castShadow>
            <cylinderGeometry args={[0.17, 0.14, 0.7, 16]} />
          </mesh>
          {/* Golden Anklet (Nupura) */}
          <mesh position={[0, -0.68, 0]} material={mats.goldRoyal}>
            <torusGeometry args={[0.15, 0.03, 12, 20]} />
          </mesh>
          {/* Foot */}
          <mesh position={[0, -0.76, 0.06]} material={mats.skin}>
            <boxGeometry args={[0.19, 0.1, 0.32]} />
          </mesh>
        </group>

        {/* Right Leg */}
        <group position={[0.28, 0.4, 0]}>
          <mesh position={[0, 0.3, 0]} material={mats.silkSaffron} castShadow>
            <cylinderGeometry args={[0.22, 0.18, 0.75, 16]} />
          </mesh>
          <mesh position={[0, -0.08, 0.09]} material={mats.goldRoyal}>
            <sphereGeometry args={[0.08, 14, 14]} />
          </mesh>
          <mesh position={[0, -0.4, 0]} material={mats.skin} castShadow>
            <cylinderGeometry args={[0.17, 0.14, 0.7, 16]} />
          </mesh>
          {/* Golden Anklet */}
          <mesh position={[0, -0.68, 0]} material={mats.goldRoyal}>
            <torusGeometry args={[0.15, 0.03, 12, 20]} />
          </mesh>
          {/* Foot */}
          <mesh position={[0, -0.76, 0.06]} material={mats.skin}>
            <boxGeometry args={[0.19, 0.1, 0.32]} />
          </mesh>
        </group>

        {/* Central Velvet Pleated Drape (Patka) */}
        <mesh position={[0, 0.62, 0.18]} material={mats.velvetMaroon} castShadow>
          <boxGeometry args={[0.28, 0.85, 0.1]} />
        </mesh>
        <mesh position={[0, 0.3, 0.2]} material={mats.goldRoyal}>
          <boxGeometry args={[0.24, 0.42, 0.06]} />
        </mesh>
      </group>

      {/* ===================================================================
          3. ARMORED TORSO, MEKHALA (BELT), HARAS & SCARF
          =================================================================== */}
      <group ref={spineRef} position={[0, 1.05, 0]}>
        {/* Jeweled Waist Belt (Mekhala) */}
        <mesh position={[0, -0.22, 0]} material={mats.goldRoyal}>
          <cylinderGeometry args={[0.42, 0.46, 0.14, 24]} />
        </mesh>
        <mesh position={[0, -0.22, 0.38]} material={mats.sindoorRed}>
          <sphereGeometry args={[0.1, 14, 14]} />
        </mesh>

        {/* Broad, heroic chest */}
        <mesh position={[0, 0.22, 0]} material={mats.skin} castShadow>
          <cylinderGeometry args={[0.55, 0.4, 0.95, 24]} />
        </mesh>

        {/* Defined Pectorals */}
        <mesh position={[-0.18, 0.36, 0.18]} material={mats.skin}>
          <sphereGeometry args={[0.2, 16, 16]} />
        </mesh>
        <mesh position={[0.18, 0.36, 0.18]} material={mats.skin}>
          <sphereGeometry args={[0.2, 16, 16]} />
        </mesh>

        {/* Sacred Thread (Yajnopavita / Janeu) */}
        <mesh position={[0.04, 0.18, 0.22]} rotation={[0, 0, 0.75]} material={mats.goldRoyal}>
          <cylinderGeometry args={[0.02, 0.02, 1.25, 10]} />
        </mesh>

        {/* Multi-tier Royal Pearl & Gold Necklaces (Hara) */}
        <mesh position={[0, 0.46, 0.15]} rotation={[Math.PI / 2, 0, 0]} material={mats.goldRoyal}>
          <torusGeometry args={[0.32, 0.045, 12, 28]} />
        </mesh>
        <mesh position={[0, 0.24, 0.26]} material={mats.pearlWhite}>
          <sphereGeometry args={[0.09, 14, 14]} />
        </mesh>

        {/* Royal Scarf (Uttariya) draped gracefully around shoulders */}
        <mesh position={[-0.52, 0.15, 0]} rotation={[0, 0, 0.2]} material={mats.velvetMaroon}>
          <boxGeometry args={[0.16, 0.95, 0.28]} />
        </mesh>
        <mesh position={[0.52, 0.15, 0]} rotation={[0, 0, -0.2]} material={mats.velvetMaroon}>
          <boxGeometry args={[0.16, 0.95, 0.28]} />
        </mesh>

        {/* ===================================================================
            4. ARMS WITH ARMLETS (KEYURA) & BRACELETS (KANKANA)
            =================================================================== */}
        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.62, 0.52, 0]}>
          <mesh material={mats.skin}>
            <sphereGeometry args={[0.18, 14, 14]} />
          </mesh>
          <mesh material={mats.goldRoyal}>
            <torusGeometry args={[0.2, 0.04, 10, 20]} />
          </mesh>
          {/* Bicep */}
          <mesh position={[0, -0.32, 0]} material={mats.skin} castShadow>
            <cylinderGeometry args={[0.15, 0.13, 0.58, 16]} />
          </mesh>
          {/* Forearm */}
          <mesh position={[0, -0.82, 0.15]} rotation={[0.55, 0, 0]} material={mats.skin} castShadow>
            <cylinderGeometry args={[0.13, 0.11, 0.52, 16]} />
          </mesh>
          {/* Golden Bracelet */}
          <mesh position={[0, -1.05, 0.25]} material={mats.goldRoyal}>
            <cylinderGeometry args={[0.14, 0.14, 0.1, 16]} />
          </mesh>
          {/* Hand Palm (Abhaya Blessing Gesture) */}
          <mesh position={[0, -1.18, 0.28]} rotation={[-0.35, 0, 0]} material={mats.skin}>
            <boxGeometry args={[0.16, 0.22, 0.07]} />
          </mesh>
          {/* Sacred Golden Palm Symbol */}
          <mesh position={[0, -1.18, 0.33]} material={mats.goldRoyal}>
            <circleGeometry args={[0.05, 16]} />
          </mesh>
        </group>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.62, 0.52, 0]}>
          <mesh material={mats.skin}>
            <sphereGeometry args={[0.18, 14, 14]} />
          </mesh>
          <mesh material={mats.goldRoyal}>
            <torusGeometry args={[0.2, 0.04, 10, 20]} />
          </mesh>
          <mesh position={[0, -0.32, 0]} material={mats.skin} castShadow>
            <cylinderGeometry args={[0.15, 0.13, 0.58, 16]} />
          </mesh>
          <mesh position={[0, -0.76, 0.06]} material={mats.skin} castShadow>
            <cylinderGeometry args={[0.13, 0.11, 0.52, 16]} />
          </mesh>
          <mesh position={[0, -1.02, 0.08]} material={mats.goldRoyal}>
            <cylinderGeometry args={[0.14, 0.14, 0.08, 16]} />
          </mesh>
          <mesh position={[0, -1.12, 0.1]} material={mats.skin}>
            <sphereGeometry args={[0.11, 14, 14]} />
          </mesh>
        </group>

        {/* ===================================================================
            5. THE GOLDEN GADA (KAUMODAKI-STYLE DEVOTIONAL MACE)
            =================================================================== */}
        <group ref={gadaRef} position={[-0.85, 0.45, 0.2]}>
          {/* Shaft in polished antique gold */}
          <mesh position={[0, 0, 0]} material={mats.goldAntique} castShadow>
            <cylinderGeometry args={[0.065, 0.065, 2.3, 16]} />
          </mesh>
          {/* Ornate Fluted Head */}
          <mesh position={[0, 1.15, 0]} material={mats.goldRoyal} castShadow>
            <sphereGeometry args={[0.38, 24, 24]} />
          </mesh>
          {/* Radial flutes on head */}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2
            return (
              <mesh
                key={i}
                position={[Math.cos(a) * 0.35, 1.15, Math.sin(a) * 0.35]}
                material={mats.goldAntique}
              >
                <cylinderGeometry args={[0.035, 0.035, 0.6, 8]} />
              </mesh>
            )
          })}
          {/* Pointed crest */}
          <mesh position={[0, 1.58, 0]} material={mats.goldRoyal}>
            <coneGeometry args={[0.14, 0.3, 16]} />
          </mesh>
          {/* Pommel */}
          <mesh position={[0, -1.15, 0]} material={mats.goldRoyal}>
            <sphereGeometry args={[0.13, 14, 14]} />
          </mesh>
        </group>

        {/* ===================================================================
            6. HEAD, CROWN (MUKUT), DIVINE FACE & PRABHAVALI (HALO)
            =================================================================== */}
        <group ref={neckRef} position={[0, 0.82, 0.04]}>
          <mesh position={[0, -0.1, 0]} material={mats.skin}>
            <cylinderGeometry args={[0.22, 0.26, 0.2, 16]} />
          </mesh>
          <mesh position={[0, -0.08, 0.04]} material={mats.goldRoyal}>
            <torusGeometry args={[0.24, 0.03, 12, 20]} />
          </mesh>

          {/* Cranium and Devotional Face */}
          <group ref={headRef}>
            <mesh position={[0, 0.16, 0]} material={mats.skin} castShadow>
              <sphereGeometry args={[0.36, 26, 22]} />
            </mesh>
            {/* Hanuman Iconography Jaw Structure */}
            <mesh position={[0, 0.06, 0.22]} material={mats.skin}>
              <sphereGeometry args={[0.24, 18, 16]} />
            </mesh>
            {/* Sacred Sindoor Tilak */}
            <mesh position={[0, 0.28, 0.36]} material={mats.sindoorRed}>
              <boxGeometry args={[0.06, 0.18, 0.02]} />
            </mesh>
            <mesh position={[0, 0.2, 0.37]} material={mats.goldRoyal}>
              <sphereGeometry args={[0.03, 10, 10]} />
            </mesh>

            {/* Radiant Kirita Mukuta (Gopuram-style Spires) */}
            <group position={[0, 0.4, 0]}>
              <mesh position={[0, 0, 0]} material={mats.goldRoyal}>
                <cylinderGeometry args={[0.38, 0.4, 0.15, 24]} />
              </mesh>
              <mesh position={[0, 0.22, 0]} material={mats.goldAntique} castShadow>
                <cylinderGeometry args={[0.28, 0.36, 0.32, 24]} />
              </mesh>
              <mesh position={[0, 0.52, 0]} material={mats.goldRoyal} castShadow>
                <coneGeometry args={[0.24, 0.48, 24]} />
              </mesh>
              <mesh position={[0, 0.82, 0]} material={mats.goldRoyal}>
                <sphereGeometry args={[0.075, 14, 14]} />
              </mesh>
            </group>

            {/* Kundalas (Ear Ornaments) */}
            <mesh position={[-0.38, 0.1, 0]} material={mats.goldRoyal}>
              <torusGeometry args={[0.1, 0.03, 10, 16]} />
            </mesh>
            <mesh position={[0.38, 0.1, 0]} material={mats.goldRoyal}>
              <torusGeometry args={[0.1, 0.03, 10, 16]} />
            </mesh>
          </group>

          {/* Golden Prabhavali (Halo) */}
          <group ref={haloRef} position={[0, 0.32, -0.32]}>
            <mesh material={mats.goldRoyal}>
              <torusGeometry args={[0.92, 0.038, 14, 48]} />
            </mesh>
            {Array.from({ length: 20 }).map((_, i) => {
              const a = (i / 20) * Math.PI * 2
              return (
                <mesh
                  key={i}
                  position={[Math.cos(a) * 1.02, Math.sin(a) * 1.02, 0]}
                  rotation={[0, 0, a + Math.PI / 2]}
                  material={mats.goldRoyal}
                >
                  <coneGeometry args={[0.045, 0.2, 5]} />
                </mesh>
              )
            })}
          </group>
        </group>

        {/* Sacred Tail Arching Behind */}
        <group ref={tailRef} position={[0, 0.45, -0.25]}>
          <mesh material={mats.skin} castShadow>
            <torusGeometry args={[1.15, 0.1, 14, 40, Math.PI * 1.15]} />
          </mesh>
          <mesh position={[0, 1.25, -0.08]} material={mats.goldRoyal}>
            <sphereGeometry args={[0.15, 14, 14]} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
