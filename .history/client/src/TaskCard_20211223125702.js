import { useEffect, useState } from 'react'
import './App.css';
import Axios from 'axios'

function TaskCard(id, taskText, status) {
    const [taskList, setTaskList] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [status, setStatus] = useState("incomplete")
    const [newStatus, setNewStatus] = useState("complete");
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
    return (
        <div className="taskCard">
            <div key={id}>
                {taskText}
                <input type="text" name="" id="" placeholder='New task' onChange={(e) => setNewTask(e.target.value)} />
                <button onClick={() => {
                    updateTaskList(id)
                }} disabled={(status) === 'incomplete' ? false : true}>Update</button>

                <button onClick={() => {
                    updateStatus(id)
                }} disabled={(status) === 'incomplete' ? false : true}>Completed!</button>

                <button onClick={() => {
                    deleteTask(id)
                }}>Delete</button>
            </div>
        </div>
    )
}

export default TaskCard
