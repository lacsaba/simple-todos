import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import Tasks from '../api/tasks';
import Task from './Task';

const App = ({ tasks }) => {
  const renderTasks = () => tasks.map((task) => <Task key={task._id} task={task} />);

  const [task, setTask] = useState('');
  const addTodo = (e) => {
    e.preventDefault();
    Tasks.insert({ text: task, createdAt: new Date() });
    setTask('');
  };
  return (
    <div className="container">
      <header>
        <h1>Todo List</h1>
      </header>
      <div>
        <h3>Add new Todo</h3>
        <input
          type="text"
          onChange={(e) => setTask(e.target.value)}
          value={task}
        />
        <button type="button" onClick={addTodo}>
          Add
        </button>
      </div>
      <ul>{renderTasks()}</ul>
    </div>
  );
};

App.propTypes = {
  tasks: PropTypes.arrayOf({
    createdAt: PropTypes.string,
    text: PropTypes.string,
  }),
};

App.defaultProps = {
  tasks: [],
};

export default withTracker(() => ({
  tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
}))(App);
