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

const TodoDetailTable = ({title}) =>
  <Paper>
    <Toolbar>
      <ToolbarTitle text={title} />
    </Toolbar>
  </Paper>;

class Todo extends Component {
  render() {
    const {match} = this.props;
    return (
      <div>
        <AppBar title="Todo detial" showMenuIconButton={false}/>

        <TodoDetailTable title={`todo ${match.params.id}`} />
      </div>
    );
  }
}

Todo.propTypes = {};
Todo.defaultProps = {};

export default Todo;
