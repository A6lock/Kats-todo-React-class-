import { Component } from "react";
import { PropTypes } from "prop-types";




import Task from "../task/task";

import './taskList.css';

export default class TaskList extends Component{

  static defaultProps = {
    onEdit: () => {},
    onEditTaskForm: () => {},
    onDelete: () => {},
    onComplete: () => {}
  }

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    onEdit: PropTypes.func,
    onEditTaskForm: PropTypes.func,
    onDelete: PropTypes.func,
    onComplete: PropTypes.func
  }

  render() {

    const {onEdit, onDelete, onComplete, onEditTaskForm} = this.props;

    const data = this.props.data.map((item) => {

    

      const {id, ...itemProps} = item;



      return <Task 
                key={id}
                onEditTask = {() => onEdit(id)} 
                onDeleteTask = {() => onDelete(id)}
                onCompleteTask = {() => onComplete(id)}
                onEditTaskForm = {onEditTaskForm}
                id={id}
                {...itemProps} />
    })

    return (
      <section className="main">
        <ul className="todo-list">
        {data}
        </ul>
      </section>
    )
  }
}