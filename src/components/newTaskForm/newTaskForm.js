/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component } from 'react';
import { PropTypes } from 'prop-types';

import './newTaskForm.css';

export default class NewTaskForm extends Component {
  static defaultProps = {
    onCreate: () => {},
  };

  static propTypes = {
    onCreate: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      min: '',
      sec: '',
    };
  }

  onChangeValue = (e) => this.setState({ [e.target.name]: e.target.value });

  onCreateTask = (e) => {
    e.preventDefault();
    const { text, min, sec } = this.state;
    const { onCreate } = this.props;
    if (text) {
      onCreate(text, min, sec);

      this.setState({
        text: '',
        min: '',
        sec: '',
      });
    }
  };

  render() {
    const { text, min, sec } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onCreateTask}>
          <input
            className="new-todo"
            type="text"
            name="text"
            placeholder="What needs to be done?"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            value={text}
            onChange={this.onChangeValue}
          />
          <input
            className="new-todo-form__timer"
            value={min}
            name="min"
            placeholder="Min"
            onChange={this.onChangeValue}
          />
          <input
            className="new-todo-form__timer"
            value={sec}
            name="sec"
            placeholder="Sec"
            onChange={this.onChangeValue}
          />
          <input className="hidden" type="submit" />
        </form>
      </header>
    );
  }
}
