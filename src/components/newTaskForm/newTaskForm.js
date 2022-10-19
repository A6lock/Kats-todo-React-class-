import { Component } from 'react';

import './newTaskForm.css';

export default class NewTaskForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: '',
    }

  }

  onChangeValue = (e) => this.setState({text: e.target.value})

  onCreateTask = (e) => {

    if ( e.keyCode === 13 && e.target.value) {
      this.props.onCreate(this.state.text);

      this.setState({text: ''});
    }
  }

  render() {
    
    return (
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo"
          type='text'
          placeholder="What needs to be done?" 
          autoFocus
          value={this.state.text}
          onChange={this.onChangeValue} 
          onKeyDown={this.onCreateTask}/>
      </header>
  )
  }

}
