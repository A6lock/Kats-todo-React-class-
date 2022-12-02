import { useState } from 'react';
import { PropTypes } from 'prop-types';

import './tasksFilter.css';

function TaskFilter({ filter, onFilterChange }) {
  const [filterData] = useState([{ name: 'All' }, { name: 'Active' }, { name: 'Completed' }]);

  const filters = filterData.map((item) => {
    const { name } = item;

    const buttonClass = name === filter ? 'selected' : '';

    return (
      <li key={name}>
        <button type="button" className={buttonClass} onClick={() => onFilterChange(name)}>
          {name}
        </button>
      </li>
    );
  });

  return <ul className="filters">{filters}</ul>;
}

TaskFilter.defaultProps = {
  onFilterChange: () => {},
  filter: 'All',
};

TaskFilter.propTypes = {
  onFilterChange: PropTypes.func,
  filter: PropTypes.string,
};

export default TaskFilter;
