import React from "react";
import { Grid, Button, TextField } from "@mui/material";
import theme from "../themes";

const InputBar = ({
  onSendMessage,
  onToggleIdeas,
  response,
  setResponse,
  strategy,
  setStrategy,
  showIdeas,
}) => {
  const isSendEnabled = response.length > 0;

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && isSendEnabled) {
      onSendMessage(response, strategy);
    }
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        marginTop: 1,
        // background: theme.palette.background.default,
        padding: "0 8px",
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="How will you respond?"
        sx={{
          flexGrow: 1, // allows input to grow to fill available space
          ".MuiOutlinedInput-root": {
            borderRadius: "20px",
            backgroundColor: theme.palette.background.paper, // white background
          },
        }}
      />
      <Button
        variant="outlined"
        onClick={onToggleIdeas}
        sx={{
          borderRadius: "20px",
          textTransform: "none",
          marginLeft: "8px",
          marginRight: "8px",
        }}
      >
        {showIdeas ? "Hide Ideas" : "Generate Ideas"}
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={!isSendEnabled}
        onClick={() => onSendMessage(response, strategy)}
        sx={{
          borderRadius: "20px",
          textTransform: "none",
          minWidth: "90px",
        }}
      >
        Send
      </Button>
    </Grid>
  );
};

export default InputBar;
