function TaskCard(id,tasktext,status) {
    return (
        <div className="taskCard">
            <div key={id}>
                {val.taskText}
                <input type="text" name="" id="" placeholder='New task' onChange={(e) => setNewTask(e.target.value)} />
                <button onClick={() => {
                    updateTaskList(val.id)
                }} disabled={(val.status) === 'incomplete' ? false : true}>Update</button>

                <button onClick={() => {
                    updateStatus(val.id)
                }} disabled={(val.status) === 'incomplete' ? false : true}>Completed!</button>

                <button onClick={() => {
                    deleteTask(val.id)
                }}>Delete</button>
            </div>
        </div>
    )
}

export default TaskCard
