import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const GradientScaleContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: "10px",
});

const GradientBar = styled(Box)({
  height: 10,
  width: "100%",
  borderRadius: 5,
  background: "linear-gradient(to right, #a1c4fd, #c2e9fb, #6a11cb)",
  position: "relative",
});

const Marker = styled(Box)(({ position }) => ({
  height: 20,
  width: 4,
  backgroundColor: "#1b74e4",
  borderRadius: 2,
  position: "absolute",
  left: `calc(${position}% - 2px)`,
  top: "-5px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
}));

const ValueLabel = styled(Typography)({
  marginLeft: 10,
  color: "#1b74e4",
  fontWeight: "bold",
});

const GradientScale = ({ value }) => {
  value = parseInt(value, 10);
  const position = ((value + 5) / 10) * 100;

  return (
    <GradientScaleContainer>
      <GradientBar>
        <Marker position={position} />
      </GradientBar>
      <ValueLabel>{value}</ValueLabel>
    </GradientScaleContainer>
  );
};

export default GradientScale;
