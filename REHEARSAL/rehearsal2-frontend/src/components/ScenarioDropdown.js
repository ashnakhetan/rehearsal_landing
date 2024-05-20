import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
// import "/Users/ashnakhetan/Desktop/SALTResearch/REHEARSAL/rehearsal/frontend/src/components/ScenarioDropdown.module.css";

const ScenarioDropdown = ({
  scenarios,
  setScenarios,
  selectedScenario,
  setSelectedScenario,
}) => {
  useEffect(() => {
    fetch("https://rehearsal-dun.vercel.app/scenarios")
      // fetch("http://localhost:8000/scenarios")
      .then((response) => response.json())
      .then((data) => setScenarios(data));
  }, []);

  const handleChange = (event) => {
    console.log("event.target.value:", event.target.value);
    setSelectedScenario(event.target.value);
    // Additional logic can be implemented here
  };

  return (
    <FormControl variant="outlined" style={{ width: "60%" }}>
      <InputLabel>Choose a Scenario...</InputLabel>
      <Select
        value={selectedScenario.description}
        onChange={handleChange}
        label="Scenario"
        sx={{
          backgroundColor: "#f0f2f5",
          borderRadius: "10px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          overflowY: "visible",
        }}
      >
        {scenarios.map((scenario) => (
          <MenuItem
            sx={{ maxWidth: "960px" }}
            key={scenario.id}
            value={scenario}
            className="dropdown-option"
          >
            {scenario.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ScenarioDropdown;
