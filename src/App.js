import React from "react";
import TaskManagement from "./TaskManagement";
import EventCard from "./Curriculam/Card";
import LaneComponent from "./Curriculam/LaneComponent";

import { Card } from "@embibe/educo";
import "./App.css";

function App() {
  return (
    <div className="task-management">
      <Card type="block">
        <TaskManagement
          CardComponent={EventCard}
          LaneComponent={LaneComponent}
        />
      </Card>
    </div>
  );
}

export default App;
