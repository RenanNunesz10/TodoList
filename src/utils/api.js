//--------------- CREATE --------------
export async function addTask(task){
    try{
        let response = await fetch("http://localhost:8000/tasks",
            {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(task)
            })
            return response.status
    }catch(error) {
        console.log("ERROR: " + error)
    }
}

//-------------- READ ----------------
export async function getTasks(){
    try{
        let response = await fetch("http://localhost:8000/tasks")
        let data = await response.json()
        return data
    } catch(error) {
        console.log("ERROR: " + error)
    }
}

export async function getTasksByCompleted(completed){
    try{
        let response = await fetch(`http://localhost:8000/tasks?completed=${completed}`)
        let data = await response.json()
        return data
    } catch(error) {
        console.log("ERROR: " + error)
    }
}

export async function getTaskById(id){
    try{
        let response = await fetch(`http://localhost:8000/tasks?id=${id}`)
        let data = await response.json()
        return data
    } catch(error) {
        console.log("ERROR: " + error)
    }
}

//-------------- UPDATE ----------------
export async function updateTask(task){
    try{
        let response = await fetch("http://localhost:8000/tasks/" + task.id,
            {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(task)
            })
            return response.status
    } catch(error) {
        console.log("ERROR: " + error)
    }
}

//-------------- DELETE ----------------
export async function deleteTask(id){
    try{
        let response = await fetch ("http://localhost:8000/tasks/" + id,
            {
                method: 'DELETE'
            })
            return response.status
    } catch(error) {
        console.log("ERROR: " + error)
    }
}