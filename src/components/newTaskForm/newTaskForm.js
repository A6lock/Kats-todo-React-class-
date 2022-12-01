/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { PropTypes } from 'prop-types';

import './newTaskForm.css';

function NewTaskForm({ onCreate }) {
  const [text, setText] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const onChangeText = (e) => setText(e.target.value);
  const onChangeMin = (e) => setMin(e.target.value);
  const onChangeSec = (e) => setSec(e.target.value);

  const onCreateTask = (e) => {
    e.preventDefault();
    if (text) {
      onCreate(text, min, sec);

      setText('');
      setMin('');
      setSec('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onCreateTask}>
        <input
          className="new-todo"
          type="text"
          name="text"
          placeholder="What needs to be done?"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={text}
          onChange={onChangeText}
        />
        <input className="new-todo-form__timer" value={min} name="min" placeholder="Min" onChange={onChangeMin} />
        <input className="new-todo-form__timer" value={sec} name="sec" placeholder="Sec" onChange={onChangeSec} />
        <input className="hidden" type="submit" />
      </form>
    </header>
  );
}

NewTaskForm.defaultProps = {
  onCreate: () => {},
};

NewTaskForm.propTypes = {
  onCreate: PropTypes.func,
};

export default NewTaskForm;
