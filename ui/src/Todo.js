import React, {Component} from 'react';

import * as Actions from './actions';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import FlatButton from 'material-ui/FlatButton';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';

const TodoDetailTable = ({title, todo}) =>
  <Paper>
    <Toolbar>
      <ToolbarTitle text={title} />
    </Toolbar>
    <Table >
      <TableBody displayRowCheckbox={false} showRowHover={true}>
        <TableRow>
          <TableRowColumn style={{width: '30%'}}>Name</TableRowColumn>
          <TableRowColumn>{todo.name}</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>Description</TableRowColumn>
          <TableRowColumn>{todo.description}</TableRowColumn>
        </TableRow>
        <TableRow>
          <TableRowColumn>Due Date</TableRowColumn>
          <TableRowColumn>{todo.dueDate}</TableRowColumn>
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

  render() {
    const {match, todo} = this.props;
    return (
      <div>
        <AppBar
          title="Todo detial"
          showMenuIconButton={false}
          iconElementRight={
            <FlatButton
              label="Edit"
              primary={true}
              icon={<ActionEdit />}
            />
          }
        />

        <TodoDetailTable title={`todo ${match.params.id}`} todo={todo} />
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
