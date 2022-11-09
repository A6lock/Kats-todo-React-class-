/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Component } from 'react';
import { PropTypes } from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

export default class Task extends Component {
  static defaultProps = {
    onEditTaskForm: () => {},
    text: '',
    completed: false,
    editing: false,
    onEditTask: () => {},
    onDeleteTask: () => {},
    onCompleteTask: () => {},
  };

  static propTypes = {
    onEditTaskForm: PropTypes.func,
    text: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    onEditTask: PropTypes.func,
    onDeleteTask: PropTypes.func,
    onCompleteTask: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      newTaskLabel: '',
      afterCreationTime: formatDistanceToNow(this.props.creationTime, { includeSeconds: true }),
      min: this.props.minValue,
      sec: this.props.secValue,
      timerRunning: false,
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.timeUpdate(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onChangeLabel = (e) => {
    this.setState({ newTaskLabel: e.target.value });
  };

  timeUpdate = () => {
    const { creationTime } = this.props;
    this.setState({ afterCreationTime: formatDistanceToNow(creationTime, { includeSeconds: true }) });
  };

  startTimer = () => this.setState({ timerRunning: true });

  pauseTimer = () => this.setState({ timerRunning: false });

  onEditTaskForm = (e) => {
    const { onEditTaskForm, id } = this.props;
    const { newTaskLabel } = this.state;

    if (e.keyCode === 13 && e.target.value) {
      onEditTaskForm(id, newTaskLabel);

      this.setState({ newTaskLabel: '' });
    }
  };

  render() {
    const { text, completed, editing, onEditTask, onDeleteTask, onCompleteTask } = this.props;
    const { afterCreationTime, newTaskLabel, min, sec, timerRunning } = this.state;

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
          <label>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <span className="description" onClick={onCompleteTask} onKeyDown={onCompleteTask}>
              {text}
            </span>
            <span className="created">
              {buttonType}
              {min}:{sec}
            </span>
            <span className="created">created {afterCreationTime} ago</span>
          </label>
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
