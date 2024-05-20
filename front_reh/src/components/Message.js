import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import GradientScale from "./GradientScale";

const Message = ({ text, strategy, intensity, sender }) => {
  const messageAlignment =
    sender === "user" || sender === "model" ? "flex-end" : "flex-start";
  const backgroundColor =
    sender === "user"
      ? "#0084FF"
      : sender === "model"
      ? "#e5f2ff"
      : sender === "simulation"
      ? "#f9fafb"
      : "#E4E6EB";
  const textColor =
    sender === "user"
      ? "white"
      : sender === "model" || sender === "simulation"
      ? "gray"
      : "black";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: messageAlignment,
        marginBottom: "10px",
      }}
    >
      <Paper
        sx={{
          backgroundColor: backgroundColor,
          color: textColor,
          maxWidth: "70%",
          padding: "10px 15px",
          marginLeft: messageAlignment === "flex-start" ? "2px" : "0",
          borderRadius: "20px",
          alignSelf: messageAlignment,
          // wordBreak: "break-word",
          fontSize: "14px",
        }}
        elevation={3}
      >
        {text}
      </Paper>
      {strategy && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "5px",
            minWidth: "27%",
          }}
        >
          <Typography
            sx={{
              fontStyle: "italic",
              color: "gray",
              fontSize: "12px",
              marginRight: "10px",
              flexGrow: 1,
              whiteSpace: "nowrap",
            }}
          >
            Strategy: {strategy}
          </Typography>
          <GradientScale value={intensity} />
        </Box>
      )}
    </Box>
  );
};

export default Message;
