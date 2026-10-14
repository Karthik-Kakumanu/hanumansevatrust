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

  // Culturally grounded PBR materials with regal gold, radiant brass, ochre silk & devotional skin
  const mats = useMemo(() => {
    return {
      skin: new THREE.MeshStandardMaterial({
        color: '#d4793f', // Devotional ochre/sindoor warm skin tone
        roughness: 0.42,
        metalness: 0.08,
      }),
      silkSaffron: new THREE.MeshStandardMaterial({
        color: '#e87823',
        roughness: 0.55,
        metalness: 0.12,
      }),
      velvetMaroon: new THREE.MeshStandardMaterial({
        color: '#5c1722',
        roughness: 0.65,
        metalness: 0.15,
      }),
      goldRoyal: new THREE.MeshStandardMaterial({
        color: '#e8b84b',
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
        color: '#f6ecdb',
        roughness: 0.72,
        metalness: 0.05,
      }),
      sandstoneBase: new THREE.MeshStandardMaterial({
        color: '#d6b88d',
        roughness: 0.85,
        metalness: 0.05,
      }),
      sindoorRed: new THREE.MeshStandardMaterial({
        color: '#c4281a',
        roughness: 0.35,
        metalness: 0.05,
      }),
      pearlWhite: new THREE.MeshStandardMaterial({
        color: '#fffcf5',
        roughness: 0.22,
        metalness: 0.35,
      }),
      charcoalDark: new THREE.MeshStandardMaterial({
        color: '#1a1412',
        roughness: 0.6,
        metalness: 0.1,
      }),
      gemRuby: new THREE.MeshStandardMaterial({
        color: '#a81329',
        roughness: 0.15,
        metalness: 0.4,
      }),
      gemEmerald: new THREE.MeshStandardMaterial({
        color: '#146e38',
        roughness: 0.15,
        metalness: 0.4,
      })
    }
  }, [])

  // Skeletal procedural kinematics loop
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime

    // 1. Natural breathing rhythm
    if (spineRef.current) {
      const breath = Math.sin(t * 1.5) * 0.015
      spineRef.current.position.y = 0.25 + breath
      spineRef.current.rotation.x = Math.sin(t * 1.5) * 0.01
    }

    // 2. Subtle conscious head gaze
    if (headRef.current) {
      if (lookTarget) {
        headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, lookTarget[0] * 0.2, delta * 3)
        headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, lookTarget[1] * 0.15, delta * 3)
      } else {
        headRef.current.rotation.y = Math.sin(t * 0.8) * 0.035
        headRef.current.rotation.x = -0.02 + Math.sin(t * 1.1) * 0.015
      }
    }

    // 3. Arched Tail (Maha-Laangula) undulating with life
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(t * 1.2) * 0.06
      tailRef.current.rotation.y = Math.cos(t * 0.9) * 0.04
    }

    // 4. Radiant Prabhavali (Halo) gentle celestial rotation
    if (haloRef.current) {
      haloRef.current.rotation.z = t * 0.1
    }

    // 5. Pose-specific Arm & Gada Kinematics
    if (rightArmRef.current && leftArmRef.current && gadaRef.current) {
      if (pose === 'blessing') {
        // Abhaya Mudra: Right hand raised palm forward, Left hand resting on Gada
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.92 + Math.sin(t * 1.5) * 0.012, delta * 4)
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.32, delta * 4)
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0.12, delta * 4)
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.42, delta * 4)
        gadaRef.current.position.set(-0.82, 0.25, 0.2)
        gadaRef.current.rotation.z = THREE.MathUtils.lerp(gadaRef.current.rotation.z, 0.12 + Math.sin(t * 0.8) * 0.02, delta * 4)
      } else if (pose === 'namaskar') {
        // Anjali Mudra: Both hands joined reverently in front of chest
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.75, delta * 4)
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.25, delta * 4)
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.75, delta * 4)
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.25, delta * 4)
        gadaRef.current.position.set(-0.92, 0.05, -0.1)
        gadaRef.current.rotation.z = 0.25
      } else if (pose === 'heroic') {
        // Heroic Stance: Gada held firmly with right hand resting on hip, gazing forward
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.35, delta * 4)
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.52, delta * 4)
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.85, delta * 4)
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.2, delta * 4)
        gadaRef.current.position.set(-0.68, 0.4, 0.25)
        gadaRef.current.rotation.z = -0.15
      } else if (pose === 'seated-meditation') {
        // Meditative dhyana posture
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.3, delta * 4)
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.2, delta * 4)
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.3, delta * 4)
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.2, delta * 4)
        gadaRef.current.position.set(-0.85, 0.1, -0.15)
        gadaRef.current.rotation.z = 0.2
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
      rootRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.025
    }
  })

  return (
    <group ref={rootRef} position={position} scale={scale}>
      {/* ===================================================================
          1. SACRED MULTI-TIERED LOTUS PEDESTAL (PADMA PEETHA)
          Baseline anchored so bottom plinth is at y = -1.15
          =================================================================== */}
      <group position={[0, -1.0, 0]}>
        {/* Tier 1: Sandstone base plinth */}
        <mesh position={[0, -0.12, 0]} material={mats.sandstoneBase} receiveShadow>
          <cylinderGeometry args={[1.5, 1.7, 0.24, 20]} />
        </mesh>
        {/* Tier 2: Antique gold stepped ring */}
        <mesh position={[0, 0.04, 0]} material={mats.goldAntique}>
          <cylinderGeometry args={[1.38, 1.48, 0.14, 20]} />
        </mesh>
        {/* Tier 3: Ring of sculpted Golden Lotus Petals */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 1.3, 0.15, Math.sin(angle) * 1.3]}
              rotation={[0.26, -angle + Math.PI / 2, 0]}
              material={mats.goldRoyal}
            >
              <coneGeometry args={[0.18, 0.32, 4]} />
            </mesh>
          )
        })}
        {/* Upper Lotus Top Disc */}
        <mesh position={[0, 0.22, 0]} material={mats.goldRoyal}>
          <cylinderGeometry args={[1.22, 1.3, 0.08, 32]} />
        </mesh>
      </group>

      {/* ===================================================================
          2. LEGS & PLEATED SAFFRON DHOTI WITH GOLDEN BORDERS
          Feet rest cleanly on pedestal at y = -0.75
          =================================================================== */}
      <group position={[0, -0.75, 0]}>
        {/* Left Leg */}
        <group position={[-0.26, 0.45, 0]}>
          {/* Thigh with pleated saffron dhoti */}
          <mesh position={[0, 0.25, 0]} material={mats.silkSaffron} castShadow>
            <cylinderGeometry args={[0.2, 0.17, 0.65, 16]} />
          </mesh>
          {/* Knee gold ornament */}
          <mesh position={[0, -0.08, 0.08]} material={mats.goldRoyal}>
            <sphereGeometry args={[0.07, 12, 12]} />
          </mesh>
          {/* Calf in ochre skin tone */}
          <mesh position={[0, -0.34, 0]} material={mats.skin} castShadow>
            <cylinderGeometry args={[0.15, 0.13, 0.58, 16]} />
          </mesh>
          {/* Golden Anklet (Nupura) */}
          <mesh position={[0, -0.58, 0]} material={mats.goldRoyal}>
            <torusGeometry args={[0.14, 0.028, 12, 18]} />
          </mesh>
          {/* Foot */}
          <mesh position={[0, -0.66, 0.05]} material={mats.skin}>
            <boxGeometry args={[0.18, 0.09, 0.28]} />
          </mesh>
        </group>

        {/* Right Leg */}
        <group position={[0.26, 0.45, 0]}>
          <mesh position={[0, 0.25, 0]} material={mats.silkSaffron} castShadow>
            <cylinderGeometry args={[0.2, 0.17, 0.65, 16]} />
          </mesh>
          <mesh position={[0, -0.08, 0.08]} material={mats.goldRoyal}>
            <sphereGeometry args={[0.07, 12, 12]} />
          </mesh>
          <mesh position={[0, -0.34, 0]} material={mats.skin} castShadow>
            <cylinderGeometry args={[0.15, 0.13, 0.58, 16]} />
          </mesh>
          {/* Golden Anklet */}
          <mesh position={[0, -0.58, 0]} material={mats.goldRoyal}>
            <torusGeometry args={[0.14, 0.028, 12, 18]} />
          </mesh>
          {/* Foot */}
          <mesh position={[0, -0.66, 0.05]} material={mats.skin}>
            <boxGeometry args={[0.18, 0.09, 0.28]} />
          </mesh>
        </group>

        {/* Central Velvet Pleated Drape (Patka / Kachha) */}
        <mesh position={[0, 0.5, 0.16]} material={mats.velvetMaroon} castShadow>
          <boxGeometry args={[0.26, 0.75, 0.08]} />
        </mesh>
        <mesh position={[0, 0.22, 0.18]} material={mats.goldRoyal}>
          <boxGeometry args={[0.22, 0.36, 0.05]} />
        </mesh>
      </group>

      {/* ===================================================================
          3. ARMORED TORSO, MEKHALA (BELT), HARAS & SCARF
          =================================================================== */}
      <group ref={spineRef} position={[0, 0.25, 0]}>
        {/* Jeweled Waist Belt (Mekhala) */}
        <mesh position={[0, -0.32, 0]} material={mats.goldRoyal}>
          <cylinderGeometry args={[0.38, 0.42, 0.12, 24]} />
        </mesh>
        <mesh position={[0, -0.32, 0.35]} material={mats.gemRuby}>
          <sphereGeometry args={[0.08, 14, 14]} />
        </mesh>

        {/* Broad, heroic chest */}
        <mesh position={[0, 0.08, 0]} material={mats.skin} castShadow>
          <cylinderGeometry args={[0.5, 0.36, 0.85, 24]} />
        </mesh>

        {/* Defined Pectorals */}
        <mesh position={[-0.16, 0.2, 0.16]} material={mats.skin}>
          <sphereGeometry args={[0.18, 16, 16]} />
        </mesh>
        <mesh position={[0.16, 0.2, 0.16]} material={mats.skin}>
          <sphereGeometry args={[0.18, 16, 16]} />
        </mesh>

        {/* Sacred Thread (Yajnopavita / Janeu) */}
        <mesh position={[0.03, 0.06, 0.2]} rotation={[0, 0, 0.75]} material={mats.goldRoyal}>
          <cylinderGeometry args={[0.018, 0.018, 1.15, 10]} />
        </mesh>

        {/* Multi-tier Royal Pearl & Gold Necklaces (Hara) */}
        <mesh position={[0, 0.3, 0.14]} rotation={[Math.PI / 2, 0, 0]} material={mats.goldRoyal}>
          <torusGeometry args={[0.28, 0.04, 12, 28]} />
        </mesh>
        <mesh position={[0, 0.12, 0.24]} material={mats.pearlWhite}>
          <sphereGeometry args={[0.08, 14, 14]} />
        </mesh>

        {/* Royal Scarf (Uttariya) draped gracefully around shoulders */}
        <mesh position={[-0.48, 0.05, 0]} rotation={[0, 0, 0.2]} material={mats.velvetMaroon}>
          <boxGeometry args={[0.14, 0.85, 0.25]} />
        </mesh>
        <mesh position={[0.48, 0.05, 0]} rotation={[0, 0, -0.2]} material={mats.velvetMaroon}>
          <boxGeometry args={[0.14, 0.85, 0.25]} />
        </mesh>

        {/* ===================================================================
            4. ARMS WITH ARMLETS (KEYURA) & BRACELETS (KANKANA)
            =================================================================== */}
        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.56, 0.36, 0]}>
          <mesh material={mats.skin}>
            <sphereGeometry args={[0.16, 14, 14]} />
          </mesh>
          <mesh material={mats.goldRoyal}>
            <torusGeometry args={[0.18, 0.035, 10, 20]} />
          </mesh>
          {/* Bicep */}
          <mesh position={[0, -0.28, 0]} material={mats.skin} castShadow>
            <cylinderGeometry args={[0.14, 0.12, 0.52, 16]} />
          </mesh>
          {/* Forearm */}
          <mesh position={[0, -0.72, 0.13]} rotation={[0.55, 0, 0]} material={mats.skin} castShadow>
            <cylinderGeometry args={[0.12, 0.1, 0.46, 16]} />
          </mesh>
          {/* Golden Bracelet */}
          <mesh position={[0, -0.92, 0.22]} material={mats.goldRoyal}>
            <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
          </mesh>
          {/* Hand Palm (Abhaya Blessing Gesture) */}
          <mesh position={[0, -1.04, 0.25]} rotation={[-0.35, 0, 0]} material={mats.skin}>
            <boxGeometry args={[0.15, 0.2, 0.06]} />
          </mesh>
          {/* Sacred Golden Palm Symbol */}
          <mesh position={[0, -1.04, 0.3]} material={mats.goldRoyal}>
            <circleGeometry args={[0.045, 16]} />
          </mesh>
        </group>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.56, 0.36, 0]}>
          <mesh material={mats.skin}>
            <sphereGeometry args={[0.16, 14, 14]} />
          </mesh>
          <mesh material={mats.goldRoyal}>
            <torusGeometry args={[0.18, 0.035, 10, 20]} />
          </mesh>
          <mesh position={[0, -0.28, 0]} material={mats.skin} castShadow>
            <cylinderGeometry args={[0.14, 0.12, 0.52, 16]} />
          </mesh>
          <mesh position={[0, -0.68, 0.05]} material={mats.skin} castShadow>
            <cylinderGeometry args={[0.12, 0.1, 0.46, 16]} />
          </mesh>
          <mesh position={[0, -0.9, 0.07]} material={mats.goldRoyal}>
            <cylinderGeometry args={[0.12, 0.12, 0.07, 16]} />
          </mesh>
          <mesh position={[0, -1.0, 0.08]} material={mats.skin}>
            <sphereGeometry args={[0.1, 14, 14]} />
          </mesh>
        </group>

        {/* ===================================================================
            5. THE GOLDEN GADA (KAUMODAKI-STYLE DEVOTIONAL MACE)
            =================================================================== */}
        <group ref={gadaRef} position={[-0.82, 0.25, 0.2]}>
          {/* Shaft in polished antique gold */}
          <mesh position={[0, 0, 0]} material={mats.goldAntique} castShadow>
            <cylinderGeometry args={[0.055, 0.055, 2.0, 16]} />
          </mesh>
          {/* Ornate Fluted Head */}
          <mesh position={[0, 1.0, 0]} material={mats.goldRoyal} castShadow>
            <sphereGeometry args={[0.34, 24, 24]} />
          </mesh>
          {/* Radial flutes on head */}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2
            return (
              <mesh
                key={i}
                position={[Math.cos(a) * 0.32, 1.0, Math.sin(a) * 0.32]}
                material={mats.goldAntique}
              >
                <cylinderGeometry args={[0.03, 0.03, 0.52, 8]} />
              </mesh>
            )
          })}
          {/* Pointed crest */}
          <mesh position={[0, 1.38, 0]} material={mats.goldRoyal}>
            <coneGeometry args={[0.12, 0.26, 16]} />
          </mesh>
          {/* Lotus Pommel */}
          <mesh position={[0, -1.0, 0]} material={mats.goldRoyal}>
            <sphereGeometry args={[0.11, 14, 14]} />
          </mesh>
        </group>

        {/* ===================================================================
            6. HEAD, CROWN (MUKUT), DIVINE FACE & PRABHAVALI (HALO)
            =================================================================== */}
        <group ref={neckRef} position={[0, 0.65, 0.03]}>
          {/* Neck with golden collar */}
          <mesh position={[0, -0.08, 0]} material={mats.skin}>
            <cylinderGeometry args={[0.2, 0.24, 0.18, 16]} />
          </mesh>
          <mesh position={[0, -0.06, 0.03]} material={mats.goldRoyal}>
            <torusGeometry args={[0.22, 0.026, 12, 20]} />
          </mesh>

          {/* Cranium and Devotional Face */}
          <group ref={headRef}>
            {/* Main Head Cranium */}
            <mesh position={[0, 0.14, 0]} material={mats.skin} castShadow>
              <sphereGeometry args={[0.32, 26, 22]} />
            </mesh>
            {/* Hanuman Iconography Sculpted Jaw (Hanu) */}
            <mesh position={[0, 0.04, 0.2]} material={mats.skin}>
              <sphereGeometry args={[0.21, 18, 16]} />
            </mesh>
            {/* Compassionate smiling lips */}
            <mesh position={[0, -0.01, 0.32]} rotation={[Math.PI / 2, 0, 0]} material={mats.sindoorRed}>
              <torusGeometry args={[0.07, 0.02, 10, 16, Math.PI * 0.85]} />
            </mesh>

            {/* Kind, compassionate almond eyes */}
            <mesh position={[-0.12, 0.16, 0.29]} material={mats.pearlWhite}>
              <sphereGeometry args={[0.04, 12, 12]} />
            </mesh>
            <mesh position={[-0.12, 0.16, 0.33]} material={mats.charcoalDark}>
              <sphereGeometry args={[0.02, 10, 10]} />
            </mesh>

            <mesh position={[0.12, 0.16, 0.29]} material={mats.pearlWhite}>
              <sphereGeometry args={[0.04, 12, 12]} />
            </mesh>
            <mesh position={[0.12, 0.16, 0.33]} material={mats.charcoalDark}>
              <sphereGeometry args={[0.02, 10, 10]} />
            </mesh>

            {/* Sacred Sindoor Urdhva Pundra Tilak */}
            <mesh position={[0, 0.24, 0.32]} material={mats.sindoorRed}>
              <boxGeometry args={[0.05, 0.16, 0.02]} />
            </mesh>
            {/* Chandan Bindu dot */}
            <mesh position={[0, 0.18, 0.33]} material={mats.goldRoyal}>
              <sphereGeometry args={[0.026, 10, 10]} />
            </mesh>

            {/* Radiant Kirita Mukuta (Gopuram-style Spires) */}
            <group position={[0, 0.34, 0]}>
              <mesh position={[0, 0, 0]} material={mats.goldRoyal}>
                <cylinderGeometry args={[0.34, 0.36, 0.13, 24]} />
              </mesh>
              {/* Mukuta Gemstones */}
              <mesh position={[0, 0, 0.36]} material={mats.gemRuby}>
                <sphereGeometry args={[0.035, 10, 10]} />
              </mesh>
              <mesh position={[-0.2, 0, 0.3]} material={mats.gemEmerald}>
                <sphereGeometry args={[0.03, 10, 10]} />
              </mesh>
              <mesh position={[0.2, 0, 0.3]} material={mats.gemEmerald}>
                <sphereGeometry args={[0.03, 10, 10]} />
              </mesh>

              {/* Second Tier */}
              <mesh position={[0, 0.18, 0]} material={mats.goldAntique} castShadow>
                <cylinderGeometry args={[0.25, 0.32, 0.26, 24]} />
              </mesh>
              {/* Spire Peak */}
              <mesh position={[0, 0.44, 0]} material={mats.goldRoyal} castShadow>
                <coneGeometry args={[0.21, 0.42, 24]} />
              </mesh>
              {/* Kalash Pinnacle Top */}
              <mesh position={[0, 0.7, 0]} material={mats.goldRoyal}>
                <sphereGeometry args={[0.065, 14, 14]} />
              </mesh>
            </group>

            {/* Kundalas (Ear Ornaments) */}
            <mesh position={[-0.34, 0.08, 0]} material={mats.goldRoyal}>
              <torusGeometry args={[0.09, 0.026, 10, 16]} />
            </mesh>
            <mesh position={[0.34, 0.08, 0]} material={mats.goldRoyal}>
              <torusGeometry args={[0.09, 0.026, 10, 16]} />
            </mesh>
          </group>

          {/* Golden Prabhavali (Halo) */}
          <group ref={haloRef} position={[0, 0.28, -0.28]}>
            <mesh material={mats.goldRoyal}>
              <torusGeometry args={[0.82, 0.034, 14, 48]} />
            </mesh>
            {Array.from({ length: 20 }).map((_, i) => {
              const a = (i / 20) * Math.PI * 2
              return (
                <mesh
                  key={i}
                  position={[Math.cos(a) * 0.9, Math.sin(a) * 0.9, 0]}
                  rotation={[0, 0, a + Math.PI / 2]}
                  material={mats.goldRoyal}
                >
                  <coneGeometry args={[0.04, 0.18, 5]} />
                </mesh>
              )
            })}
          </group>
        </group>

        {/* Sacred Tail (Maha-Laangula) Arching Gracefully Behind */}
        <group ref={tailRef} position={[0, 0.35, -0.22]}>
          <mesh material={mats.skin} castShadow>
            <torusGeometry args={[1.05, 0.09, 14, 40, Math.PI * 1.15]} />
          </mesh>
          <mesh position={[0, 1.15, -0.07]} material={mats.goldRoyal}>
            <sphereGeometry args={[0.13, 14, 14]} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
