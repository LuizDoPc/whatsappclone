import React, { Component } from "react";
import { View, TextInput, Text, Image, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import {
  modificaMensagem,
  enviaMensagem,
  conversaUsuarioFetch
} from "../actions/AppActions";

import _ from "lodash";

const envia = require("../img/enviar_mensagem.png");

class Conversa extends Component {
  componentWillMount() {
    this.props.conversaUsuarioFetch(this.props.contatoEmail);
  }

  componentWillReceiveProps(nextProps) {
    this.props.conversaUsuarioFetch(nextProps.contatoEmail);
  }

  _enviaMensagem() {
    const { mensagem, contatoNome, contatoEmail } = this.props;
    console.log("oie");
    this.props.enviaMensagem(mensagem, contatoNome, contatoEmail);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 50,
          backgroundColor: "#EEE4DC",
          padding: 10
        }}
      >
        <View style={{ flex: 1, paddingBottom: 20 }} />
        <View style={{ flexDirection: "row", height: 60 }}>
          <TextInput
            style={{
              flex: 5,
              fontSize: 18,
              borderWidth: 0.5,
              borderColor: "#CCC",
              borderRadius: 50,
              height: 60,
              backgroundColor: "white",
              paddingHorizontal: 50
            }}
            value={this.props.mensagem}
            onChangeText={text => {
              this.props.modificaMensagem(text);
            }}
          />
          <TouchableHighlight
            underlayColor="#fff"
            onPress={this._enviaMensagem.bind(this)}
          >
            <Image source={envia} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const conversa = _.map(state.ListaConversaReducer, (val, uid) => {
    return { ...val, uid };
  });

  return {
    conversa,
    mensagem: state.AppReducer.mensagem
  };
};

export default connect(
  mapStateToProps,
  { modificaMensagem, enviaMensagem, conversaUsuarioFetch }
)(Conversa);
