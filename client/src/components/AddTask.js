import React, { useState, useContext } from "react";
import axios from "axios";
import TasksContext from "../context/TasksContext";
function AddTask() {
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [task, setTask] = useState("");
  const { addTask } = useContext(TasksContext);

  const taskObj = {
    task,
    day,
    task_date: date,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3002/tasks", taskObj);
    addTask(taskObj);
  };

  return (
    <div className="mb-5">
      <form action="">
        <div className="form-group">
          <div className="col mb-1">
            <input
              type="text"
              className="form-control"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="col mb-1">
            <input
              className="form-control"
              type="text"
              placeholder="Day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
          </div>
          <div className="col mb-1">
            <input
              className="form-control"
              type="text"
              placeholder="Task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-success"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddTask;
