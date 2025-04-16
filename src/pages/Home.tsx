import { useRef } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Robot from "@/components/models/Robot";
import Navbar from "@/components/Navbar";

import { LandingMid } from "@/components/LandingMid";
import { LandingLast } from "@/components/LandingLast";
import { Footer } from "@/components/Footer";

const Home = () => {
  const container = useRef(null);
  return (
    <LocomotiveScrollProvider
      watch={[container]}
      options={{
        smooth: true,
      }}
      containerRef={container}
    >
      <main data-scroll-container ref={container} className="w-screen bg-black">
        <div data-scroll-section className="w-full h-screen overflow-hidden ">
          <Navbar />
          <Robot />
        </div>
        <div data-scroll-section className="w-full h-screen overflow-hidden">
          <LandingMid />
        </div>
        <div data-scroll-section className="w-full  ">
          <LandingLast />
        </div>
        <div data-scroll-section className="w-full">
          <Footer />
        </div>
      </main>
    </LocomotiveScrollProvider>
  );
};

export default Home;
