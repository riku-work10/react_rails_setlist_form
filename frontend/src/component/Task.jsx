import './Task.css';

const Task = (props) => {
  return (
    <div className="task">
      <label>
        <input
          type="checkbox"
          checked={props.isDone}
          onChange={() => {
            props.toggleIsDone(props.id, props.index);
          }}
        />
        <span>{props.name}</span>
      </label>
      <button className='task-button' onClick={() => props.destroyTask(props.id)}>
          削除
      </button>
    </div>
  );
};


export default Task