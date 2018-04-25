import React from "react";
import {MemoryRouter, Route} from "react-router-dom";

import {shallow, mount} from "enzyme";
import renderer from "react-test-renderer";

import Todo from "../Todo";
import {withStoreAndMaterialUI} from '../test-utils';

const TodoWithStoreAndMaterialUI = withStoreAndMaterialUI(Todo);

describe("Todo", () => {
    it("maps to /todos", () => {
      const wrapper = mount(
        <MemoryRouter initialEntries={[`/todos/1`]}>
          <switch>
            <Route path="/todos/:id" component={TodoWithStoreAndMaterialUI}/>
          </switch>
        </MemoryRouter>
      );

      expect(wrapper.find(Todo).exists()).toBe(true);
      expect(wrapper.find(Todo).props().match.params.id).toBe('1');
    });

    it("matches snapshot", () => {
      const component = renderer.create(
        <TodoWithStoreAndMaterialUI match={{params: {id: 1}}} />
      ).toJSON();
      expect(component).toMatchSnapshot();
    });

  }
);

