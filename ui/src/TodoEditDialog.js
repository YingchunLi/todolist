import React, {Component} from 'react';

import _ from 'lodash';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import TextField from 'material-ui/TextField';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionAdd from 'material-ui/svg-icons/content/add-circle';

import DateTimePicker from 'material-ui-datetimepicker';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog'
import TimePickerDialog from 'material-ui/TimePicker/TimePickerDialog';

class TodoEditDialog extends Component {
  state = {
    open: false,
    todo: this.props.todo && _.cloneDeep(this.props.todo),
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (!_.isEqual(this.props.todo, nextProps.todo)) {
      this.setState({todo: _.cloneDeep(nextProps.todo)});
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false, todo: undefined});
  };

  handleSubmit = () => {
    this.props.onChange(this.state.todo);
    this.handleClose();
  };

  handleChange = (field, value) => {
    const newTodo = {...this.state.todo, [field]: value};
    this.setState({todo: newTodo});
  };


  render() {
    const {mode, disabled} = this.props;
    const {todo={}} = this.state;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSubmit}
      />,
    ];

    const todoEditTable =
        <Table >
          <TableBody displayRowCheckbox={false} showRowHover={true}>
            <TableRow>
              <TableRowColumn style={{width: '30%'}}>Name</TableRowColumn>
              <TableRowColumn>
                <TextField
                  id="name"
                  value={todo.name || ''}
                  onChange={(event) => this.handleChange('name', event.target.value)}
                />
                </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Description</TableRowColumn>
              <TableRowColumn>
                <TextField
                  id="description"
                  value={todo.description || ''}
                  multiLine={true}
                  rows={3}
                  onChange={(event) => this.handleChange('description', event.target.value)}
                />
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Due Date</TableRowColumn>
              <TableRowColumn>
                <DateTimePicker
                  value={todo.dueDate ? new Date(todo.dueDate) : undefined}
                  onChange={(dateTime) => this.handleChange('dueDate', dateTime.toISOString())}
                  DatePicker={DatePickerDialog}
                  TimePicker={TimePickerDialog}
                />
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Status</TableRowColumn>
              <TableRowColumn>
                <DropDownMenu maxHeight={300}
                              value={todo.status || 'Pending'}
                              onChange={(event, index, value) => this.handleChange('status', value)}
                              disabled={mode === 'Add'}
                >
                  <MenuItem value="Pending" key="Pending" primaryText="Pending" />
                  <MenuItem value="Done" key="Done" primaryText="Done" />
                </DropDownMenu>
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>;

    return (
      <div>
        <FlatButton
          label={mode}
          icon={mode === 'Add' ? <ActionAdd /> : <ActionEdit />}
          onClick={this.handleOpen}
          disabled={disabled}
        />

        <Dialog
          title={`${mode} Todo`}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          {todoEditTable}
        </Dialog>
      </div>
    );
  }
}

TodoEditDialog.propTypes = {};
TodoEditDialog.defaultProps = {};

export default TodoEditDialog;
