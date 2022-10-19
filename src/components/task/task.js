import { Component } from 'react';

import './task.css';

export default class Task extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newTaskLabel: ''
    }
  }

  onChangeLabel = (e) => {
    this.setState({newTaskLabel: e.target.value})
  }

  onEditTaskForm = (e) => {

    if ( e.keyCode === 13 && e.target.value) {

      this.props.onEditTaskForm(this.props.text, this.state.newTaskLabel);

      this.setState({newTaskLabel: ''});
    }

  }

  render() {

    const {text, completed, editing, onEditTask, onDeleteTask, onCompleteTask} = this.props;

    const classListItem = completed ? 'completed' : editing ? 'editing' : '';

    return (
        <li className={classListItem}>
          <div className="view">
            <input 
              className="toggle" 
              type="checkbox" 
              checked={completed}
              onClick={onCompleteTask}
              readOnly/>
            <label>
              <span className="description"
                    onClick={onCompleteTask}>
                    {text}
              </span>
              <span className="created">Не известно</span>
            </label>
            <button className="icon icon-edit" 
            onClick={onEditTask}/>
            <button className="icon icon-destroy"
            onClick={onDeleteTask}/>
          </div>
          {editing ? <input 
                        type="text" 
                        className="edit" 
                        placeholder='Enter a new task'
                        onChange={this.onChangeLabel}
                        onKeyDown={this.onEditTaskForm}
                        value={this.state.newTaskLabel} 
                        autoFocus/> : ''}
      </li>
    )
  }
}