import React, {Component} from 'react';

import * as Actions from './actions';
import {connect} from "react-redux";

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import RaisedButton from 'material-ui/RaisedButton';

import TodoEditDialog from './TodoEditDialog';


const TodoDetailTable = ({title, todo}) =>
  <Paper>
    <Table >
      <TableBody displayRowCheckbox={false} showRowHover={true}>
        <TableRow>
          <TableRowColumn style={{width: '30%'}}>Name</TableRowColumn>
          <TableRowColumn>{todo.name}</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>Description</TableRowColumn>
          <TableRowColumn>
            {todo.description &&
            todo.description.split('\n')
              .map((line,idx) => <div key={idx}>{line}</div>)
            }
            </TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>Due Date</TableRowColumn>
          <TableRowColumn>{todo.dueDate && new Date(todo.dueDate).toISOString()}</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>Status</TableRowColumn>
          <TableRowColumn>{todo.status}</TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </Paper>;

class Todo extends Component {
  componentWillMount() {
    this.props.dispatch(Actions.getTodoAsync(this.props.match.params.id));
  }

  saveToDo = (newTodo) => {
    this.props.dispatch(Actions.editTodoAsync(newTodo));
  };

  render() {
    const {match, todo} = this.props;
    return (
      <div>
        <AppBar
          title="Todo detail"
          showMenuIconButton={false}
          iconElementRight={
            <TodoEditDialog mode="Edit"
                            todo={todo}
                            onChange={this.saveToDo}
                            disabled={todo.status === 'Done'}
            />}
        />

        <TodoDetailTable title={`todo ${match.params.id}`} todo={todo} />
        <RaisedButton
          label="Go back"
          primary={true}
          onClick={() => this.props.history.goBack()}
          style={{marginTop: 10}}
        />
      </div>
    );
  }
}

Todo.propTypes = {};
Todo.defaultProps = {
  todo: {},
};

const mapStateToProps = (state, ownProps) => {
  return {
    todo: state.entities.todos.byId[ownProps.match.params.id],
    fetching: state.entities.todos.fetching,
  };
};

export default connect(mapStateToProps)(Todo);
