import "./App.css";
import { Home } from "./routs/Home";
import Update from "./routs/Update";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TasksContext from "./context/TasksContext";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };
  const updateTask = () => {};
  return (
    <div className="container">
      <TasksContext.Provider value={{ tasks, setTasks, addTask, updateTask }}>
        <Router>
          <Switch>
            <Route path="/" exact component={Home}></Route>

            <Route path="/task/:id/update" exact component={Update}></Route>
          </Switch>
        </Router>
      </TasksContext.Provider>
    </div>
  );
}

export default App;
