import { Component } from 'react';
import { PropTypes } from 'prop-types';

import Task from '../task/task';

import './taskList.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class TaskList extends Component {
  static defaultProps = {
    onEdit: () => {},
    onEditTaskForm: () => {},
    onDelete: () => {},
    onComplete: () => {},
  };

  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    onEdit: PropTypes.func,
    onEditTaskForm: PropTypes.func,
    onDelete: PropTypes.func,
    onComplete: PropTypes.func,
  };

  render() {
    const { onEdit, onDelete, onComplete, onEditTaskForm, data, onChangeTimerRunning } = this.props;

    const newData = data.map((item) => {
      const { id, ...itemProps } = item;
      return (
        <Task
          key={id}
          onEditTask={() => onEdit(id)}
          onDeleteTask={() => onDelete(id)}
          onCompleteTask={() => onComplete(id)}
          onChangeTimerRunning={() => onChangeTimerRunning(id)}
          onEditTaskForm={onEditTaskForm}
          id={id}
          {...itemProps}
        />
      );
    });

    return (
      <section className="main">
        <ul className="todo-list">{newData}</ul>
      </section>
    );
  }
}
