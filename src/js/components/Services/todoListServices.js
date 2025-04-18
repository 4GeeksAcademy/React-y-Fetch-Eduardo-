const baseUrlUsers = "https://playground.4geeks.com/todo/users/"

const baseUrlTodo = "https://playground.4geeks.com/todo/todos/"


export const getUser = async (userName) => {
    try {
        const request = await fetch(`${baseUrlUsers}${userName}`, {
            header: { accept: 'application/json' }
        });
        const response = await request.json()
        console.log(response);
        console.log(response.todos);
        return response.todos
    } catch (error) {
        console.log(error);
    }
}


export const readUser = async (userName) => {
    try {
        const request = await fetch(`${baseUrlUsers}${userName}`);
        const response = await request.json()
        console.log(response);
        return response.todos
    } catch (error) {
        console.log(error);

    }
}



export const createTodo = async (userName, task) => {
    try {
        const request = await fetch(`${baseUrlTodo}${userName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                label: task,
                is_done: false
            })
        })
        const response = await request.json()
        return response
    } catch (error) {
        console.log(error);
    }
}


export const deleteTask = async (todoId) => {
    try {
        const request = await fetch(`${baseUrlTodo}${todoId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json"
            },
        })
        if (request.status === 204) {
            return alert("Tarea eliminada")
        }
        alert("Error al eliminar la tarea")
    } catch (error) {
        console.log(error);
    }
}


export const updateTask = async (updateTask, todoId) => {
    try {
        const request = await fetch(`${baseUrlTodo}${todoId}`, {
            method: "PUT",
            body: JSON.stringify(updateTask),
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (request.status != 200) {
            return alert("Error al actualiza")
        }
        const response = await request.json()
        return response
    } catch (error) {
        console.log(error)
    }
}