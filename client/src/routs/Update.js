import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useHistory } from "react-router";

function Update({ match }) {
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [task, setTask] = useState("");

  useEffect(fetchTasks, [match.params.id]);
  let history = useHistory();
  function fetchTasks() {
    (async () => {
      const task = (
        await axios(`http://localhost:3002/tasks/${match.params.id}`)
      ).data;
      console.log(task);
      setTask(task.task.task);
      setDate(task.task.task_date);
      setDay(task.task.day);
    })();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3002/tasks/${match.params.id}`, {
      task,
      day,
      task_date: date,
    });
    history.push("/");
  };
  return (
    <div>
      <Header title="Update" />
      <div className="mb-5">
        <form action="">
          <div className="form-row">
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
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Update;
