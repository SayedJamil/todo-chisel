import { useEffect, useState } from 'react'
import './App.css';
import Axios from 'axios'

function App() {
  const [task, setTask] = useState("");
  const [check, setCheck] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  useEffect(() => {
    getTaskList();
  }, [taskList])
  const addTask = (e) => {
    // e.preventDefault();
    console.log(task);
    Axios.post('http://localhost:3002/create', {
      task: task,
      check: false,
    })
      .then(() => {
        console.log('success');
        setTaskList([
          ...taskList,
          {
            task: task,
            check: check,
          }
        ])
      });
  };

  const getTaskList = () => {
    Axios.get("http://localhost:3002/task").then((response) => {
      setTaskList(response.data);
      console.log(response.data);
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
                  check: check,
                }
                : val;
            })
          );
        }
      );
  };

  const deleteTask = (id) => {
    Axios.delete(`http://localhost:3002/delete/${id}`).then((response) => {
      setTaskList(
        taskList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };
  const checkTrue = (id) => {
    // Axios.put("http://localhost:3002/updateCheck", { check: true, id: id })
    //   .then(
    //     (response) => {
    //       setTaskList(
    //         taskList.map((val) => {
    //           return val.id === id
    //             ? {
    //               id: val.id,
    //               check: true,
    //             }
    //             : val;
    //         })
    //       );
    //     }
    //   );
    setTaskList(
      taskList.map((val) => {
        return val.id === id
          ? {
            id: val.id,
            task: task,
            check: true,
          }
          : val;
      })
    // );
  }
  console.log(newTask);
  return (
    <div className="App">
      <input type="text" name="Text" id="" onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTask}>Submit</button>
      {/* <button onClick={getTaskList}>Show tasks</button> */}
      {
        taskList.map(val => (
          <div key={val.id}>
            {val.taskText}
            <input type="text" name="" id="" placeholder='New task' onChange={(e) => setNewTask(e.target.value)} />
            <button onClick={() => {
              updateTaskList(val.id)
            }}>Update</button>
            <input type="checkbox" onChange={checkTrue(val.id)} />
            <button onClick={() => {
              deleteTask(val.id)
            }}>Delete</button>
          </div>
        )
        )
      }
    </div>
  );
}

export default App;