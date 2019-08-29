import React from 'react';
import PropTypes from 'prop-types';

const Task = ({ task }) => (
  <li>
    {task.text}
    -
    {task.createdAt.toString()}
  </li>
);

Task.propTypes = {
  task: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    text: PropTypes.string,
  }).isRequired,
};

export default Task;
