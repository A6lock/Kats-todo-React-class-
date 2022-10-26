import { Component } from 'react';
import { PropTypes } from 'prop-types';

import TaskFilter from '../tasksFilter/tasksFilter';

import './footer.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class Footer extends Component {
  static defaultProps = {
    completedItemCount: 0,
    onFilterChange: () => {},
    filter: 'All',
    onClearCompleted: () => {},
  };

  static propTypes = {
    completedItemCount: PropTypes.number,
    onFilterChange: PropTypes.func,
    filter: PropTypes.string,
    onClearCompleted: PropTypes.func,
  };

  render() {
    const { completedItemCount, filter, onFilterChange, onClearCompleted } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{completedItemCount} items left</span>
        <TaskFilter onFilterChange={onFilterChange} filter={filter} />
        <button type="button" className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}
