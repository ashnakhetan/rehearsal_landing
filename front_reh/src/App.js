import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Grid, Typography, Button } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import theme from "./themes";
import ChatPane from "./components/ChatPane";
import IdeasPane from "./components/IdeasPane";
import ScenarioDropdown from "./components/ScenarioDropdown";
import RestartButton from "./components/RestartButton";

const App = () => {
  const [scenarios, setScenarios] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "user",
      text: "What if we added more reagent?",
      strategy: "Assertive",
      intensity: 1,
      timestep: 1,
    },
    {
      sender: "other",
      text: "That won't work. Let's not waste our time with unrealistic suggestions.",
      strategy: "Aggressive",
      intensity: -2,
      timestep: 1,
    },
  ]);
  const [ideas, setIdeas] = useState([]);
  const [showIdeas, setShowIdeas] = useState(false);
  const [response, setResponse] = useState("");
  const [strategy, setStrategy] = useState("");
  const [fastForwarded, setFastForwarded] = useState(false);
  const [simulationMessages, setSimulationMessages] = useState([]);
  const [inSimulation, setInSimulation] = useState(false);
  const [restart, setRestart] = useState(false);

  useEffect(() => {
    if (selectedScenario !== "") {
      // console.log(selectedScenario.usrMessage1);
      setMessages([
        {
          sender: "user",
          text: selectedScenario.usrMessage1,
          strategy: selectedScenario.usrStrat1,
          intensity: selectedScenario.usrIntensity1,
          timestep: 1,
        },
        {
          sender: "other",
          text: selectedScenario.assistantMessage1,
          strategy: selectedScenario.assistantStrat1,
          intensity: selectedScenario.assistantIntensity1,
          timestep: 2,
        },
      ]);
    }
  }, [selectedScenario]);

  useEffect(() => {
    // fetch messages from database and set state here
    // console.log(messages);
    if (messages.length > 0 && messages[messages.length - 1].sender == "user") {
      getResponse(messages[-1], inSimulation);
      // scrollToBottom();
    }
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (restart == true) {
      if (selectedScenario === "") {
        setMessages([
          {
            sender: "user",
            text: "What if we added more reagent?",
            strategy: "Assertive",
            intensity: 1,
            timestep: 1,
          },
          {
            sender: "other",
            text: "That won't work. Let's not waste our time with unrealistic suggestions.",
            strategy: "Aggressive",
            intensity: -2,
            timestep: 1,
          },
        ]);
      }
      setMessages([
        {
          sender: "user",
          text: selectedScenario.usrMessage1,
          strategy: selectedScenario.usrStrat1,
          intensity: selectedScenario.usrIntensity1,
          timestep: 1,
        },
        {
          sender: "other",
          text: selectedScenario.assistantMessage1,
          strategy: selectedScenario.assistantStrat1,
          intensity: selectedScenario.assistantIntensity1,
          timestep: 2,
        },
      ]);
      setRestart(false);
    }
  }, [restart]);

  const getResponse = (message, simulation) => {
    fetch("https://rehearsal-dun.vercel.app/", {
      // fetch("http://localhost:8000/", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chats: messages,
        selectedScenario: selectedScenario,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("not ok");
          throw new Error("Network response broken");
        }
        return response.json();
      })
      .then((data) => {
        const usrStrat = data.usrStrat;
        const usrIntensity = data.usrIntensity;
        const simStrat = data.simStrat;
        const simIntensity = data.simIntensity;
        const simMsg = data.simMsg;

        const replyMessage = {
          sender: "other",
          text: simMsg,
          strategy: simStrat,
          intensity: simIntensity,
          timestep: simulation
            ? simulationMessages.length
            : messages.length + 1,
        };

        if (simulation) {
          // update the user's message with its strategy
          setSimulationMessages((currentMessages) => {
            let updatedMessages = [...currentMessages];
            updatedMessages[-1] = {
              ...updatedMessages[-1],
              strategy: usrStrat,
              intensity: usrIntensity,
            };
          });
          replyMessage.sender = "simulation";
          setSimulationMessages((prevMessages) => [
            ...prevMessages,
            replyMessage,
          ]);
        } else {
          setMessages((currentMessages) => {
            let updatedMessages = [...currentMessages];

            if (updatedMessages.length > 0) {
              let lastIndex = updatedMessages.length - 1;

              updatedMessages[lastIndex] = {
                ...updatedMessages[lastIndex],
                strategy: usrStrat, // update the strategy field with usrStrat
                intensity: usrIntensity,
              };
            }

            updatedMessages.push(replyMessage);

            return updatedMessages;
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching reply:", error);
      });
  };

  const handleSendMessage = (response, strategy) => {
    const newMessage = {
      sender: "user",
      text: response,
      strategy: "",
      intensity: "",
      timestep: messages.length,
    };

    if (
      simulationMessages.length > 0 &&
      simulationMessages[0].text === response
    ) {
      // if it was a simulation message, now add it to real messages
      const userMessages = simulationMessages.map((message) => ({
        ...message,
        sender: message.sender === "model" ? "user" : "other",
      }));
      setMessages((prevMessages) => [...prevMessages, ...userMessages]);
    } else {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInSimulation(false);
      // getResponse(newMessage, false);
    }
    setResponse("");
    setSimulationMessages([]);
  };

  useEffect(() => {
    if (showIdeas) {
      getIdeas();
    }
  }, [messages]);

  const getIdeas = () => {
    fetch("https://rehearsal-dun.vercel.app/ideas", {
      // fetch("http://localhost:8000/ideas", {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chats: messages,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("data:", data);
        const data2 = data.choices;
        // console.log("ideas:", data2);
        const ideasData = data2.map((idea) => ({
          // sender: idea.sender,
          // strategy: idea.strategy || "",
          // timestep: messages.length + 1,
          content: idea.replace(/^\s*-+|-+\s*$/g, ""),
        }));
        setIdeas(ideasData);
      })
      .catch((error) => {
        console.error("Error fetching possible responses:", error);
      });
  };

  const handleToggleIdeas = () => {
    setShowIdeas(!showIdeas);
    if (!showIdeas) {
      getIdeas();
    } else {
      setIdeas([]);
    }
    scrollToBottom();
  };

  const handleIdeaClick = (idea) => {
    setResponse(idea.content);
    setStrategy(idea.strategy);
  };

  const handleFastForward = (idea) => {
    const newMessage = {
      sender: idea.sender,
      text: idea.content,
      strategy: idea.strategy,
      intensity: idea.intensity,
      timestep: simulationMessages.length,
    };
    setSimulationMessages([newMessage]); // Resets simulationMessages with the new initial message
    getResponse(newMessage, true); // Now getResponse will append the chat's response to simulationMessages
    setFastForwarded(true);
  };

  const handleRestart = () => {
    // make sure convo is saved
    setRestart(true);
  };

  // Inside your functional component
  const scrollToBottom = () => {
    const scrollableContainer = document.getElementById("scrollableContainer");

    if (scrollableContainer) {
      scrollableContainer.scrollTop = scrollableContainer.scrollHeight;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        background: theme.palette.background.default,
        justifyContent: "center",
        alignItems: "center",
        // p: 3, // padding around the entire app
        overflow: "hidden",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{ width: "100%", maxWidth: "960px", overflow: "hidden" }}
      >
        <Grid
          item
          sx={{
            width: "100%",
            backgroundColor: theme.palette.background.default, // slight diff background color for emphasis
            padding: theme.spacing(2),
            borderBottom: `1px solid ${theme.palette.divider}`, // light border for separation
            boxSizing: "border-box",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.palette.text.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: theme.spacing(1), // space between the icons and text
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "top",
                width: "100%",
                maxWidth: "960px",
                gap: theme.spacing(0.5),
                justifyContent: "space-between",
              }}
            >
              <ScenarioDropdown
                scenarios={scenarios}
                setScenarios={setScenarios}
                selectedScenario={selectedScenario}
                setSelectedScenario={setSelectedScenario}
              />
              {/* <ChatIcon /> */}
              {/* <span style={{ fontWeight: "bold" }}>Conflict:</span> */}
              <Typography sx={{ pl: 2 }}>
                {selectedScenario.description}
              </Typography>
              {/* You are on a
              project team in your biology class and your team member, Doug,
              doesn't want to take your suggestions, which upsets you. Your goal
              is to reach a common agreement with Doug. */}
              <RestartButton onClick={handleRestart} />
            </Box>
          </Typography>
        </Grid>

        <Grid item></Grid>
        <Grid
          container
          height="100%"
          width="100%"
          display="flex"
          direction="row"
          justifyContent="center"
          alignItems="center"
          xs={12}
          md={12}
          sx={{
            overflow: "auto",
            display: "flex",
            direction: "row",
            justifyContent: "center",
            alignItems: "flex-top",
          }}
          spacing={2}
        >
          <Grid item xs={showIdeas ? 8 : 12}>
            <ChatPane
              messages={messages}
              simulationMessages={simulationMessages}
              handleSendMessage={handleSendMessage}
              handleToggleIdeas={handleToggleIdeas}
              response={response}
              setResponse={setResponse}
              strategy={strategy}
              setStrategy={setStrategy}
              showIdeas={showIdeas}
              simulatedCharName={selectedScenario.assistantName || "Default"}
            />
          </Grid>

          <Grid item xs={4}>
            {showIdeas && (
              <IdeasPane
                messages={messages}
                ideas={ideas}
                onIdeaClick={handleIdeaClick}
                onFastForward={handleFastForward}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
