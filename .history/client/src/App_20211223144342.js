import { useEffect, useState } from 'react'
import './App.css';
import Axios from 'axios'
import { UilTimesCircle } from '@iconscout/react-unicons'

function App() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [status, setStatus] = useState("incomplete")
  const [newStatus, setNewStatus] = useState("complete");

  useEffect(() => {
    getTaskList();
  }, [taskList])
  const addTask = (e) => {
    // e.preventDefault();
    console.log(task);
    Axios.post('http://localhost:3002/create', {
      task: task,
      status: 'incomplete',
    })
      .then(() => {
        console.log('success');
        setTaskList([
          ...taskList,
          {
            task: task,
            status: status,
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
                }
                : val;
            })
          );
        }
      );
  };

  const updateStatus = (id) => {
    setNewStatus('complete');
    Axios.put("http://localhost:3002/updatestatus", { status: newStatus, id: id })
      .then(
        (response) => {
          setTaskList(
            taskList.map((val) => {
              return val.id === id
                ? {
                  id: val.id,
                  status: newStatus,
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

  console.log(newTask);
  return (
    <div className="todoApp">
      <h1 className='heading'>TODO APP</h1>
      <div className='body'>
        <div className='left'>
          <h2>New Tasks</h2>
          {
            taskList.map(val => (
              <div>
                {
                  val.status === "incomplete" &&
                  <div key={val.id} className='taskCard'>
                    <div className='taskCardText'>
                      {val.taskText}
                    </div>

                    <div className='taskCardUpdate'>
                      <input type="text" name="" id="" placeholder='Update task' onChange={(e) => setNewTask(e.target.value)} />

                      <div className='taskCardButton'>
                        <button
                          onClick={() => { updateTaskList(val.id) }} disabled={(val.status) === 'incomplete' ? false : true}
                          className='taskCardUpdatebutton'>
                          Update
                        </button>
                        <input type="checkbox" name="" id="" checked={(val.status) === 'incomplete' ? '' : 'checked'} onChange={() => { updateStatus(val.id) }} />
                        <button onClick={() => { deleteTask(val.id) }}
                          className='taskCardDelete'>
                          <UilTimesCircle />
                        </button>
                      </div>
                    </div>

                  </div>
                }
              </div>

            )
            )
          }
        </div>
        <form className='center'>
          <h2>Enter Task here</h2>
          <input type="text" name="Text" id="" onChange={(e) => setTask(e.target.value)} className='centerInput' />
          <button onClick={addTask} className='centerButton'>Submit</button>
        </form>
        <div className='right'>
          <h2>Completed Tasks</h2>
          {
            taskList.map(val => (
              <div>
                {
                  val.status === "complete" &&
                  <div key={val.id} className='taskCard'>
                    <div className='taskCardText'>
                      {val.taskText}
                    </div>

                    <div className='taskCardButton'>
                      <button
                        onClick={() => { updateTaskList(val.id) }} disabled={(val.status) === 'incomplete' ? false : true}
                        className='taskCardUpdatebutton'>
                        Update
                      </button>
                      <input type="checkbox" name="" id="" checked={(val.status) === 'incomplete' ? '' : 'checked'} onChange={() => { updateStatus(val.id) }} />
                      <button onClick={() => { deleteTask(val.id) }}
                        className='taskCardDelete'>
                        <UilTimesCircle />
                      </button>
                    </div>

                  </div>
                }



              </div>
            )
            )
          }
        </div>
      </div>



    </div>
  );
}

export default App;
