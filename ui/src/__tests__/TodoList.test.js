import React from "react";
import {MemoryRouter, Route} from "react-router-dom";

import renderer from "react-test-renderer";
import {mount} from "enzyme";

import {withStoreAndMaterialUI} from '../test-utils';
import ConnectedTodoList, {TodoList} from "../TodoList";

const TodoListWithStoreAndMaterialUI = withStoreAndMaterialUI(TodoList);

describe("TodoList", () => {
    it("maps to /todos", () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={[`/todos`]}>
          <switch>
            <Route path="/todos" component={TodoListWithStoreAndMaterialUI}/>
          </switch>
        </MemoryRouter>
      );

      expect(wrapper.find(TodoList).exists()).toBe(true);
      expect(wrapper.find(TodoList).props().location.pathname).toBe("/todos");
    });

    it("has no todos", () => {
      const component = renderer.create(
        <TodoListWithStoreAndMaterialUI />
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
          <TodoListWithStoreAndMaterialUI todos={todos}/>
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
      const TodoListWithStoreAndMaterialUI = withStoreAndMaterialUI(ConnectedTodoList);
      const component = renderer.create(
        <TodoListWithStoreAndMaterialUI />
      ).toJSON();
      expect(component).toMatchSnapshot();
    });

  }
);
