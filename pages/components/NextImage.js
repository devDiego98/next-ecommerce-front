import React, { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@mui/material";
import styled from "styled-components";

const MySkeleton = styled(Skeleton)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: scale(1) !important;
`;
const NextImage = ({ src, alt, width, height }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <MySkeleton animation="wave" width={width} height={height} />
      )}
      <Image src={src} alt={alt} fill onLoad={() => setIsLoaded(true)} />
    </>
  );
};

export default NextImage;
