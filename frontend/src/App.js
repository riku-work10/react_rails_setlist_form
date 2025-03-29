import Task from './component/Task';
import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");

  const fetch = async () => {
    const res = await axios.get("http://localhost:3000/tasks");
    setTasks(res.data);
  };

  const createTask = async () => {  //ここでフォーム入力したデータを送信している
    await axios.post("http://localhost:3000/tasks", {
      name: name,  //postでデータを渡す際にはここにそのデータを書く！バックエンド側はストロングパラメータで！
      is_done: false,
    });
    setName("");  //入力フォームを空にしている
    fetch();  //最新のタスク一覧を取得している
  };

  const destroyTask = async (id) => {
    await axios.delete(`http://localhost:3000/tasks/${id}`);
    fetch();
  };

  const toggleIsDone = async (id, index) => {
    const isDone = tasks[index].is_done;
    await axios.put(`http://localhost:3000/tasks/${id}`, {
      is_done: !isDone,
    });
    fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className='app'>
      <h1 className='app-text'>タスク一覧</h1>
      <div className='app-container'>
        <input className='app-form' placeholder="タスク名を入力" value={name} onChange={(e) => setName(e.target.value)}/>
        <button className='app-button' onClick={createTask}>
          タスクを作成
        </button>
      </div>
      <div>
      {tasks.map((task, index) => {
              return (
                <Task
                  id={task.id}
                  key={index}
                  index={index}
                  name={task.name}
                  isDone={task.is_done}
                  toggleIsDone={toggleIsDone}
                  destroyTask={destroyTask}
                />
              );
      })}
      </div>
    </div>
  );
}

export default App;