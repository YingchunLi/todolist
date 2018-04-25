import React, {Component} from 'react';
import PropTypes from 'prop-types';

import _ from "lodash";

import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import * as Actions from './actions';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TodoEditDialog from "./TodoEditDialog";

const TodoListTable = ({title, todos}) =>
  <Paper>
    <Toolbar>
      <ToolbarTitle text={title} />
    </Toolbar>
    <Table>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>name</TableHeaderColumn>
          <TableHeaderColumn>description</TableHeaderColumn>
          <TableHeaderColumn>due date</TableHeaderColumn>
          <TableHeaderColumn>status</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} showRowHover={true}>
        {
          todos.map((value, idx) =>
            <TableRow key={idx} >
              <TableRowColumn><Link to={`/todos/${value.id}`}>{value.name}</Link></TableRowColumn>
              <TableRowColumn>{value.description}</TableRowColumn>
              <TableRowColumn>{value.dueDate && new Date(value.dueDate).toISOString()}</TableRowColumn>
              <TableRowColumn>{value.status}</TableRowColumn>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  </Paper>;

export class TodoList extends Component {
  componentWillMount() {
    this.props.dispatch && this.props.dispatch(Actions.getTodosAsync());
  }

  addToDo = (todo) => {
    if (!todo.status) todo.status = 'Pending';
    this.props.dispatch(Actions.editTodoAsync(todo));
  };

  render() {
    const {todos} = this.props;
    const pendingTodos = todos.filter(t => t.status === 'Pending');
    const doneTodos = todos.filter(t => t.status === 'Done');
    return (
      <div>
        <AppBar
          title="Todo List"
          showMenuIconButton={false}
          iconElementRight={
            <TodoEditDialog
              mode="Add"
              onChange={this.addToDo}
            />
          }
        />

        <TodoListTable title="Pending todos" todos={pendingTodos} />
        <TodoListTable title="Done todos" todos={doneTodos} />

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
