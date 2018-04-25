import React from "react";
import {MemoryRouter, Route} from "react-router-dom";

import {shallow, mount, render} from "enzyme";

import TodoList from "../TodoList";

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

    it("has a title and 2 links", () => {
      const wrapper = shallow(
        <TodoList/>
      );

      expect(wrapper.find('h2').length).toBe(1);
      expect(wrapper.find('h2').text()).toBe('This is the todo list page');
      expect(wrapper.find('Link').length).toBe(2);
    });

  }
);

