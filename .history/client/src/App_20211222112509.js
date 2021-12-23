import {useState} from 'react'
import './App.css';

function App() {
  const [task, setTask] = useState("");
  return (
    <div className="App">
      <input type="text" name="Text" id="" onChange={(e)=>setTask(e.c)}/>
      <button>Submit</button>
    </div>
  );
}

export default App;
