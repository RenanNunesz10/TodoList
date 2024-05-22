'use client'
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { CgMathPlus } from "react-icons/cg";
import { FaRegTrashAlt } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import { addTask, deleteTask, getTasks, updateTask } from "@/utils/api";

export default function Home(){
    const [tasks, setTasks] = useState(null);
    const [tarefa, setTarefa] = useState("");
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        getTasks().then((data) => setTasks(data));
    }, []);

    function changeTarefa(event){
        setTarefa(event.target.value);
    }

    function handleAddTarefa(event){
        event.preventDefault();
        const id = uuid();
        const text = tarefa;
        const newTask = { id, text, completed };

        addTask(newTask).then((status) => {
            if(status === 201) {
                getTasks().then((data) => setTasks(data));
                setTarefa("");
                setCompleted(false);
            }
        });
    }

    function handleDeleteTask(id){
        deleteTask(id).then((status) => {
            if(status === 200) {
                getTasks().then((data) => setTasks(data));
            }
        });
    }

    return(
        <>
            <div className={styles.body}>
                <div className={styles.container}>
                <h1 className={styles.h1}>TODO List</h1>
                    <form onSubmit={handleAddTarefa}>
                        <div className={styles.divInput}>
                            <input type="text" value={tarefa} onChange={changeTarefa} className={styles.input} placeholder="Digite a nova tarefa"/>
                            <button type="submit" className={styles.addButton}>
                                <CgMathPlus />
                            </button>
                        </div>
                    </form>
                    <br /><br />
                    <div className={styles.taskList}>
                    {tasks && tasks.map(task => (
                        <div key={task.id}>
                            <div className={styles.tarefa}>
                                <div className={styles.divTarefa}>
                                <input type="checkbox" className={styles.checkbox}/>
                                <p><strong>{task.text}</strong></p>
                                </div>                          
                            <button onClick={() => handleDeleteTask(task.id)} className={styles.deleteButton}>
                                <FaRegTrashAlt />
                            </button>
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </>
    );
}
