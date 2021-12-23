import { useEffect, useState } from 'react'
import './App.css';
import Axios from 'axios'

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  useEffect(() => {
    getTaskList();
  }, [task]])
  const addTask = (e) => {
    // e.preventDefault();
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
  };

  const getTaskList = () => {
    Axios.get("http://localhost:3002/task").then((response) => {
      setTaskList(response.data);
    });
  };
  const updateTaskList = (id) => {
    Axios.put("http://localhost:3002/update", { task: newTask, id: id })
      .then(
        (response) => {
          setTaskList(
            taskList.map((val) => {
              return val.id === id
                ? {
                  id: val.id,
                  task: newTask,
                }
                : val;
            })
          );
        }
      );
  };

  console.log(newTask);
  return (
    <div className="App">
      <input type="text" name="Text" id="" onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTask}>Submit</button>
      <button onClick={getTaskList}>Show tasks</button>
      {
        taskList.map(val => (
          <div key={val.id}>
            {val.taskText}
            <input type="text" name="" id="" placeholder='New task' onChange={(e) => setNewTask(e.target.value)} />
            <button onClick={() => {
              updateTaskList(val.id)
            }}>Update</button>
          </div>
        )
        )
      }
    </div>
  );
}

export default App;
