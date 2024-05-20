import React from "react";
import Message from "./Message";
import { Grid, Typography, Box } from "@mui/material";
import theme from "../themes";
import InputBar from "./InputBar";

const ChatPane = ({
  handleSendMessage,
  handleToggleIdeas,
  messages,
  simulationMessages,
  response,
  setResponse,
  strategy,
  setStrategy,
  showIdeas,
  simulatedCharName,
}) => {
  return (
    <Grid
      container
      display={"flex"}
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      sx={{
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        p: 2,
        height: "500px",
        maxHeight: "600px",
        overflowY: "auto",
        background: theme.palette.background.paper,
        boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
        position: "relative",
      }}
    >
      <Box
        item
        id="scrollableContainer"
        sx={{
          height: "81%",
          width: "92%",
          overflowY: "auto", // Enable vertical scrolling
          p: "15px",
          // pr: "20px",
          position: "absolute",
          top: 0,
          y: 0, // Add a bit of right padding to avoid content covering the scrollbar
          wordWrap: "break-word",
          overflowWrap: "break-word",
        }}
      >
        <Grid item sx={{ paddingBottom: 2 }}>
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
            Chat with {simulatedCharName}
          </Typography>
        </Grid>
        <Grid
          item
          sx={{ flexGrow: 1, overflowY: "auto", alignItems: "space-between" }}
        >
          {messages.map((message, index) => (
            <Message
              key={index}
              text={message.text}
              strategy={message.strategy}
              intensity={message.intensity}
              sender={message.sender}
            />
          ))}
          {simulationMessages.map((message, index) => (
            <Message
              key={index}
              text={message.text}
              strategy={message.strategy}
              intensity={message.intensity}
              sender={message.sender}
            />
          ))}
        </Grid>
      </Box>

      <Grid item sx={{ position: "absolute", bottom: 15, left: 10, right: 10 }}>
        <InputBar
          onSendMessage={handleSendMessage}
          onToggleIdeas={handleToggleIdeas}
          response={response}
          setResponse={setResponse}
          strategy={strategy}
          setStrategy={setStrategy}
          showIdeas={showIdeas}
        />
      </Grid>
    </Grid>
  );
};

export default ChatPane;
