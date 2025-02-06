import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Group } from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll, MotionPathControls, useMotion } from "@react-three/drei";
import * as THREE from "three";
import { generateCirclePoints } from "../utils/generateCirclePoints";

//gsap.registerPlugin(ScrollTrigger);

function ScrollMoveObject() {
  const scroll = useScroll();
  const motion = useMotion();

  useFrame((state, delta) => {
    //console.log(scroll.offset);
    motion.current += delta * 0.1;
  });
}

function AutoMoveObject() {
  const scroll = useScroll();
  const motion = useMotion();

  useFrame((state, delta) => {
    //console.log(scroll.offset);
    motion.current = scroll.offset;
  });
}

export function MainScene() {
  /*
  const can1Ref = useRef();
  const can1SpinRef = useRef();
  const initialPosition = [0, 0, 0];

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "body", // the element that the trigger is tied to
        start: "top top", // when the top of the trigger hits the top of the viewport
        end: "bottom bottom", // when the bottom of the trigger hits the bottom of the viewport
        scrub: true,
        markers: true,
      },
    });

    timeline
      .to(can1Ref.current.position, { x: 0.5, y: 0, z: 3, duration: 1 })
      .to(can1Ref.current.position, { x: 0, y: 0, z: 0 })
      .to(can1Ref.current.rotation, { y: Math.PI * 2 }, "<"); // "<" makes it run at the same time as the previous effect
  }, []);
  */

  const boxRef = useRef();

  const { curve, straightLine } = useMemo(() => {
    const start = new THREE.Vector3(0, -2, 0);
    const end = new THREE.Vector3(0, 2, 0);
    const straightLine = new THREE.CatmullRomCurve3([start, end], false);

    const circlePoints = generateCirclePoints(105, 5);
    const curve = new THREE.CatmullRomCurve3(circlePoints, true);

    return { curve, straightLine };
  }, []);

  return (
    <>
      {/*<group ref={can1Ref} position={initialPosition} rotation={[0, 0, 0]}>
        <group ref={can1SpinRef}>*/}
      <MotionPathControls curves={[straightLine]} object={boxRef} debug={true}>
        <AutoMoveObject />
      </MotionPathControls>

      <MotionPathControls curves={[curve]} focus={boxRef} debug={true}>
        <ScrollMoveObject />
      </MotionPathControls>

      <group ref={boxRef}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </group>
      {/*</group>
      </group>*/}
    </>
  );
}
