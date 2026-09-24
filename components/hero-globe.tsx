"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { useMediaQuery } from "@/hooks/use-media-query";

// Brand colours (from globals.css)
const TEAL_DOTS = "#a6c9c8"; // teal-300
const TEAL_ARC = "#c9e0e0"; // teal-200
const GLOBE_FILL = "#0a4a4a"; // a touch lighter than the hero's teal-800
const MARIGOLD = "#f6b840"; // marigold-400

const RADIUS = 2;

// Cities as [latitude, longitude]
const cities = {
  DEL: [28.56, 77.1],
  BOM: [19.09, 72.87],
  YYZ: [43.68, -79.63],
  YVR: [49.19, -123.18],
  JFK: [40.64, -73.78],
  LHR: [51.47, -0.45],
  DXB: [25.25, 55.36],
  SFO: [37.62, -122.38],
  SIN: [1.36, 103.99],
  SYD: [-33.94, 151.18],
} as const;

type City = keyof typeof cities;

const routes: [City, City][] = [
  ["DEL", "YYZ"],
  ["DEL", "LHR"],
  ["BOM", "JFK"],
  ["DEL", "DXB"],
  ["DXB", "YVR"],
  ["SIN", "SFO"],
  ["DEL", "SYD"],
];

function toVector(lat: number, lon: number, r = RADIUS) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

// Evenly spread dots over a sphere (Fibonacci sphere)
function useSphereDots(count: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const a = golden * i;
      positions.set([Math.cos(a) * r * RADIUS, y * RADIUS, Math.sin(a) * r * RADIUS], i * 3);
    }
    return positions;
  }, [count]);
}

// A curved flight path lifted above the surface
function useArc(from: City, to: City) {
  return useMemo(() => {
    const start = toVector(cities[from][0], cities[from][1]);
    const end = toVector(cities[to][0], cities[to][1]);
    const lift = 1 + start.distanceTo(end) * 0.12;
    const mid = start.clone().add(end).normalize().multiplyScalar(RADIUS * lift);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return { curve, points: curve.getPoints(64) };
  }, [from, to]);
}

function Route({ from, to, offset, animate }: { from: City; to: City; offset: number; animate: boolean }) {
  const { curve, points } = useArc(from, to);
  const plane = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!plane.current) return;
    const t = animate ? (clock.elapsedTime * 0.08 + offset) % 1 : offset;
    plane.current.position.copy(curve.getPoint(t));
  });

  return (
    <group>
      <Line points={points} color={TEAL_ARC} lineWidth={1.2} dashed dashSize={0.06} gapSize={0.05} transparent opacity={0.7} />
      <mesh ref={plane}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={MARIGOLD} />
      </mesh>
    </group>
  );
}

function Globe({ animate }: { animate: boolean }) {
  const spin = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const dots = useSphereDots(2200);

  // Track the mouse across the whole window (the canvas itself ignores clicks)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (animate && spin.current) spin.current.rotation.y += delta * 0.06;
    if (tilt.current) {
      // Ease towards the pointer for a soft parallax tilt
      const k = animate ? 1 - Math.exp(-delta * 3) : 1;
      tilt.current.rotation.x = THREE.MathUtils.lerp(tilt.current.rotation.x, 0.35 + pointer.current.y * 0.18, k);
      tilt.current.rotation.z = THREE.MathUtils.lerp(tilt.current.rotation.z, pointer.current.x * -0.12, k);
    }
  });

  const cityList = Object.values(cities);

  return (
    <group ref={tilt} rotation={[0.35, 0, 0]}>
      {/* Start with India and the Atlantic facing the viewer */}
      <group ref={spin} rotation={[0, -2.3, 0]}>
        <mesh>
          <sphereGeometry args={[RADIUS * 0.985, 64, 64]} />
          <meshBasicMaterial color={GLOBE_FILL} transparent opacity={0.85} />
        </mesh>

        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[dots, 3]} />
          </bufferGeometry>
          <pointsMaterial color={TEAL_DOTS} size={0.028} sizeAttenuation transparent opacity={0.75} />
        </points>

        {cityList.map(([lat, lon], i) => (
          <mesh key={i} position={toVector(lat, lon, RADIUS * 1.005)}>
            <sphereGeometry args={[0.03, 12, 12]} />
            <meshBasicMaterial color={MARIGOLD} />
          </mesh>
        ))}

        {routes.map(([from, to], i) => (
          <Route key={`${from}-${to}`} from={from} to={to} offset={i / routes.length} animate={animate} />
        ))}
      </group>
    </group>
  );
}

export default function HeroGlobe() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  // Stop rendering when the hero is scrolled out of view
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (wrapper.current) io.observe(wrapper.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapper} className="size-full">
      <Canvas
        camera={{ position: [0, 0, 6.6], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        frameloop={visible && !reduceMotion ? "always" : "demand"}
        style={{ pointerEvents: "none" }}
      >
        <Globe animate={!reduceMotion} />
      </Canvas>
    </div>
  );
}