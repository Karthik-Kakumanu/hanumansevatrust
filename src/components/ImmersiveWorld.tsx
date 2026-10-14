import { useEffect, useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'

// Materials cache for high performance
interface SacredMaterials {
  goldAntique: THREE.MeshStandardMaterial
  goldBright: THREE.MeshStandardMaterial
  maroonVelvet: THREE.MeshStandardMaterial
  saffronCloth: THREE.MeshStandardMaterial
  stoneCarved: THREE.MeshStandardMaterial
  stoneDark: THREE.MeshStandardMaterial
  skinDevotional: THREE.MeshStandardMaterial
  brassAura: THREE.MeshStandardMaterial
  diyaFlame: THREE.MeshBasicMaterial
}

function useSacredMaterials(): SacredMaterials {
  return useMemo(() => ({
    goldAntique: new THREE.MeshStandardMaterial({
      color: '#d4af37',
      roughness: 0.28,
      metalness: 0.85,
      bumpScale: 0.05
    }),
    goldBright: new THREE.MeshStandardMaterial({
      color: '#f5c542',
      roughness: 0.18,
      metalness: 0.92,
      emissive: '#664408',
      emissiveIntensity: 0.25
    }),
    maroonVelvet: new THREE.MeshStandardMaterial({
      color: '#4a121a',
      roughness: 0.72,
      metalness: 0.12
    }),
    saffronCloth: new THREE.MeshStandardMaterial({
      color: '#e66012',
      roughness: 0.65,
      metalness: 0.08
    }),
    stoneCarved: new THREE.MeshStandardMaterial({
      color: '#381f1d',
      roughness: 0.82,
      metalness: 0.15
    }),
    stoneDark: new THREE.MeshStandardMaterial({
      color: '#1a0e10',
      roughness: 0.35,
      metalness: 0.42
    }),
    skinDevotional: new THREE.MeshStandardMaterial({
      color: '#c97a44',
      roughness: 0.52,
      metalness: 0.12
    }),
    brassAura: new THREE.MeshStandardMaterial({
      color: '#e2b34a',
      roughness: 0.22,
      metalness: 0.88
    }),
    diyaFlame: new THREE.MeshBasicMaterial({
      color: '#ffaa33'
    })
  }), [])
}

/* =========================================================================
   HIGH-FIDELITY DEVOTIONAL HANUMAN 3D FIGURE
   Sculpted with authentic iconography: Mukut, Kundals, Tilak, Uttariya,
   Dhoti, sacred Angada/Kankana ornaments, tail arch, and golden Gada.
   Rigged with procedural skeletal kinematics across scroll milestones.
   ========================================================================= */
export function LordHanumanFigure({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
  chapter = 'sanctum',
  scrollProgress = 0
}: {
  position?: [number, number, number]
  scale?: number
  chapter?: string
  scrollProgress?: number
}) {
  const rootRef = useRef<THREE.Group>(null)
  const spineRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  const rightArmRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Group>(null)
  const gadaRef = useRef<THREE.Group>(null)
  const tailRef = useRef<THREE.Group>(null)
  const haloRef = useRef<THREE.Group>(null)

  const mats = useSacredMaterials()

  // Procedural skeletal animation loop: breathing, mudra posture, blessing & gada sway
  useFrame((state) => {
    const t = state.clock.elapsedTime

    // 1. Dignified breathing cycle influenced by scroll progression
    if (spineRef.current) {
      spineRef.current.position.y = 1.35 + Math.sin(t * 1.4 + scrollProgress) * 0.02
      spineRef.current.rotation.x = Math.sin(t * 1.4) * 0.015
    }

    // 2. Gentle head gaze responsive to camera/subtle life & scroll
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.7 + scrollProgress * 2) * 0.05
      headRef.current.rotation.x = -0.04 + Math.sin(t * 0.9) * 0.02
    }

    // 3. Tail gentle divine wave
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(t * 1.2) * 0.06
      tailRef.current.rotation.y = Math.cos(t * 0.8) * 0.04
    }

    // 4. Chapter-specific pose choreography
    if (rightArmRef.current && leftArmRef.current && gadaRef.current) {
      if (chapter === 'sanctum' || chapter === 'entrance') {
        // Abhaya Mudra (Blessing Right Hand) & Resting Golden Gada (Left Hand)
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.85 + Math.sin(t * 1.4) * 0.02, 0.08)
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.35, 0.08)
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0.15, 0.08)
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.45, 0.08)
        gadaRef.current.rotation.z = THREE.MathUtils.lerp(gadaRef.current.rotation.z, 0.12 + Math.sin(t * 0.6) * 0.02, 0.08)
      } else if (chapter === 'seva' || chapter === 'annadaan') {
        // Anjali/Namaskar devotional welcoming stance
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.65, 0.08)
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.22, 0.08)
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.65, 0.08)
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.22, 0.08)
      } else if (chapter === 'knowledge' || chapter === 'events') {
        // Heroic posture holding sacred Sanjeevani essence / Gada raised
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.45, 0.08)
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.5, 0.08)
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.95, 0.08)
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.25, 0.08)
      } else {
        // Serene standing guardian pose
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.3, 0.08)
        rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.2, 0.08)
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0.1, 0.08)
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.3, 0.08)
      }
    }

    // 5. Divine Halo rotation
    if (haloRef.current) {
      haloRef.current.rotation.z = t * 0.15
    }
  })

  return (
    <group ref={rootRef} position={position} scale={scale}>
      {/* 1. MAJESTIC LOTUS PEDESTAL (PADMA PEETHA) */}
      <group position={[0, -0.65, 0]}>
        {/* Tiered octagonal stone & gold base */}
        <mesh position={[0, 0, 0]} material={mats.stoneDark} receiveShadow>
          <cylinderGeometry args={[1.65, 1.85, 0.35, 16]} />
        </mesh>
        <mesh position={[0, 0.25, 0]} material={mats.goldAntique} castShadow>
          <cylinderGeometry args={[1.5, 1.6, 0.18, 16]} />
        </mesh>
        {/* Sculpted golden lotus petals encircling base */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 1.45, 0.38, Math.sin(angle) * 1.45]}
              rotation={[0.3, -angle + Math.PI / 2, 0]}
              material={mats.goldBright}
            >
              <coneGeometry args={[0.22, 0.45, 4]} />
            </mesh>
          )
        })}
        <mesh position={[0, 0.45, 0]} material={mats.goldBright}>
          <cylinderGeometry args={[1.35, 1.42, 0.12, 32]} />
        </mesh>
      </group>

      {/* 2. LEGS & ROYAL SILK DHOTI */}
      <group position={[0, 0, 0]}>
        {/* Left Leg */}
        <group position={[-0.32, 0.45, 0]}>
          {/* Thigh with saffron pleated silk */}
          <mesh position={[0, 0.35, 0]} material={mats.saffronCloth} castShadow>
            <cylinderGeometry args={[0.26, 0.22, 0.85, 16]} />
          </mesh>
          {/* Golden knee ornament */}
          <mesh position={[0, -0.08, 0.12]} material={mats.goldAntique}>
            <sphereGeometry args={[0.1, 16, 16]} />
          </mesh>
          {/* Calf with golden anklet */}
          <mesh position={[0, -0.45, 0]} material={mats.skinDevotional} castShadow>
            <cylinderGeometry args={[0.2, 0.16, 0.8, 16]} />
          </mesh>
          {/* Anklet (Nupura) */}
          <mesh position={[0, -0.75, 0]} material={mats.goldBright}>
            <torusGeometry args={[0.17, 0.035, 12, 24]} />
          </mesh>
          {/* Foot */}
          <mesh position={[0, -0.85, 0.08]} material={mats.skinDevotional}>
            <boxGeometry args={[0.22, 0.12, 0.38]} />
          </mesh>
        </group>

        {/* Right Leg */}
        <group position={[0.32, 0.45, 0]}>
          <mesh position={[0, 0.35, 0]} material={mats.saffronCloth} castShadow>
            <cylinderGeometry args={[0.26, 0.22, 0.85, 16]} />
          </mesh>
          <mesh position={[0, -0.08, 0.12]} material={mats.goldAntique}>
            <sphereGeometry args={[0.1, 16, 16]} />
          </mesh>
          <mesh position={[0, -0.45, 0]} material={mats.skinDevotional} castShadow>
            <cylinderGeometry args={[0.2, 0.16, 0.8, 16]} />
          </mesh>
          <mesh position={[0, -0.75, 0]} material={mats.goldBright}>
            <torusGeometry args={[0.17, 0.035, 12, 24]} />
          </mesh>
          <mesh position={[0, -0.85, 0.08]} material={mats.skinDevotional}>
            <boxGeometry args={[0.22, 0.12, 0.38]} />
          </mesh>
        </group>

        {/* Central pleated dhoti drape (Kachha / Patka) */}
        <mesh position={[0, 0.7, 0.22]} material={mats.maroonVelvet} castShadow>
          <boxGeometry args={[0.34, 0.95, 0.14]} />
        </mesh>
        <mesh position={[0, 0.35, 0.24]} material={mats.goldBright}>
          <boxGeometry args={[0.28, 0.5, 0.08]} />
        </mesh>
      </group>

      {/* 3. SACRED TAIL (MAHA-LAAŃGULA) ARCHING BEHIND */}
      <group ref={tailRef} position={[0, 0.65, -0.3]}>
        {/* Curved tubular tail sweeping upwards elegantly */}
        <mesh material={mats.skinDevotional} castShadow>
          <torusGeometry args={[1.35, 0.12, 16, 48, Math.PI * 1.15]} />
        </mesh>
        {/* Tail tuft with small golden bell at tip */}
        <mesh position={[0, 1.45, -0.1]} material={mats.goldBright}>
          <sphereGeometry args={[0.18, 16, 16]} />
        </mesh>
      </group>

      {/* 4. TORSO, SACRED THREAD & ROYAL ORNAMENTS */}
      <group ref={spineRef} position={[0, 1.35, 0]}>
        {/* Golden Jeweled Waist Belt (Kati Sutra / Mekhala) */}
        <mesh position={[0, -0.3, 0]} material={mats.goldBright}>
          <cylinderGeometry args={[0.48, 0.52, 0.18, 24]} />
        </mesh>
        <mesh position={[0, -0.3, 0.44]} material={mats.maroonVelvet}>
          <sphereGeometry args={[0.14, 16, 16]} />
        </mesh>

        {/* Muscular, heroic chest and torso (Vakshasthala) */}
        <mesh position={[0, 0.25, 0]} material={mats.skinDevotional} castShadow>
          <cylinderGeometry args={[0.62, 0.45, 1.05, 24]} />
        </mesh>

        {/* Chest pectoral musculature */}
        <mesh position={[-0.22, 0.42, 0.22]} material={mats.skinDevotional}>
          <sphereGeometry args={[0.24, 18, 16]} />
        </mesh>
        <mesh position={[0.22, 0.42, 0.22]} material={mats.skinDevotional}>
          <sphereGeometry args={[0.24, 18, 16]} />
        </mesh>

        {/* Sacred Thread (Yajnopavita / Janeu) passing diagonally */}
        <mesh position={[0.05, 0.22, 0.26]} rotation={[0, 0, 0.72]} material={mats.goldBright}>
          <cylinderGeometry args={[0.025, 0.025, 1.35, 12]} />
        </mesh>

        {/* Ornate Golden Chest Garland & Royal Necklace (Kantha Mala & Hara) */}
        <mesh position={[0, 0.55, 0.18]} rotation={[Math.PI / 2, 0, 0]} material={mats.goldBright}>
          <torusGeometry args={[0.38, 0.055, 12, 32]} />
        </mesh>
        <mesh position={[0, 0.28, 0.32]} material={mats.maroonVelvet}>
          <cylinderGeometry args={[0.12, 0.12, 0.06, 16]} />
        </mesh>
        {/* Deep maroon royal scarf (Uttariya) draped across shoulders */}
        <mesh position={[-0.58, 0.2, 0]} rotation={[0, 0, 0.2]} material={mats.maroonVelvet}>
          <boxGeometry args={[0.18, 1.1, 0.32]} />
        </mesh>
        <mesh position={[0.58, 0.2, 0]} rotation={[0, 0, -0.2]} material={mats.maroonVelvet}>
          <boxGeometry args={[0.18, 1.1, 0.32]} />
        </mesh>

        {/* 5. RIGHT ARM WITH ABHAYA MUDRA (BLESSING) */}
        <group ref={rightArmRef} position={[0.68, 0.62, 0]}>
          {/* Shoulder with golden Keyura (Armlet) */}
          <mesh material={mats.skinDevotional}>
            <sphereGeometry args={[0.22, 16, 16]} />
          </mesh>
          <mesh material={mats.goldBright}>
            <torusGeometry args={[0.24, 0.045, 12, 24]} />
          </mesh>
          {/* Upper Arm */}
          <mesh position={[0, -0.38, 0]} material={mats.skinDevotional} castShadow>
            <cylinderGeometry args={[0.17, 0.15, 0.65, 16]} />
          </mesh>
          {/* Elbow ornament */}
          <mesh position={[0, -0.7, 0]} material={mats.goldAntique}>
            <sphereGeometry args={[0.14, 16, 16]} />
          </mesh>
          {/* Forearm angled upward in Abhaya Mudra */}
          <mesh position={[0, -0.95, 0.2]} rotation={[0.6, 0, 0]} material={mats.skinDevotional} castShadow>
            <cylinderGeometry args={[0.15, 0.13, 0.6, 16]} />
          </mesh>
          {/* Golden Wrist Bracelets (Kankana) */}
          <mesh position={[0, -1.2, 0.32]} material={mats.goldBright}>
            <cylinderGeometry args={[0.16, 0.16, 0.12, 16]} />
          </mesh>
          {/* Hand raised in blessing gesture */}
          <mesh position={[0, -1.35, 0.36]} rotation={[-0.4, 0, 0]} material={mats.skinDevotional}>
            <boxGeometry args={[0.18, 0.24, 0.08]} />
          </mesh>
          {/* Divine Palm radiance emblem */}
          <mesh position={[0, -1.35, 0.41]} material={mats.goldBright}>
            <circleGeometry args={[0.06, 16]} />
          </mesh>
        </group>

        {/* 6. LEFT ARM RESTING ON MIGHTY GOLDEN GADA */}
        <group ref={leftArmRef} position={[-0.68, 0.62, 0]}>
          {/* Shoulder with golden armlet */}
          <mesh material={mats.skinDevotional}>
            <sphereGeometry args={[0.22, 16, 16]} />
          </mesh>
          <mesh material={mats.goldBright}>
            <torusGeometry args={[0.24, 0.045, 12, 24]} />
          </mesh>
          {/* Upper Arm */}
          <mesh position={[0, -0.38, 0]} material={mats.skinDevotional} castShadow>
            <cylinderGeometry args={[0.17, 0.15, 0.65, 16]} />
          </mesh>
          {/* Forearm resting naturally on the Gada shaft */}
          <mesh position={[0, -0.85, 0.08]} material={mats.skinDevotional} castShadow>
            <cylinderGeometry args={[0.15, 0.13, 0.6, 16]} />
          </mesh>
          <mesh position={[0, -1.15, 0.1]} material={mats.goldBright}>
            <cylinderGeometry args={[0.16, 0.16, 0.1, 16]} />
          </mesh>
          {/* Hand grasping Gada */}
          <mesh position={[0, -1.26, 0.12]} material={mats.skinDevotional}>
            <sphereGeometry args={[0.12, 16, 16]} />
          </mesh>
        </group>

        {/* 7. THE LEGENDARY GOLDEN GADA (KAUMODAKI STYLE DEVOTIONAL MACE) */}
        <group ref={gadaRef} position={[-0.85, -0.4, 0.25]}>
          {/* Shaft in polished antique gold */}
          <mesh position={[0, 0.8, 0]} material={mats.goldAntique} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 2.6, 16]} />
          </mesh>
          {/* Ornate fluted mace head */}
          <mesh position={[0, 2.05, 0]} material={mats.goldBright} castShadow>
            <sphereGeometry args={[0.42, 24, 24]} />
          </mesh>
          {/* Fluted ribs on mace head */}
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2
            return (
              <mesh
                key={i}
                position={[Math.cos(a) * 0.4, 2.05, Math.sin(a) * 0.4]}
                material={mats.goldAntique}
              >
                <cylinderGeometry args={[0.04, 0.04, 0.68, 8]} />
              </mesh>
            )
          })}
          {/* Pointed crest of the Gada */}
          <mesh position={[0, 2.52, 0]} material={mats.goldBright}>
            <coneGeometry args={[0.16, 0.35, 16]} />
          </mesh>
          {/* Bottom pommel */}
          <mesh position={[0, -0.48, 0]} material={mats.goldBright}>
            <sphereGeometry args={[0.16, 16, 16]} />
          </mesh>
        </group>

        {/* 8. MAJESTIC HEAD, MUKUT (CROWN) & DIVINE FACE */}
        <group ref={headRef} position={[0, 0.95, 0.05]}>
          {/* Neck with golden choker */}
          <mesh position={[0, -0.15, 0]} material={mats.skinDevotional}>
            <cylinderGeometry args={[0.26, 0.3, 0.25, 20]} />
          </mesh>
          <mesh position={[0, -0.12, 0.05]} material={mats.goldBright}>
            <torusGeometry args={[0.28, 0.035, 12, 24]} />
          </mesh>

          {/* Cranium and face structure */}
          <mesh position={[0, 0.18, 0]} material={mats.skinDevotional} castShadow>
            <sphereGeometry args={[0.42, 28, 24]} />
          </mesh>

          {/* Reverent devotion jaw and prominent lower face (Hanuman iconography) */}
          <mesh position={[0, 0.06, 0.25]} material={mats.skinDevotional}>
            <sphereGeometry args={[0.28, 20, 16]} />
          </mesh>

          {/* Calming spiritual expression - Eyes and Brow */}
          {/* Sacred Vermilion Tilak (Sindoor Urdhva Pundra) */}
          <mesh position={[0, 0.32, 0.42]} material={mats.saffronCloth}>
            <boxGeometry args={[0.07, 0.22, 0.02]} />
          </mesh>
          <mesh position={[0, 0.24, 0.43]} material={mats.goldBright}>
            <sphereGeometry args={[0.035, 12, 12]} />
          </mesh>

          {/* Radiant Crown (Kirita Mukuta) */}
          <group position={[0, 0.45, 0]}>
            {/* Crown Base Rim */}
            <mesh position={[0, 0, 0]} material={mats.goldBright}>
              <cylinderGeometry args={[0.44, 0.46, 0.18, 24]} />
            </mesh>
            {/* Tiered conical Gopuram-style spires */}
            <mesh position={[0, 0.26, 0]} material={mats.goldAntique} castShadow>
              <cylinderGeometry args={[0.32, 0.42, 0.38, 24]} />
            </mesh>
            <mesh position={[0, 0.6, 0]} material={mats.goldBright} castShadow>
              <coneGeometry args={[0.28, 0.55, 24]} />
            </mesh>
            {/* Sacred finial jewel (Kalasam) */}
            <mesh position={[0, 0.95, 0]} material={mats.goldBright}>
              <sphereGeometry args={[0.09, 16, 16]} />
            </mesh>
          </group>

          {/* Kundalas (Golden Ear Ornaments) */}
          <mesh position={[-0.44, 0.12, 0]} material={mats.goldBright}>
            <torusGeometry args={[0.12, 0.035, 12, 18]} />
          </mesh>
          <mesh position={[0.44, 0.12, 0]} material={mats.goldBright}>
            <torusGeometry args={[0.12, 0.035, 12, 18]} />
          </mesh>
        </group>

        {/* 9. RADIANT GOLDEN HALO (PRABHAVALI / PRABHAMANDALA) */}
        <group ref={haloRef} position={[0, 1.25, -0.38]}>
          <mesh material={mats.goldBright}>
            <torusGeometry args={[1.05, 0.045, 16, 64]} />
          </mesh>
          <mesh material={mats.goldAntique}>
            <torusGeometry args={[0.88, 0.03, 16, 48]} />
          </mesh>
          {/* Radiant rays emanating from divine halo */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI * 2
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * 1.18, Math.sin(angle) * 1.18, 0]}
                rotation={[0, 0, angle + Math.PI / 2]}
                material={mats.goldBright}
              >
                <coneGeometry args={[0.05, 0.24, 6]} />
              </mesh>
            )
          })}
        </group>
      </group>
    </group>
  )
}

/* =========================================================================
   AUTHENTIC TEMPLE ARCHITECTURAL WORLD (THREE.JS CONNECTED SCENE)
   Carved pillars, mandapa arches, flickering diyas, hanging brass bells,
   offering vessels, scriptures, and stone corridors.
   ========================================================================= */

function TemplePillar({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const mats = useSacredMaterials()
  return (
    <group position={position} scale={scale}>
      {/* Heavy square plinth */}
      <mesh position={[0, -2.2, 0]} material={mats.stoneDark} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.5, 1.2]} />
      </mesh>
      {/* Octagonal transition */}
      <mesh position={[0, -1.8, 0]} material={mats.stoneCarved}>
        <cylinderGeometry args={[0.55, 0.72, 0.4, 8]} />
      </mesh>
      {/* Fluted shaft */}
      <mesh position={[0, 0.2, 0]} material={mats.stoneCarved} castShadow>
        <cylinderGeometry args={[0.48, 0.55, 3.6, 16]} />
      </mesh>
      {/* Carved bell capital (Kalasam) */}
      <mesh position={[0, 2.15, 0]} material={mats.goldAntique}>
        <cylinderGeometry args={[0.75, 0.52, 0.35, 16]} />
      </mesh>
      {/* Bracket capital top */}
      <mesh position={[0, 2.45, 0]} material={mats.stoneDark}>
        <boxGeometry args={[1.3, 0.28, 1.3]} />
      </mesh>
    </group>
  )
}

function MandapaArch({
  position,
  width = 5.2,
  height = 5.8,
  scale = 1
}: {
  position: [number, number, number]
  width?: number
  height?: number
  scale?: number
}) {
  const mats = useSacredMaterials()
  const half = width / 2
  return (
    <group position={position} scale={scale}>
      {/* Left and right stone posts */}
      <mesh position={[-half, 0, 0]} material={mats.stoneCarved} castShadow>
        <boxGeometry args={[0.42, height, 0.45]} />
      </mesh>
      <mesh position={[half, 0, 0]} material={mats.stoneCarved} castShadow>
        <boxGeometry args={[0.42, height, 0.45]} />
      </mesh>
      {/* Ornamental Cusped Arch (Kudu / Torana) */}
      <mesh position={[0, height / 2 - 0.2, 0]} material={mats.goldAntique}>
        <torusGeometry args={[half - 0.2, 0.16, 12, 48, Math.PI]} />
      </mesh>
      {/* Ornate arch lintel */}
      <mesh position={[0, height / 2 + 0.35, 0]} material={mats.stoneCarved}>
        <boxGeometry args={[width + 0.8, 0.4, 0.55]} />
      </mesh>
      <mesh position={[0, height / 2 + 0.65, 0]} material={mats.goldBright}>
        <coneGeometry args={[0.3, 0.5, 8]} />
      </mesh>
    </group>
  )
}

function HangingBell({ position }: { position: [number, number, number] }) {
  const mats = useSacredMaterials()
  const bellRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (bellRef.current) {
      bellRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.8 + position[0]) * 0.08
    }
  })

  return (
    <group ref={bellRef} position={position}>
      {/* Brass chain */}
      <mesh position={[0, 0.8, 0]} material={mats.goldAntique}>
        <cylinderGeometry args={[0.02, 0.02, 1.6, 8]} />
      </mesh>
      {/* Brass temple bell body */}
      <mesh position={[0, -0.1, 0]} material={mats.brassAura} castShadow>
        <cylinderGeometry args={[0.12, 0.32, 0.42, 24]} />
      </mesh>
      <mesh position={[0, -0.32, 0]} material={mats.goldBright}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>
    </group>
  )
}

function DiyaLamp({ position }: { position: [number, number, number] }) {
  const mats = useSacredMaterials()
  const flameRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (flameRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 9 + position[0] * 3) * 0.18
      flameRef.current.scale.set(s, s * 1.2, s)
    }
  })

  return (
    <group position={position}>
      {/* Brass lamp cup */}
      <mesh material={mats.goldAntique}>
        <cylinderGeometry args={[0.22, 0.12, 0.14, 16]} />
      </mesh>
      {/* Flickering oil flame */}
      <mesh ref={flameRef} position={[0, 0.16, 0]} material={mats.diyaFlame}>
        <coneGeometry args={[0.08, 0.22, 12]} />
      </mesh>
      {/* Warm point light */}
      <pointLight position={[0, 0.25, 0]} color="#ff9922" intensity={1.8} distance={4.5} />
    </group>
  )
}

/* =========================================================================
   SCROLL CAMERA CHOREOGRAPHY ACROSS THE 10 SACRED CHAPTERS
   Smoothly interpolates camera position, lookAt target, and lighting
   as the visitor scrolls down the continuous single-page portal.
   ========================================================================= */

interface ChapterMilestone {
  z: number
  camX: number
  camY: number
  camZ: number
  targetX: number
  targetY: number
  targetZ: number
  hanumanPos: [number, number, number]
  hanumanScale: number
  chapterName: string
}

const CHAPTERS: ChapterMilestone[] = [
  // 1. Entrance Reveal (#home)
  {
    z: 0,
    camX: 0,
    camY: 2.4,
    camZ: 9.5,
    targetX: 0,
    targetY: 2.1,
    targetZ: 1.0,
    hanumanPos: [0, 0.8, -0.5],
    hanumanScale: 1.08,
    chapterName: 'entrance'
  },
  // 2. Lord Hanuman's Sanctum (#home middle)
  {
    z: 0.12,
    camX: 0.8,
    camY: 2.2,
    camZ: 3.8,
    targetX: -0.2,
    targetY: 2.0,
    targetZ: -0.5,
    hanumanPos: [0, 0.8, -0.5],
    hanumanScale: 1.15,
    chapterName: 'sanctum'
  },
  // 3. Hall of Selfless Service (#our-story)
  {
    z: 0.25,
    camX: -1.2,
    camY: 2.1,
    camZ: -5.2,
    targetX: 0.6,
    targetY: 1.8,
    targetZ: -10.0,
    hanumanPos: [1.2, 0.6, -9.5],
    hanumanScale: 0.95,
    chapterName: 'story'
  },
  // 4. Seva Courtyard (#seva)
  {
    z: 0.38,
    camX: 1.4,
    camY: 2.3,
    camZ: -14.2,
    targetX: -0.5,
    targetY: 1.8,
    targetZ: -20.0,
    hanumanPos: [-1.4, 0.6, -18.5],
    hanumanScale: 0.92,
    chapterName: 'seva'
  },
  // 5. Annadaan Hall (#annadaan)
  {
    z: 0.52,
    camX: -0.9,
    camY: 2.0,
    camZ: -23.5,
    targetX: 0.8,
    targetY: 1.8,
    targetZ: -29.0,
    hanumanPos: [1.3, 0.6, -28.0],
    hanumanScale: 0.95,
    chapterName: 'annadaan'
  },
  // 6. Sacred Knowledge Chamber (#dharma)
  {
    z: 0.64,
    camX: 1.1,
    camY: 2.2,
    camZ: -32.5,
    targetX: -0.4,
    targetY: 1.8,
    targetZ: -38.0,
    hanumanPos: [-1.1, 0.6, -37.5],
    hanumanScale: 0.92,
    chapterName: 'knowledge'
  },
  // 7. Festival & Gallery Corridor (#gallery)
  {
    z: 0.76,
    camX: -0.8,
    camY: 2.3,
    camZ: -41.5,
    targetX: 0.5,
    targetY: 1.8,
    targetZ: -48.0,
    hanumanPos: [1.4, 0.6, -46.5],
    hanumanScale: 0.92,
    chapterName: 'gallery'
  },
  // 8. Events Courtyard (#events)
  {
    z: 0.86,
    camX: 0.9,
    camY: 2.1,
    camZ: -50.5,
    targetX: -0.5,
    targetY: 1.8,
    targetZ: -56.0,
    hanumanPos: [-1.2, 0.6, -55.0],
    hanumanScale: 0.9,
    chapterName: 'events'
  },
  // 9. Donation Sanctum (#donation)
  {
    z: 0.94,
    camX: -0.7,
    camY: 2.2,
    camZ: -59.5,
    targetX: 0.4,
    targetY: 1.9,
    targetZ: -65.0,
    hanumanPos: [1.1, 0.8, -64.0],
    hanumanScale: 1.05,
    chapterName: 'donation'
  },
  // 10. Concluding Courtyard (#contact)
  {
    z: 1.0,
    camX: 0,
    camY: 2.4,
    camZ: -68.0,
    targetX: 0,
    targetY: 2.0,
    targetZ: -73.0,
    hanumanPos: [0, 0.8, -72.0],
    hanumanScale: 1.08,
    chapterName: 'final'
  }
]

function PersistentTempleWorld({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera } = useThree()
  const targetVec = useRef(new THREE.Vector3())
  const [currentChapter, setCurrentChapter] = useState('entrance')
  const [hanumanState, setHanumanState] = useState({
    pos: [0, 0.8, -0.5] as [number, number, number],
    scale: 1.08
  })

  const mats = useSacredMaterials()

  // Frame update: interpolate camera & manage active Hanuman instance
  useFrame((_, delta) => {
    const p = THREE.MathUtils.clamp(scrollProgress.current, 0, 1)

    // Find bounding milestones
    let idx = 0
    for (let i = 0; i < CHAPTERS.length - 1; i++) {
      if (p >= CHAPTERS[i].z && p <= CHAPTERS[i + 1].z) {
        idx = i
        break
      }
    }
    const cA = CHAPTERS[idx]
    const cB = CHAPTERS[idx + 1] || CHAPTERS[idx]
    const range = cB.z - cA.z || 1
    const factor = THREE.MathUtils.clamp((p - cA.z) / range, 0, 1)
    const smooth = THREE.MathUtils.smoothstep(factor, 0, 1)

    // Interpolate camera position
    const cx = THREE.MathUtils.lerp(cA.camX, cB.camX, smooth)
    const cy = THREE.MathUtils.lerp(cA.camY, cB.camY, smooth)
    const cz = THREE.MathUtils.lerp(cA.camZ, cB.camZ, smooth)

    camera.position.x = THREE.MathUtils.damp(camera.position.x, cx, 2.8, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, cy, 2.8, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, cz, 2.8, delta)

    // Interpolate lookAt target
    const tx = THREE.MathUtils.lerp(cA.targetX, cB.targetX, smooth)
    const ty = THREE.MathUtils.lerp(cA.targetY, cB.targetY, smooth)
    const tz = THREE.MathUtils.lerp(cA.targetZ, cB.targetZ, smooth)

    targetVec.current.set(tx, ty, tz)
    camera.lookAt(targetVec.current)

    // Active chapter designation
    const active = factor > 0.5 ? cB : cA
    if (active.chapterName !== currentChapter) {
      setCurrentChapter(active.chapterName)
      setHanumanState({
        pos: active.hanumanPos,
        scale: active.hanumanScale
      })
    }
  })

  return (
    <>
      <color attach="background" args={['#14070a']} />
      <fog attach="fog" args={['#14070a', 4, 26]} />

      {/* Global Devotional Illumination */}
      <ambientLight intensity={0.42} color="#b3714c" />
      <directionalLight position={[5, 12, 6]} intensity={2.8} color="#ffe4a0" castShadow />
      <pointLight position={[-4, 4, 2]} intensity={6.5} color="#85222d" />
      <pointLight position={[4, 3, -12]} intensity={8.0} color="#e0a343" />
      <pointLight position={[-3, 3, -28]} intensity={7.5} color="#d96824" />
      <pointLight position={[3, 3, -48]} intensity={7.5} color="#ffd285" />
      <pointLight position={[0, 4, -68]} intensity={9.0} color="#ffbe53" />

      {/* CONTINUOUS REFLECTIVE TEMPLE STONE FLOOR */}
      <mesh position={[0, -0.68, -32]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 92]} />
        <meshStandardMaterial color="#1a0c0f" roughness={0.32} metalness={0.45} />
      </mesh>

      {/* SACRED FLOATING PARTICLES & GOLDEN AURA */}
      <Float speed={0.4} rotationIntensity={0.02} floatIntensity={0.08}>
        <Sparkles count={160} scale={[12, 8, 85]} size={1.8} speed={0.16} color="#e2b85d" />
      </Float>

      {/* ===================================================================
          CHAPTER 1 & 2: THE SACRED TEMPLE ENTRANCE & SANCTUM (Z: 0 -> -6)
          =================================================================== */}
      <group position={[0, 0, 4]}>
        <MandapaArch position={[0, 1.2, 0]} width={5.6} height={6.2} scale={1.2} />
        <TemplePillar position={[-3.6, 0.5, 0]} scale={1.1} />
        <TemplePillar position={[3.6, 0.5, 0]} scale={1.1} />
        <HangingBell position={[-2.2, 3.2, 0]} />
        <HangingBell position={[2.2, 3.2, 0]} />
        <DiyaLamp position={[-2.4, -0.4, 1.2]} />
        <DiyaLamp position={[2.4, -0.4, 1.2]} />
      </group>

      <group position={[0, 0, -2]}>
        <MandapaArch position={[0, 1.2, 0]} width={5.2} height={6.0} />
        <TemplePillar position={[-3.2, 0.5, 0]} />
        <TemplePillar position={[3.2, 0.5, 0]} />
        <DiyaLamp position={[-1.8, -0.4, 0.5]} />
        <DiyaLamp position={[1.8, -0.4, 0.5]} />
      </group>

      {/* ===================================================================
          CHAPTER 3: HALL OF SELFLESS SERVICE (Z: -6 -> -14)
          =================================================================== */}
      <group position={[0, 0, -10]}>
        <TemplePillar position={[-3.8, 0.5, 0]} />
        <TemplePillar position={[3.8, 0.5, 0]} />
        <TemplePillar position={[-3.8, 0.5, -4]} />
        <TemplePillar position={[3.8, 0.5, -4]} />
        <MandapaArch position={[0, 1.2, -4]} width={5.0} height={5.6} />
        <HangingBell position={[-1.8, 3.0, -2]} />
        <HangingBell position={[1.8, 3.0, -2]} />
      </group>

      {/* ===================================================================
          CHAPTER 4: SEVA COURTYARD (Z: -14 -> -23)
          =================================================================== */}
      <group position={[0, 0, -19]}>
        <MandapaArch position={[0, 1.2, 0]} width={5.4} height={5.8} />
        <TemplePillar position={[-3.6, 0.5, 0]} />
        <TemplePillar position={[3.6, 0.5, 0]} />
        <DiyaLamp position={[-2.6, -0.4, 0]} />
        <DiyaLamp position={[2.6, -0.4, 0]} />
      </group>

      {/* ===================================================================
          CHAPTER 5: ANNADAAN HALL (Z: -23 -> -32)
          Traditional serving vessels & brass deepams
          =================================================================== */}
      <group position={[0, 0, -28]}>
        <MandapaArch position={[0, 1.2, 0]} width={5.2} height={5.8} />
        <TemplePillar position={[-3.8, 0.5, 0]} />
        <TemplePillar position={[3.8, 0.5, 0]} />
        {/* Brass traditional Urli / Annadaan serving vessel */}
        <mesh position={[-2.2, -0.3, 0]} material={mats.brassAura}>
          <cylinderGeometry args={[0.55, 0.38, 0.35, 24]} />
        </mesh>
        <mesh position={[2.2, -0.3, 0]} material={mats.brassAura}>
          <cylinderGeometry args={[0.55, 0.38, 0.35, 24]} />
        </mesh>
        <DiyaLamp position={[-2.2, 0.1, 0]} />
        <DiyaLamp position={[2.2, 0.1, 0]} />
      </group>

      {/* ===================================================================
          CHAPTER 6: SACRED KNOWLEDGE CHAMBER (Z: -32 -> -41)
          Scripture stands & Dharma Prachar architectural arches
          =================================================================== */}
      <group position={[0, 0, -37]}>
        <MandapaArch position={[0, 1.2, 0]} width={5.4} height={5.8} />
        <TemplePillar position={[-3.8, 0.5, 0]} />
        <TemplePillar position={[3.8, 0.5, 0]} />
        {/* Sacred wooden scripture desk (Vyasa Peetha style) */}
        <mesh position={[-2.0, -0.2, 0]} material={mats.stoneCarved}>
          <boxGeometry args={[0.9, 0.55, 0.6]} />
        </mesh>
        <mesh position={[-2.0, 0.12, 0]} material={mats.saffronCloth}>
          <boxGeometry args={[0.7, 0.08, 0.45]} />
        </mesh>
        <DiyaLamp position={[-2.0, 0.22, 0.1]} />
      </group>

      {/* ===================================================================
          CHAPTER 7 & 8: FESTIVAL & GALLERY CORRIDOR (Z: -41 -> -55)
          =================================================================== */}
      <group position={[0, 0, -46]}>
        <MandapaArch position={[0, 1.2, 0]} width={5.2} height={5.8} />
        <TemplePillar position={[-3.8, 0.5, 0]} />
        <TemplePillar position={[3.8, 0.5, 0]} />
        <HangingBell position={[0, 3.2, 0]} />
        <DiyaLamp position={[-2.8, -0.4, 0]} />
        <DiyaLamp position={[2.8, -0.4, 0]} />
      </group>

      <group position={[0, 0, -55]}>
        <MandapaArch position={[0, 1.2, 0]} width={5.2} height={5.8} />
        <TemplePillar position={[-3.8, 0.5, 0]} />
        <TemplePillar position={[3.8, 0.5, 0]} />
      </group>

      {/* ===================================================================
          CHAPTER 9 & 10: DONATION SANCTUM & FINAL COURTYARD (Z: -55 -> -72)
          =================================================================== */}
      <group position={[0, 0, -64]}>
        <MandapaArch position={[0, 1.2, 0]} width={5.4} height={6.0} />
        <TemplePillar position={[-3.6, 0.5, 0]} />
        <TemplePillar position={[3.6, 0.5, 0]} />
        <DiyaLamp position={[-2.2, -0.4, 0.5]} />
        <DiyaLamp position={[2.2, -0.4, 0.5]} />
      </group>

      <group position={[0, 0, -72]}>
        <MandapaArch position={[0, 1.2, 0]} width={5.6} height={6.2} scale={1.2} />
        <TemplePillar position={[-3.8, 0.5, 0]} scale={1.1} />
        <TemplePillar position={[3.8, 0.5, 0]} scale={1.1} />
      </group>

      {/* ===================================================================
          LIVING 3D LORD HANUMAN MODEL
          Positioned smoothly across chapters so He inhabits the temple
          =================================================================== */}
      <LordHanumanFigure
        position={hanumanState.pos}
        scale={hanumanState.scale}
        chapter={currentChapter}
        scrollProgress={scrollProgress.current}
      />
    </>
  )
}

/* =========================================================================
   IMMERSIVE WORLD COMPONENT (WEBGL CONTAINER WITH FALLBACK & ERROR BOUNDARY)
   ========================================================================= */
export default function ImmersiveWorld() {
  const scrollProgress = useRef(0)
  const [hasWebGL, setHasWebGL] = useState(true)

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setHasWebGL(false)
    } catch {
      setHasWebGL(false)
    }

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress.current = max > 0 ? window.scrollY / max : 0
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  if (!hasWebGL) {
    return (
      <div className="immersive-world webgl-fallback" aria-hidden="true">
        <div className="fallback-temple-bg" />
      </div>
    )
  }

  return (
    <div className="immersive-world" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 2.4, 9.5], fov: 42 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
        shadows
      >
        <PersistentTempleWorld scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}
