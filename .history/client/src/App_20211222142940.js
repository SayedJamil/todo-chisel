import { useEffect, useState } from 'react'
import './App.css';
import Axios from 'axios'

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const[newTask, setNewTask]=use
  useEffect(() => {
    getTaskList();
  }, [taskList])
  const addTask = (e) => {
    e.preventDefault();
    console.log(task);
    Axios.post('http://localhost:3002/create', {
      task: task,
    })
      .then(() => {
        console.log('success');
        setTaskList([
          ...taskList,
          {
            task: task,
          }
        ])
      });
    getTaskList();
  };

  const getTaskList = () => {
    Axios.get("http://localhost:3002/task").then((response) => {
      setTaskList(response.data);
      console.log(response);
    });
  };
  const updateTaskList = (id) => {
    Axios.put("http://localhost:3002/update", { task: newTask, id: id }).then(
      (response) => {
        setTaskList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                id: val.id,
                task:val.taskText
              }
              : val;
          })
        );
      }
    );
  };

  console.log(task);
  return (
    <div className="App">
      <input type="text" name="Text" id="" onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTask}>Submit</button>
      {
        taskList.map(val => (
          <div key={val.id}>{val.taskText}</div>
        )
        )
      }
    </div>
  );
}

export default App;
