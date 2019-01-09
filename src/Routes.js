import React from "react";
import { Router, Scene } from "react-native-router-flux";

import FormLogin from "./components/FormLogin";
import FormCadastro from "./components/FormCadastro";
import BoasVindas from "./components/BoasVindas";
import Principal from "./components/Principal";
import AdicionarContato from "./components/AdicionarContato";
import Conversa from "./components/Conversa";

export default props => (
  <Router
    navigationBarStyle={{ backgroundColor: "#115E54" }}
    titleStyle={{ color: "#fff" }}
  >
    <Scene
      key="formlogin"
      component={FormLogin}
      title="Login"
      hideNavBar={true}
    />
    <Scene
      key="formcadastro"
      component={FormCadastro}
      title="Cadastro"
      hideNavBar={false}
    />
    <Scene
      key="boasvindas"
      component={BoasVindas}
      title="Boas Vindas"
      hideNavBar={true}
    />
    <Scene
      key="principal"
      component={Principal}
      title="Principal"
      hideNavBar={true}
    />
    <Scene
      key="adicionarcontato"
      component={AdicionarContato}
      title="Adicionar Contato"
      hideNavBar={false}
    />
    <Scene
      key="conversa"
      component={Conversa}
      title="Conversa"
      hideNavBar={false}
    />
  </Router>
);
