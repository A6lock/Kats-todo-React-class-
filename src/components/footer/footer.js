import { Component } from "react";

import TaskFilter from "../tasksFilter/tasksFilter";

import './footer.css';

export default class Footer extends Component {

  
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