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
    };
  }

  onChangeValue = (e) => this.setState({ text: e.target.value });

  onCreateTask = (e) => {
    const { text } = this.state;
    const { onCreate } = this.props;
    if (e.keyCode === 13 && e.target.value) {
      onCreate(text);

      this.setState({ text: '' });
    }
  };

  render() {
    const { text } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          type="text"
          placeholder="What needs to be done?"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={text}
          onChange={this.onChangeValue}
          onKeyDown={this.onCreateTask}
        />
      </header>
    );
  }
}
