import React, {Component} from 'react';
import {Link} from "react-router-dom";

class TodoList extends Component {
  render() {
    return (
      <div>
        <h2>This is the todo list page</h2>
        <Link to="/todos/1">Todo item 1</Link>
        <Link to="/todos/2">Todo item 2</Link>
      </div>
    );
  }
}

TodoList.propTypes = {};
TodoList.defaultProps = {};

export default TodoList;
