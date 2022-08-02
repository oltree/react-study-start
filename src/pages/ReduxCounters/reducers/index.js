import { handleActions } from "redux-actions";
import { v4 as uuid } from "uuid";

import * as actions from "../actions";

const defaultState = {
  counters: [],
  //...другие поля
};

export const countersManagerReducer = handleActions(
  {
    [actions.CREATE_COUNTER]: (state) => {
      const countersCopy = [...state.counters]; //state - this is object defaultState

      const newCounter = {
        id: uuid(),
        countValue: 0,
      };

      countersCopy.push(newCounter);

      return {
        ...state, //Это мы разворачиваем все поля defaultState
        counters: countersCopy,
      };
    },
    [actions.REMOVE_ALL_COUNTERS]: () => defaultState,
    [actions.INCREMENT_COUNTER]: (state, { payload: id }) => {
      const countersCopy = [...state.counters];

      const foundCouter = countersCopy.find((counter) => counter.id === id);

      foundCouter.countValue += 1;

      return {
        ...state,
        counters: countersCopy,
      };
    },
    [actions.DECREMENT_COUNTER]: (state, { payload: id }) => {
      const countersCopy = [...state.counters];

      const foundCouter = countersCopy.find((counter) => counter.id === id);

      if (foundCouter.countValue > 0) foundCouter.countValue -= 1;

      return {
        ...state,
        counters: countersCopy,
      };
    },
    [actions.RESET_COUNTER]: (state, { payload: id }) => {
      const countersCopy = [...state.counters];

      const foundCouter = countersCopy.find((counter) => counter.id === id);

      foundCouter.countValue = 0;

      return {
        ...state,
        counters: countersCopy,
      };
    },
    [actions.DELETE_COUNTER]: (state, { payload: id }) => {
      const countersCopy = [...state.counters];

      const counterIndexToRemove = countersCopy.findIndex(
        (counter) => counter.id === id
      );

      countersCopy.splice(counterIndexToRemove, 1);

      return {
        ...state,
        counters: countersCopy,
      };
    },
  },
  defaultState
);