import React, {Component} from 'react';

class Todo extends Component {
  render() {
    const {match} = this.props;
    return (
      <div>
        <h2>This is the todo page {match.params.id}</h2>
      </div>
    );
  }
}

Todo.propTypes = {};
Todo.defaultProps = {};

export default Todo;
