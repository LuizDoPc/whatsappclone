import React, { Component } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { connect } from "react-redux";
import {
  modificaAdicionaContatoEmail,
  adicionaContato
} from "../actions/AppActions";

class AdicionarContato extends Component {
  renderAdicionarContato() {
    if (!this.props.cadastro_resultado_inclusao) {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TextInput
              onChangeText={texto => {
                this.props.modificaAdicionaContatoEmail(texto);
              }}
              placeholder="E-mail"
              style={{ fontSize: 20, height: 45 }}
              value={this.props.adiciona_contato_email}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Adicionar"
              color="#115E54"
              onPress={() => {
                this.props.adicionaContato(this.props.adiciona_contato_email);
              }}
            />
            <Text style={{ color: "#ff0000", fontSize: 20 }}>
              {this.props.cadastro_resultado_txt_erro}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20 }}>Contato adicionado com sucesso!</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        {this.renderAdicionarContato()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  adiciona_contato_email: state.AppReducer.adiciona_contato_email,
  cadastro_resultado_txt_erro: state.AppReducer.cadastro_resultado_txt_erro,
  cadastro_resultado_inclusao: state.AppReducer.cadastro_resultado_inclusao
});

export default connect(
  mapStateToProps,
  { modificaAdicionaContatoEmail, adicionaContato }
)(AdicionarContato);
