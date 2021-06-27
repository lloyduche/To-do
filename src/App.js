import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./Components/Form";
import TodoList from "./Components/To-DoList";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
   const [filteredTodos, setFilteredTodos] = useState([]);

   useEffect(() => {
      getLocalTodos();
   }, []);
   
   useEffect(() => {
     filterHandler();
     saveLocalTodos();
    }, [todos, status]);
    

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter((todo) => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const saveLocalTodos = () => { 
      localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
       localStorage.setItem("todos", JSON.stringify([]));
     } else {
       let todoLocal =  JSON.parse(localStorage.getItem("todos", JSON.stringify(todos)));
       setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h2>LLoyd's To-Do List</h2>
      </header>
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
