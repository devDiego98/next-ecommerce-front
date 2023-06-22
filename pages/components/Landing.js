import React from "react";
import Featured from "./Featured";
import LandingFirstSection from "./LandingFirstSection";

const Landing = () => {
  return (
    <main>
      <script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@0.9.370/build/spline-viewer.js"
      ></script>
      <Featured />
      <spline-viewer
        hint
        loading-anim
        url="https://prod.spline.design/kmITxCtIvlp3dJcm/scene.splinecode"
      ></spline-viewer>
      <LandingFirstSection />
    </main>
  );
};

export default Landing;
