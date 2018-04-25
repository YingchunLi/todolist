import React, {Component} from 'react';
import PropTypes from 'prop-types';

import _ from "lodash";

import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import * as Action from './actions';


export class TodoList extends Component {
  componentWillMount() {
    this.props.dispatch && this.props.dispatch(Action.getTodosAsync());
  }

  render() {
    const {todos} = this.props;
    return (
      <div>
        <h2>This is the todo list page</h2>
        <table border="1">
          <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>description</th>
            <th>due date</th>
            <th>status</th>
          </tr>
          </thead>
          <tbody>
          {
            todos.map((value, idx) =>
              <tr key={idx}>
                <td><Link to={`/todos/${value.id}`}>{value.id}</Link></td>
                <td>{value.name}</td>
                <td>{value.description}</td>
                <td>{value.dueDate}</td>
                <td>{value.status}</td>
              </tr>
            )

          }
          </tbody>


        </table>

      </div>
    );
  }
}

TodoList.propTypes = {
  todos:  PropTypes.arrayOf(PropTypes.object),
};

TodoList.defaultProps = {
  todos: [],
};

const mapStateToProps = (state, ownProps) => {
  return {
    todos: _.values(state.entities.todos.byId),
    fetching: state.entities.todos.fetching,
  };
};

export default connect(mapStateToProps)(TodoList);
