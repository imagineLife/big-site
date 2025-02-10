import Layout from './../../components/Layout';
import Header from './../../components/Header';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Float, Environment } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square  md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          {/* <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          /> */}
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries() {
  // const soundEffects = [
  //   new Audio('/sounds/hit2.ogg'),
  //   new Audio('/sounds/hit3.ogg'),
  //   new Audio('/sounds/hit4.ogg'),
  // ];

  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0 }),
    new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 }),
    new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x8e44ad, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: 0.5,
      color: 0x2980b9,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x2c3e50,
      roughness: 0.1,
      metalness: 0.5,
    }),
  ];

  return allShapes.map(({ position, r, geometry }) => (
    <Geometry
      key={JSON.stringify(position)} // Unique key
      position={position}
      geometry={geometry}
      // soundEffects={soundEffects}
      materials={materials}
      r={r}
    />
  ));
}

function Geometry({ r, position, geometry, soundEffects, materials }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);

  const startingMaterial = getRandomMaterial();

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }

  function handleClick(e) {
    const mesh = e.object;

    // gsap.utils.random(soundEffects).play();

    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1.3,
      ease: 'elastic.out(1,0.3)',
      yoyo: true,
    });

    // mesh.material = getRandomMaterial();
  }

  // const handlePointerOver = () => {
  //   document.body.style.cursor = 'pointer';
  // };

  // const handlePointerOut = () => {
  //   document.body.style.cursor = 'default';
  // };

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: gsap.utils.random(0.8, 1.2),
        ease: 'elastic.out(1,0.3)',
        delay: gsap.utils.random(0, 0.5),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'default')}
          visible={visible}
          material={startingMaterial}
        ></mesh>
      </Float>
    </group>
  );
}

/*
  PROPS
  position: 
    https://threejs.org/docs/#api/en/math/Vector3
    (x,y,z) and the "Euclidian distance" from (0,0,0)
*/
const Gem = {
  position: [0, 0, 0],
  r: 0.3,
  geometry: new THREE.IcosahedronGeometry(3), // Gem
};

const Pill = {
  position: [2, -1.5, 8],
  r: 0.4,

  /*
    CapsuleGeometry
    https://threejs.org/docs/#api/en/geometries/CapsuleGeometry
    - (radius=1, length=1, capSegments=4, radialSegments=8)
  */
  geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16), // Pill
};

const Ball = {
  position: [-2.8, 4, -8],
  r: 0.6,
  geometry: new THREE.DodecahedronGeometry(1.5), // Soccer ball
};

const Donut = {
  position: [-0.8, -0.75, 5],
  r: 0.5,
  geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32), // Donut
};

const Diamond = {
  position: [1.6, 1.6, -4],
  r: 0.7,
  geometry: new THREE.OctahedronGeometry(1.5), // Diamond
};

// Smiley

const smileyShape = new THREE.Shape()
  .moveTo(0, 0)
  .absarc(4, 4, 4, 0, Math.PI * 2, false);
// .moveTo(80, 40)
// .absarc(40, 40, 40, 0, Math.PI * 2, false);

// const smileyEye1Path = new THREE.Path()
//   .moveTo(35, 20)
//   .absellipse(25, 20, 10, 10, 0, Math.PI * 2, true);

// const smileyEye2Path = new THREE.Path()
//   .moveTo(65, 20)
//   .absarc(55, 20, 10, 0, Math.PI * 2, true);

// const smileyMouthPath = new THREE.Path()
//   .moveTo(10, 40)
//   .quadraticCurveTo(40, 60, 60, 40)
//   .bezierCurveTo(70, 45, 70, 50, 60, 60)
//   .quadraticCurveTo(40, 80, 20, 60)
//   .quadraticCurveTo(5, 50, 20, 40);

// smileyShape.holes.push(smileyEye1Path);
// smileyShape.holes.push(smileyEye2Path);
// smileyShape.holes.push(smileyMouthPath);
// const allShapes = [Gem, Pill, Ball, Donut, Diamond];

const smileyObj = {
  position: [0, 0, 0],
  r: 0,
  geometry: new THREE.ShapeGeometry(smileyShape),
};
const allShapes = [Pill, smileyObj];

export default function ThreeDee() {
  return (
    <Layout>
      <Header name={'working in 3d'} />
      <article className="px-6 md:px-0 mt-[80px]">
        <Shapes />
      </article>
    </Layout>
  );
}
