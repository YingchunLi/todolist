import React from "react";
import { MemoryRouter, Route } from "react-router-dom";

import {  mount } from "enzyme";

import App from "../App";

it("redirects / to /todos", () => {
  const Todos = () => <div>This is todo list page</div>;
  const wrapper = mount(
    <MemoryRouter initialEntries={[`/`]}>
      <switch>
        <Route exact path="/" component={App} />
        <Route path="/todos" component={Todos} />
      </switch>
    </MemoryRouter>
  );

  expect(wrapper.find(App).exists()).toBe(false);
  expect(wrapper.find(Todos).props().location.pathname).toBe("/todos");
});
