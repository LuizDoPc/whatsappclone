import { LISTA_CONVERSAS } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LISTA_CONVERSAS:
      return action.payload;
    default:
      return state;
  }
};
