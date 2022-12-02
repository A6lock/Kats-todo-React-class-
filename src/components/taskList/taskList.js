import { PropTypes } from 'prop-types';

import Task from '../task/task';

import './taskList.css';

// eslint-disable-next-line react/prefer-stateless-function
function TaskList({ onEdit, onDelete, onComplete, onEditTaskForm, data, onChangeTimerRunning, onTimeChange }) {
  const newData = data.map((item) => {
    const { id, ...itemProps } = item;

    const afterCreationTime = new Date(itemProps.creationTime);
    return (
      <Task
        key={id}
        onEditTask={() => onEdit(id)}
        onDeleteTask={() => onDelete(id)}
        onCompleteTask={() => onComplete(id)}
        onChangeTimerRunning={() => onChangeTimerRunning(id)}
        onEditTaskForm={onEditTaskForm}
        onTimeChange={onTimeChange}
        afterCreationTime={afterCreationTime}
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

TaskList.defaultProps = {
  onEdit: () => {},
  onEditTaskForm: () => {},
  onDelete: () => {},
  onComplete: () => {},
};

TaskList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func,
  onEditTaskForm: PropTypes.func,
  onDelete: PropTypes.func,
  onComplete: PropTypes.func,
};

export default TaskList;
