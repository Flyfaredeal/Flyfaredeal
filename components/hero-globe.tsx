"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { mesh } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import countriesTopo from "world-atlas/countries-110m.json";
import { useMediaQuery } from "@/hooks/use-media-query";

// Brand colours (from globals.css) for a dark or a light hero background
const palettes = {
  dark: { outline: "#a6c9c8", arc: "#c9e0e0", fill: "#0a4a4a", fillOpacity: 0.85, gold: "#f6b840" },
  light: { outline: "#387474", arc: "#387474", fill: "#ffffff", fillOpacity: 0.7, gold: "#ed9f00" },
} as const;
export type GlobeTone = keyof typeof palettes;
type Palette = (typeof palettes)[GlobeTone];

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

// Countries outlined in gold, as named in world-atlas (Singapore is too small for the 110m map)
const highlightedCountries = new Set([
  "India",
  "United States of America",
  "Canada",
  "United Kingdom",
  "United Arab Emirates",
  "Australia",
]);

// How much of the route the solid trail covers behind the plane (0–1)
const TRAIL_LENGTH = 0.22;

function toVector(lat: number, lon: number, r = RADIUS) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

// Turns [lon, lat] polylines into line-segment positions on the sphere
function toSegments(lines: number[][][], r: number) {
  const positions: number[] = [];
  for (const line of lines) {
    for (let i = 0; i < line.length - 1; i++) {
      const [lon1, lat1] = line[i];
      const [lon2, lat2] = line[i + 1];
      if (Math.abs(lon2 - lon1) > 180) continue; // don't draw a chord across the date line
      const a = toVector(lat1, lon1, r);
      const b = toVector(lat2, lon2, r);
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
  }
  return new Float32Array(positions);
}

// All borders + coastlines, and separately the outlines of the highlighted countries
function useCountryOutlines() {
  return useMemo(() => {
    const topo = countriesTopo as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;
    const all = mesh(topo, topo.objects.countries);
    const picked: GeometryCollection<{ name: string }> = {
      type: "GeometryCollection",
      geometries: topo.objects.countries.geometries.filter((g) => highlightedCountries.has(g.properties?.name ?? "")),
    };
    const highlighted = mesh(topo, picked);
    return {
      all: toSegments(all.coordinates, RADIUS * 1.002),
      highlighted: toSegments(highlighted.coordinates, RADIUS * 1.004),
    };
  }, []);
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

type LineRef = { geometry: { setPositions: (positions: number[]) => void }; visible: boolean };

function Route({ from, to, offset, animate, colors }: { from: City; to: City; offset: number; animate: boolean; colors: Palette }) {
  const { curve, points } = useArc(from, to);
  const plane = useRef<THREE.Mesh>(null);
  const trail = useRef<LineRef>(null);
  const trailPositions = useMemo(() => new Array<number>(), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    const t = animate ? (clock.elapsedTime * 0.08 + offset) % 1 : offset;
    plane.current?.position.copy(curve.getPoint(t));

    // Solid trail from a bit behind the plane up to the plane
    const line = trail.current;
    if (!line) return;
    const t0 = Math.max(0, t - TRAIL_LENGTH);
    if (t - t0 < 0.005) {
      line.visible = false;
      return;
    }
    line.visible = true;
    trailPositions.length = 0;
    const steps = 24;
    for (let i = 0; i <= steps; i++) {
      curve.getPoint(t0 + ((t - t0) * i) / steps, tmp);
      trailPositions.push(tmp.x, tmp.y, tmp.z);
    }
    line.geometry.setPositions(trailPositions);
  });

  return (
    <group>
      {/* Full route, faint and dashed */}
      <Line points={points} color={colors.arc} lineWidth={1} dashed dashSize={0.06} gapSize={0.05} transparent opacity={0.35} />
      {/* Solid highlighted trail behind the plane */}
      <Line
        ref={trail as never}
        points={points.slice(0, 2)}
        color={colors.gold}
        lineWidth={2.2}
        transparent
        opacity={0.95}
      />
      <mesh ref={plane}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color={colors.gold} />
      </mesh>
    </group>
  );
}

function Globe({ animate, colors }: { animate: boolean; colors: Palette }) {
  const spin = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const outlines = useCountryOutlines();

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
        {/* Ocean. Drawn first and writes depth, so outlines on the far side stay hidden */}
        <mesh renderOrder={0}>
          <sphereGeometry args={[RADIUS * 0.985, 64, 64]} />
          <meshBasicMaterial color={colors.fill} transparent opacity={colors.fillOpacity} />
        </mesh>

        {/* All country outlines */}
        <lineSegments renderOrder={1}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[outlines.all, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={colors.outline} transparent opacity={0.45} />
        </lineSegments>

        {/* Countries on our routes, in gold */}
        <lineSegments renderOrder={2}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[outlines.highlighted, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={colors.gold} transparent opacity={0.9} />
        </lineSegments>

        {/* Airports */}
        {cityList.map(([lat, lon], i) => (
          <mesh key={i} position={toVector(lat, lon, RADIUS * 1.005)}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshBasicMaterial color={colors.gold} />
          </mesh>
        ))}

        {routes.map(([from, to], i) => (
          <Route key={`${from}-${to}`} from={from} to={to} offset={i / routes.length} animate={animate} colors={colors} />
        ))}
      </group>
    </group>
  );
}

export default function HeroGlobe({ tone = "dark" }: { tone?: GlobeTone }) {
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
        <Globe animate={!reduceMotion} colors={palettes[tone]} />
      </Canvas>
    </div>
  );
}