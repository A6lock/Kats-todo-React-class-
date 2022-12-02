/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect, useRef } from 'react';
import { PropTypes } from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

function Task({
  text,
  completed,
  editing,
  onEditTask,
  onDeleteTask,
  onCompleteTask,
  timerRunning,
  onChangeTimerRunning,
  onTimeChange,
  id,
  minValue,
  secValue,
  ...props
}) {
  const [newTaskLabel, setNewTaskLabel] = useState('');
  const [min, setMin] = useState(+minValue);
  const [sec, setSec] = useState(+secValue);
  const [afterCreationTime, setAfterCreationTime] = useState(
    formatDistanceToNow(props.afterCreationTime, { includeSeconds: true })
  );

  const timerID = useRef(null);
  const timeCreationID = useRef(null);

  // const timeUpdate = () => {
  //  setAfterCreationTime(formatDistanceToNow(props.afterCreationTime, { includeSeconds: true }));
  // };

  useEffect(() => {
    timeCreationID.current = setInterval(() => {
      setAfterCreationTime(formatDistanceToNow(props.afterCreationTime, { includeSeconds: true }));
    }, 1000);

    return () => {
      clearInterval(timeCreationID.current);
    };
  }, [props.afterCreationTime]);

  const minDecr = () => {
    if (min > 0) {
      setMin((min) => Number(min - 1));
      setSec(() => Number(59));
    }
  };

  const pauseTimer = () => {
    clearInterval(timerID.current);
    onChangeTimerRunning();
  };

  const timerDecrement = () => {
    if (timerRunning) {
      if (editing) {
        pauseTimer();
      }

      if (min === 0 && sec === 0) {
        clearInterval(timerID.current);
        onChangeTimerRunning();
        onCompleteTask();
      }
      if (sec > 0) {
        setSec((sec) => Number(sec - 1));
      } else {
        minDecr();
      }
      onTimeChange(id, min, sec);
    }
  };

  useEffect(() => {
    if (timerRunning) {
      timerID.current = setInterval(() => {
        timerDecrement();
      }, 1000);
    }
    return () => clearInterval(timerID.current);
  }, [timerRunning, sec]);

  const onChangeLabel = (e) => {
    setNewTaskLabel(e.target.value);
  };

  const startTimer = () => {
    onChangeTimerRunning();
  };

  const onEditTaskForm = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      props.onEditTaskForm(id, newTaskLabel);
      setNewTaskLabel('');
    }
  };

  // eslint-disable-next-line no-nested-ternary
  const classListItem = completed ? 'completed' : editing ? 'editing' : null;
  const buttonType = !timerRunning ? (
    <button type="button" className="icon icon-play" onClick={startTimer} />
  ) : (
    <button type="button" className="icon icon-pause" onClick={pauseTimer} />
  );

  return (
    <li className={classListItem}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onClick={onCompleteTask} readOnly />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <div className="label">
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <span className="title" onClick={onCompleteTask} onKeyDown={onCompleteTask}>
            {text}
          </span>
          <span className="created">
            {buttonType}
            {min > 9 ? min : `0${min}`}:{sec > 9 ? sec : `0${sec}`}
          </span>
          <span className="created text-time">created {afterCreationTime} ago</span>
        </div>
        <button type="button" className="icon icon-edit" onClick={onEditTask} aria-label="Edit button" />
        <button type="button" className="icon icon-destroy" onClick={onDeleteTask} aria-label="Delete button" />
      </div>
      {editing ? (
        <input
          type="text"
          className="edit"
          placeholder="Enter a new task"
          onChange={onChangeLabel}
          onKeyDown={onEditTaskForm}
          value={newTaskLabel}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
        />
      ) : (
        ''
      )}
    </li>
  );
}

Task.defaultProps = {
  onEditTaskForm: () => {},
  text: '',
  completed: false,
  editing: false,
  timerRunning: false,
  onEditTask: () => {},
  onDeleteTask: () => {},
  onCompleteTask: () => {},
};

Task.propTypes = {
  onEditTaskForm: PropTypes.func,
  text: PropTypes.string,
  completed: PropTypes.bool,
  editing: PropTypes.bool,
  timerRunning: PropTypes.bool,
  onEditTask: PropTypes.func,
  onDeleteTask: PropTypes.func,
  onCompleteTask: PropTypes.func,
};

export default Task;
