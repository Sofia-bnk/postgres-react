import React, { useEffect, useContext } from "react";

import axios from "axios";
import TasksContext from "../context/TasksContext";
import { useHistory } from "react-router";

function TasksList() {
  const { tasks, setTasks } = useContext(TasksContext);

  let history = useHistory();
  useEffect(fetchTasks, [setTasks]);

  function fetchTasks() {
    (async () => {
      const tasks = (await axios("http://localhost:3002/tasks")).data.tasks;
      console.log(tasks);
      setTasks(tasks);
    })();
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/tasks/${id}`);
    } catch (err) {
      console.log(err);
    }
    setTasks(
      tasks.filter((task) => {
        return task.id !== id;
      })
    );
  };

  const handleUpdate = (id) => {
    history.push(`/task/${id}/update`);
  };
  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Tasks</th>
            <th scope="col">Day</th>
            <th scope="col">Date</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.task}</td>
                <td>{task.day}</td>
                <td>{task.task_date}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleUpdate(task.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
export default TasksList;
