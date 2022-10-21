import { Component } from "react";
import { PropTypes } from "prop-types";

import TaskFilter from "../tasksFilter/tasksFilter";

import './footer.css';

export default class Footer extends Component {

  static defaultProps = {
    isCompleted: 0,
    onFilterChange: () => {},
    filter: 'All',
    onClearCompleted: () => {}
  }

  static propTypes = {
    isCompleted: PropTypes.number,
    onFilterChange: PropTypes.func,
    filter: PropTypes.string,
    onClearCompleted: PropTypes.func
  }
  
  render() {


    const {isCompleted, filter, onFilterChange, onClearCompleted} = this.props;

    return(
        <footer className="footer">
          <span className="todo-count">{isCompleted} items left</span>
          <TaskFilter 
            onFilterChange={onFilterChange}
            filter={filter}/>
          <button 
            className="clear-completed"
            onClick={onClearCompleted}
            >Clear completed</button>
        </footer>
    )
  }
}