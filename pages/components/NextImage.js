import React, { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@mui/material";
import styled from "styled-components";
import defaultProductImage from "../../public/images/defaultProductImage.png";
const MySkeleton = styled(Skeleton)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: scale(1) !important;
`;
const NextImage = ({ src, alt, width, height, imageWidth, imageHeight }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      {!isLoaded && (
        <MySkeleton animation="wave" width={width} height={height} />
      )}
      <Image
        src={src || defaultProductImage}
        alt={alt}
        width={imageWidth}
        height={imageHeight}
        sizes="200"
        fill={!imageWidth && !imageHeight}
        onLoad={() => setIsLoaded(true)}
        priority
      />
    </>
  );
};

export default NextImage;
