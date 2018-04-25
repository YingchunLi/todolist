import React from "react";
import {MemoryRouter, Route} from "react-router-dom";

import renderer from "react-test-renderer";
import {shallow, mount} from "enzyme";

import {withStore} from '../test-utils';
import ConnectedTodoList, {TodoList} from "../TodoList";

describe("TodoList", () => {
    it("maps to /todos", () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={[`/todos`]}>
          <switch>
            <Route path="/todos" component={TodoList}/>
          </switch>
        </MemoryRouter>
      );

      expect(wrapper.find(TodoList).exists()).toBe(true);
      expect(wrapper.find(TodoList).props().location.pathname).toBe("/todos");
    });

    it("has a title and a table", () => {
      const wrapper = shallow(
        <TodoList dispatch={(action) => {
        }}/>
      );

      expect(wrapper.find('h2').length).toBe(1);
      expect(wrapper.find('h2').text()).toBe('This is the todo list page');
      expect(wrapper.find('table').length).toBe(1);
    });

    it("has no todos", () => {
      const component = renderer.create(
        <TodoList/>
      ).toJSON();
      expect(component).toMatchSnapshot();
    });

    it("has some todos", () => {
      const todos = [
        {
          id: 1,
          name: 'milk',
          description: 'remember the milk',
          dueDate: new Date(2018, 12, 31).toISOString(),
          status: 'Pending'
        },
      ];
      const component = renderer.create(
        <MemoryRouter initialEntries={[`/todos`]}>
          <TodoList todos={todos}/>
        </MemoryRouter>

      ).toJSON();
      expect(component).toMatchSnapshot();
    });

    it("connected component works", () => {
      const todos = [
        {
          id: 1,
          name: 'milk',
          description: 'remember the milk',
          dueDate: new Date(2018, 12, 31).toISOString(),
          status: 'Pending'
        },
      ];
      const TodoListWithStore = withStore(ConnectedTodoList);
      const component = renderer.create(
        <TodoListWithStore />
      ).toJSON();
      expect(component).toMatchSnapshot();
    });

  }
);
