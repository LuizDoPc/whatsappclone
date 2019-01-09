import { combineReducers } from "redux";
import AutenticacaoReducer from "./AutenticacaoReducer";
import AppReducer from "./AppReducer";
import ListaContatosReducer from "./ListaContatosReducer";
import ListaConversaReducer from "./ListaConversaResources";

export default combineReducers({
  AutenticacaoReducer,
  AppReducer,
  ListaContatosReducer,
  ListaConversaReducer
});
