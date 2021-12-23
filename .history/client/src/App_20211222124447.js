import { useState } from 'react'
import './App.css';
import Axios from 'axios'

function App() {
  const [task, setTask] = useState("");
  const addTask = () => {
    Axios.post('http://localhost:3002/create', {
      task: task,
    }).then(() => {
      console.log('success');
    });
  };
  console.log(task);
  return (
    <div className="App">
      <input type="text" name="Text" id="" onChange={(e) => setTask(e.target.value)} />
      <button onClick={addTask}>Submit</button>
    </div>
  );
}

export default App;
