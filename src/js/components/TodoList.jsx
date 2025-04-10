import React, { useEffect, useState } from 'react';
import { createTodo, getUser, readUser, deleteTask, updateTask } from './Services/todoListServices';
import { unstable_renderSubtreeIntoContainer, useFormStatus } from 'react-dom';
import { use } from 'react';

function TodoList() {
    const [tasks, setTasks] = useState([]);

    const [newTask, setNewTask] = useState('');

    const [hoveredTaskIndex, setHoveredTaskIndex] = useState(null);

    const [editTaskId, setEditTaskId] = useState(null);

    const [editTaskLabel, setEditTaskLabel] = useState('');

    const getTodos = async () => {
        try {
            const listTodos = await readUser("Eduardo")
            console.log(listTodos);

            setTasks(listTodos)
        } catch (error) {
            console.log(error);

        }
    }



    useEffect(() => {
        getTodos()
        //getUser()
    }, []
    )

    const addTask = async (pressedKey) => {
        if (pressedKey === "Enter") {
            try {
                const taskData = await createTodo("Eduardo", newTask.trim());
                console.log(taskData);

                setTasks(prev => [...prev, taskData]);
                setNewTask('');
            } catch (error) {
                console.log(error);

            }
        }
    }


    const handleDeleteTask = async (todoId) => {        // Esta funcion es para eliminar tasks 
        try {
            await deleteTask(todoId)
            setTasks(tasks.filter(task => task.id != todoId))
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateTask = async (todoId, updatedLabel) => {
        try {
            const updatedTask = {
                label: updatedLabel,
                is_done: false,
            };
            const updatedTaskFromAPI = await updateTask(updatedTask, todoId);
            console.log('Tarea actualizada:', updatedTaskFromAPI);
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === todoId ? { ...task, label: updatedTaskFromAPI.label } : task
                )
            );
        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
        }
    };

    const handleEditTask = (task) => {
        setEditTaskId(task.id);
        setEditTaskLabel(task.label);
    };

    return (
        <div>
            <div className='container'>
                <h1>Lista de Tareas</h1>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => addTask(e.key)}
                    placeholder="Añade una nueva tarea"
                />
                <button onClick={() => addTask("Enter")}>Agregar</button>
                <ul>
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            onMouseEnter={() => setHoveredTaskIndex(task.id)}
                            onMouseLeave={() => setHoveredTaskIndex(null)}
                        >
                            {editTaskId === task.id ? (
                                <input
                                    type="text"
                                    value={editTaskLabel}
                                    onChange={(e) => setEditTaskLabel(e.target.value)}
                                    onBlur={() => handleUpdateTask(task.id, editTaskLabel)} // Cuando el campo pierde el foco, actualizamos
                                />
                            ) : (
                                <span>{task.label} - {task.is_done ? "Completada" : "Pendiente"}</span>
                            )}

                            {hoveredTaskIndex === task.id && (
                                <span>
                                    {editTaskId === task.id ? (
                                        <button onClick={() => handleUpdateTask(task.id, editTaskLabel)}>Actualizar</button>
                                    ) : (
                                        <button onClick={() => handleEditTask(task)}>Editar</button>
                                    )}
                                    <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default TodoList;

