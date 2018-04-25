import React from "react";
import {MemoryRouter, Route} from "react-router-dom";

import {shallow, mount} from "enzyme";
import renderer from "react-test-renderer";

import TodoEditDialog from "../TodoEditDialog";
import {withStoreAndMaterialUI} from '../test-utils';

const TodoEditDialogWithStoreAndMaterialUI = withStoreAndMaterialUI(TodoEditDialog);

describe("Todo", () => {


    it("not todo - add mode", () => {
      const component = renderer.create(
        <TodoEditDialogWithStoreAndMaterialUI mode="Add" />
      ).toJSON();
      expect(component).toMatchSnapshot();
    });

    it("has todo - edit mode", () => {
      const component = renderer.create(
        <TodoEditDialogWithStoreAndMaterialUI
          mode="Edit"
          todo={
            {
              id: 1,
              name: 'milk',
              description: 'remember the milk',
              dueDate: '2018-12-31',
              status: 'Pending'
            }
          }
          onChange={() => {}}
        />
      ).toJSON();
      expect(component).toMatchSnapshot();
    });

  }
);

