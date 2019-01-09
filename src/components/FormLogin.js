import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableHighlight,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import {
  modificaEmail,
  modificaSenha,
  autenticarUsuario
} from "../actions/AutenticacaoActions";

class formLogin extends Component {
  _autenticarUsuario() {
    const { email, senha } = this.props;
    this.props.autenticarUsuario({ email, senha });
  }

  renderBtnAcessar() {
    if (this.props.loadingLogin) {
      return <ActivityIndicator size="large" />;
    }
    return (
      <Button
        title="Acessar"
        color="#115E54"
        onPress={() => this._autenticarUsuario()}
      />
    );
  }

  render() {
    return (
      <ImageBackground style={{ flex: 1 }} source={require("../img/bg.png")}>
        <View style={{ flex: 1, padding: 10 }}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 25, color: "white" }}>WhatsApp Clone</Text>
          </View>
          <View style={{ flex: 2 }}>
            <TextInput
              value={this.props.email}
              style={{
                fontSize: 20,
                height: 45,
                borderBottomColor: "white",
                borderBottomWidth: 0.5
              }}
              placeholder="E-mail"
              placeholderTextColor="#ffffff"
              onChangeText={texto => this.props.modificaEmail(texto)}
            />
            <TextInput
              value={this.props.senha}
              style={{
                fontSize: 20,
                height: 45,
                borderBottomColor: "white",
                borderBottomWidth: 0.5
              }}
              placeholder="Senha"
              placeholderTextColor="#ffffff"
              onChangeText={texto => this.props.modificaSenha(texto)}
              secureTextEntry
            />
            <TouchableHighlight onPress={() => Actions.formcadastro()}>
              <Text style={{ fontSize: 20, color: "white" }}>
                Ainda não tem cadastro? Cadastre-se
              </Text>
            </TouchableHighlight>

            <Text style={{ color: "#ff0000", fontSize: 18 }}>
              {this.props.erroLogin}
            </Text>
          </View>
          <View style={{ flex: 2 }}>{this.renderBtnAcessar()}</View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  email: state.AutenticacaoReducer.email,
  senha: state.AutenticacaoReducer.senha,
  erroLogin: state.AutenticacaoReducer.erroLogin,
  loadingLogin: state.AutenticacaoReducer.loadingLogin
});

export default connect(
  mapStateToProps,
  { modificaEmail, modificaSenha, autenticarUsuario }
)(formLogin);
