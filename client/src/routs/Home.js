import React from "react";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import TasksList from "../components/TasksList";

export const Home = () => {
  return (
    <div>
      <Header />
      <AddTask />
      <TasksList />
    </div>
  );
};
