'use client'
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { CgMathPlus } from "react-icons/cg";
import { FaRegTrashAlt } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import { addTask, deleteTask, getTasks, updateTask } from "@/utils/api";

const HomePage = () => {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const taskData = await getTasks();
        setTasks(taskData);
    };

    const handleTaskTextChange = (event) => {
        setTaskText(event.target.value);
    };

    const handleAddTask = async (event) => {
        event.preventDefault();
        const newTask = {
            id: uuid(),
            text: taskText,
            completed: isCompleted
        };

        const status = await addTask(newTask);
        if (status === 201) {
            fetchTasks();
            setTaskText("");
            setIsCompleted(false);
        }
    };

    const handleTaskDeletion = async (taskId) => {
        const status = await deleteTask(taskId);
        if (status === 200) {
            fetchTasks();
        }
    };

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.h1}>TODO List</h1>
                <form onSubmit={handleAddTask}>
                    <div className={styles.divInput}>
                        <input
                            type="text"
                            value={taskText}
                            onChange={handleTaskTextChange}
                            className={styles.input}
                            placeholder="Digite a nova tarefa"
                        />
                        <button type="submit" className={styles.addButton}>
                            <CgMathPlus />
                        </button>
                    </div>
                </form>
                <br /><br />
                <div className={styles.taskList}>
                    {tasks.map(task => (
                        <div key={task.id} className={styles.tarefa}>
                            <div className={styles.divTarefa}>
                                <input type="checkbox" className={styles.checkbox} />
                                <p><strong>{task.text}</strong></p>
                            </div>
                            <button onClick={() => handleTaskDeletion(task.id)} className={styles.deleteButton}>
                                <FaRegTrashAlt />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
