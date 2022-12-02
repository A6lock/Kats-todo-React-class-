import { PropTypes } from 'prop-types';

import TaskFilter from '../tasksFilter/tasksFilter';

import './footer.css';

// eslint-disable-next-line react/prefer-stateless-function
function Footer({ completedItemCount, filter, onFilterChange, onClearCompleted }) {
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

Footer.defaultProps = {
  completedItemCount: 0,
  onFilterChange: () => {},
  filter: 'All',
  onClearCompleted: () => {},
};

Footer.propTypes = {
  completedItemCount: PropTypes.number,
  onFilterChange: PropTypes.func,
  filter: PropTypes.string,
  onClearCompleted: PropTypes.func,
};

export default Footer;
