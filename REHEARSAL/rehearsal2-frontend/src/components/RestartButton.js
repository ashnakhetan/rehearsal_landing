import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { styled } from "@mui/system";

const StyledIconButton = styled(IconButton)({
  color: "#0078ff",
  padding: "6px",
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#e0e2e5",
  },
  width: "60px", // Explicit width
  height: "60px",
});

const RestartButton = ({ onClick }) => (
  <Tooltip title="Restart">
    <StyledIconButton onClick={onClick} aria-label="restart">
      <RestartAltIcon />
    </StyledIconButton>
  </Tooltip>
);

export default RestartButton;
