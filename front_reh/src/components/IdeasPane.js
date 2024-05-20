import React from "react";
import { Grid, Button, Tooltip, Typography } from "@mui/material";
import FastForward from "@mui/icons-material/FastForward";
import Message from "./Message";
import theme from "../themes";

const IdeasPane = ({ messages, ideas, onIdeaClick, onFastForward }) => {
  if (!ideas.length) return null;

  // const ideasSubset =
  //   messages.length <= 2 ? ideas.slice(0, 4) : ideas.slice(4, 8);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
      sx={{
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        pr: 5,
        pl: 5,
        pt: 2,
        pb: 2,
        height: "100%",
        overflowY: "auto",
        background: theme.palette.background.paper,
        boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
      }}
    >
      <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
        You could say...
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontStyle: "italic", color: theme.palette.text.secondary }}
      >
        Think: which of these are aggressive? Which are assertive?
      </Typography>
      {ideas.map((idea, index) => (
        <Grid
          item
          container
          direction="row"
          alignItems="center" // vertically aligns the button w the message
          spacing={1}
          key={index}
          sx={{
            cursor: "pointer",
            ":hover": { backgroundColor: theme.palette.action.hover },
          }}
          onClick={() => onIdeaClick(idea)}
        >
          <Tooltip title="Preview this idea">
            {" "}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onFastForward(idea);
              }}
              sx={{ minWidth: "auto", padding: 0 }}
            >
              <FastForward />{" "}
            </Button>
          </Tooltip>
          <Grid item xs>
            <Message
              text={idea.content}
              strategy={idea.strategy}
              intensity={idea.intensity}
              sender={"user"}
            />
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default IdeasPane;
