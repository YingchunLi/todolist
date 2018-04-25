import React from "react";
import {MemoryRouter, Route} from "react-router-dom";

import {shallow, mount, render} from "enzyme";

import Todo from "../Todo";

describe("Todo", () => {
    it("maps to /todos", () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={[`/todos/1`]}>
          <switch>
            <Route path="/todos/:id" component={Todo}/>
          </switch>
        </MemoryRouter>
      );

      expect(wrapper.find(Todo).exists()).toBe(true);
      expect(wrapper.find(Todo).props().match.params.id).toBe('1');
    });

    it("has a title", () => {
      const wrapper = shallow(
        <Todo match={{params: {id: 1}}}/>
      );

      expect(wrapper.find('h2').length).toBe(1);
      expect(wrapper.find('h2').text()).toBe(`This is the todo page 1`);
    });

  }
);

