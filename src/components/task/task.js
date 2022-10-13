import { Component } from 'react';

import './task.css';

export default class Task extends Component {



  render() {
    const {text, completed,  status, onEditTask, onDeleteTask, onCompleteTask} = this.props;

    let classListItem = completed ? 'completed' : '';

    return (
        <li className={classListItem}>
          <div className="view">
            <input className="toggle" type="checkbox" />
            <label>
              <span className="description"
                    onClick={onCompleteTask}>{text}</span>
              <span className="created">Не известно</span>
            </label>
            <button className="icon icon-edit" 
            onClick={onEditTask}/>
            <button className="icon icon-destroy"
            onClick={onDeleteTask}/>
          </div>
          {status === 'editing' 
                      ? 
                        <input type="text" className="edit" value="Editing task" />
                      :
                      ''
                      }
      </li>
    )
  }
}

/*
        <ul class="todo-list">

          <li class="completed">
            <div class="view">
              <input class="toggle" type="checkbox">
              <label>
                <span class="description">Completed task</span>
                <span class="created">created 17 seconds ago</span>
              </label>
              <button class="icon icon-edit"></button>
              <button class="icon icon-destroy"></button>
            </div>
          </li>

          <li class="editing">
            <div class="view">
              <input class="toggle" type="checkbox">
              <label>
                <span class="description">Editing task</span>
                <span class="created">created 5 minutes ago</span>
              </label>
              <button class="icon icon-edit"></button>
              <button class="icon icon-destroy"></button>
            </div>
            
          </li>

          <li>
            <div class="view">
              <input class="toggle" type="checkbox">
              <label>
                <span class="description">Active task</span>
                <span class="created">created 5 minutes ago</span>
              </label>
              <button class="icon icon-edit"></button>
              <button class="icon icon-destroy"></button>
            </div>
          </li>
        </ul>
*/