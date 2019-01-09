import {
  MODIFICA_EMAIL,
  MODIFICA_SENHA,
  MODIFICA_NOME,
  CADASTRO_USUARIO_SUCESSO,
  CADASTRO_USUARIO_ERRO,
  LOGIN_USUARIO_SUCESSO,
  LOGIN_USUARIO_ERRO,
  LOGIN_EM_ANDAMENTO,
  CADASTRO_EM_ANDAMENTO
} from "../actions/types";

const INITIAL_STATE = {
  nome: "",
  email: "",
  senha: "",
  erroCadastro: "",
  erroLogin: "",
  loadingLogin: "",
  loadingCadastro: ""
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case MODIFICA_EMAIL:
      return { ...state, email: action.payload };
    case MODIFICA_SENHA:
      return { ...state, senha: action.payload };
    case MODIFICA_NOME:
      return { ...state, nome: action.payload };
    case CADASTRO_USUARIO_ERRO:
      return {
        ...state,
        erroCadastro: action.payload,
        loadingCadastro: false,
        email: ""
      };
    case CADASTRO_USUARIO_SUCESSO:
      return { ...state, nome: "", senha: "", loadingCadastro: false };
    case LOGIN_USUARIO_ERRO:
      return {
        ...state,
        erroLogin: action.payload,
        loadingLogin: false,
        senha: ""
      };
    case LOGIN_USUARIO_SUCESSO:
      return {
        ...state,
        loadingLogin: false,
        email: "",
        senha: ""
      };
    case LOGIN_EM_ANDAMENTO:
      return { ...state, loadingLogin: true };
    case CADASTRO_EM_ANDAMENTO:
      return { ...state, loadingCadastro: true };
    default:
      return state;
  }
};
