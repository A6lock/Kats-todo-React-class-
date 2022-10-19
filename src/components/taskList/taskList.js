import { Component } from "react";

import Task from "../task/task";

import './taskList.css';

export default class TaskList extends Component{

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