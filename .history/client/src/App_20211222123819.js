import { useState } from 'react'
import './App.css';
import axio

function App() {
  const [task, setTask] = useState("");
  console.log(task);
  return (
    <div className="App">
      <input type="text" name="Text" id="" onChange={(e) => setTask(e.target.value)} />
      <button>Submit</button>
    </div>
  );
}

export default App;
