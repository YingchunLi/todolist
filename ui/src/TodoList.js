import React, {Component} from 'react';
import PropTypes from 'prop-types';

import _ from "lodash";

import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import * as Actions from './actions';

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';
import ActionDone from 'material-ui/svg-icons/action/done';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TodoEditDialog from "./TodoEditDialog";

const TodoListTable = ({title, todos, action}) =>
  <Paper style={{marginBottom: 30, overflow: 'visible'}}>
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
          {action && <TableHeaderColumn>action</TableHeaderColumn>}
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} showRowHover={true}>
        {
          todos.map((todo, idx) =>
            <TableRow key={idx} >
              <TableRowColumn><Link to={`/todos/${todo.id}`}>{todo.name}</Link></TableRowColumn>
              <TableRowColumn>
                {todo.description &&
                todo.description.split('\n')
                  .map((line,idx) => <div key={idx}>{line}</div>)
                }
                </TableRowColumn>
              <TableRowColumn>{todo.dueDate && new Date(todo.dueDate).toISOString()}</TableRowColumn>
              <TableRowColumn>{todo.status}</TableRowColumn>
              {
                action &&
                <TableRowColumn style={{overflow: 'visiable'}}>
                  <FlatButton
                    label="done"
                    primary={true}
                    icon={<ActionDone />}
                    onClick={() => action(todo)}
                  />
                  </TableRowColumn>
              }
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

  doneTodo = (todo) => {
    this.props.dispatch(Actions.doneTodoAsync(todo));
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

        <TodoListTable title="Pending todos" todos={pendingTodos} action={this.doneTodo}/>
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
