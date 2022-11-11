/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Component } from 'react';
import { PropTypes } from 'prop-types';

import './task.css';

export default class Task extends Component {
  static defaultProps = {
    onEditTaskForm: () => {},
    text: '',
    completed: false,
    editing: false,
    timerRunning: false,
    onEditTask: () => {},
    onDeleteTask: () => {},
    onCompleteTask: () => {},
  };

  static propTypes = {
    onEditTaskForm: PropTypes.func,
    text: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    timerRunning: PropTypes.bool,
    onEditTask: PropTypes.func,
    onDeleteTask: PropTypes.func,
    onCompleteTask: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      newTaskLabel: '',
      min: this.props.minValue,
      sec: this.props.secValue,
    };
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  onChangeLabel = (e) => {
    this.setState({ newTaskLabel: e.target.value });
  };

  startTimer = () => {
    this.props.onChangeTimerRunning();
    this.timerID = setInterval(this.timerDecrement, 10);
  };

  pauseTimer = () => {
    clearInterval(this.timerID);
    this.props.onChangeTimerRunning();
  };

  minDecr = () => {
    const { min } = this.state;
    if (min > 0) {
      this.setState({
        min: min - 1,
        sec: 59,
      });
    }
  };

  timerDecrement = () => {
    const { min, sec } = this.state;

    if (this.props.editing) {
      this.pauseTimer();
    }

    if (min === 0 && sec === 0) {
      clearInterval(this.timerID);
      this.props.onChangeTimerRunning();
      this.props.onCompleteTask();
    }
    if (sec > 0) {
      this.setState({ sec: sec - 1 });
    } else {
      this.minDecr();
    }
  };

  onEditTaskForm = (e) => {
    const { onEditTaskForm, id } = this.props;
    const { newTaskLabel } = this.state;

    if (e.keyCode === 13 && e.target.value) {
      onEditTaskForm(id, newTaskLabel);

      this.setState({ newTaskLabel: '' });
    }
  };

  render() {
    const { text, completed, editing, onEditTask, onDeleteTask, onCompleteTask, afterCreationTime, timerRunning } =
      this.props;
    const { newTaskLabel, min, sec } = this.state;

    // eslint-disable-next-line no-nested-ternary
    const classListItem = completed ? 'completed' : editing ? 'editing' : null;
    const buttonType = !timerRunning ? (
      <button type="button" className="icon icon-play" onClick={this.startTimer} />
    ) : (
      <button type="button" className="icon icon-pause" onClick={this.pauseTimer} />
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
            <span className="created">created {afterCreationTime} ago</span>
          </div>
          <button type="button" className="icon icon-edit" onClick={onEditTask} aria-label="Edit button" />
          <button type="button" className="icon icon-destroy" onClick={onDeleteTask} aria-label="Delete button" />
        </div>
        {editing ? (
          <input
            type="text"
            className="edit"
            placeholder="Enter a new task"
            onChange={this.onChangeLabel}
            onKeyDown={this.onEditTaskForm}
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
}
