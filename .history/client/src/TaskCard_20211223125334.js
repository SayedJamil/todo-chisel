function TaskCard(id,tasktext,status) {
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
                    deleteTask(val.id)
                }}>Delete</button>
            </div>
        </div>
    )
}

export default TaskCard
