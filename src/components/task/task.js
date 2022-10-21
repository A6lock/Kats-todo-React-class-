import { Component } from 'react';
import { PropTypes } from "prop-types";
import { formatDistanceToNow } from 'date-fns';


import './task.css';

export default class Task extends Component {

  constructor(props) {
    super(props);

    this.state = {
      newTaskLabel: '',
      afterCreationTime: formatDistanceToNow(this.props.creationTime, {includeSeconds: true})
    }
  }

  static defaultProps = {
    onEditTaskForm: () => {},
    text: '',
    completed: false,
    editing: false,
    onEditTask: () => {},
    onDeleteTask: () => {},
    onCompleteTask: () => {}
  } 

  static propTypes = {
    onEditTaskForm: PropTypes.func,
    text: PropTypes.string,
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    onEditTask: PropTypes.func,
    onDeleteTask: PropTypes.func,
    onCompleteTask: PropTypes.func,
  }

  someFunc = () => {

  }

  onChangeLabel = (e) => {
    this.setState({newTaskLabel: e.target.value})
  }

  timeUpdate = () => 
    this.timer =  setTimeout(() => {
      console.log(formatDistanceToNow(this.props.creationTime, {includeSeconds: true}))
      this.setState({afterCreationTime: formatDistanceToNow(this.props.creationTime, {includeSeconds: true})})
  }, 1000);

  timeClose = () => {
    clearInterval(this.timer);
  }

  onEditTaskForm = (e) => {

    if ( e.keyCode === 13 && e.target.value) {

      this.props.onEditTaskForm(this.props.id, this.state.newTaskLabel);

      this.setState({newTaskLabel: ''});
    }

  }

  render() {

    const {text, completed, editing, onEditTask, onDeleteTask, onCompleteTask} = this.props;

    const classListItem = completed ? 'completed' : editing ? 'editing' : '';

    this.timeUpdate();

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
              <span className="created">created {this.state.afterCreationTime} ago</span>
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