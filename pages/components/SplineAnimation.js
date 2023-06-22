import React, { useEffect, useState } from "react";
import debounce from "lodash";

const SplineAnimation = () => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = debounce(() => {
      setScrollTop(window.pageYOffset || document.documentElement.scrollTop);
    }, 250);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "linear-gradient(to right, #ff00ff, #00ffff)",
        transform: `translateY(${scrollTop}px)`,
        transition: "transform 0.3s",
      }}
    ></div>
  );
};

export default SplineAnimation;
