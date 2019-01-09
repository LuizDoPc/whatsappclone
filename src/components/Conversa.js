import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  ListView
} from "react-native";
import {
  modificaMensagem,
  enviaMensagem,
  conversaUsuarioFetch
} from "../actions/AppActions";

class Conversa extends Component {
  componentWillMount() {
    this.props.conversaUsuarioFetch(this.props.contatoEmail);
    this.criaFonteDeDados(this.props.conversa);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.contatoEmail != nextProps.contatoEmail)
      this.props.conversaUsuarioFetch(nextProps.contatoEmail);
    this.criaFonteDeDados(nextProps.conversa);
  }

  criaFonteDeDados(conversa) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(conversa);
  }

  _enviaMensagem() {
    const { mensagem, contatoNome, contatoEmail } = this.props;

    this.props.enviaMensagem(mensagem, contatoNome, contatoEmail);
  }

  renderRow(texto) {
    if (texto.tipo == "e") {
      return (
        <View
          style={{
            alignItems: "flex-end",
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 40
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "black",
              padding: 10,
              backgroundColor: "#DBF5B4",
              elevation: 1
            }}
          >
            {texto.mensagem}
          </Text>
        </View>
      );
    }
    return (
      <View
        style={{
          alignItems: "flex-start",
          marginTop: 5,
          marginBottom: 5,
          marginRight: 40
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "black",
            padding: 10,
            backgroundColor: "#F7F7F7",
            elevation: 1
          }}
        >
          {texto.mensagem}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 50,
          backgroundColor: "#eee4dc",
          padding: 10
        }}
      >
        <View style={{ flex: 1, paddingBottom: 20 }}>
          <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
        </View>

        <View style={{ flexDirection: "row", height: 60 }}>
          <TextInput
            value={this.props.mensagem}
            onChangeText={texto => this.props.modificaMensagem(texto)}
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
          />

          <TouchableHighlight
            onPress={this._enviaMensagem.bind(this)}
            underlayColor="#fff"
          >
            <Image source={require("../img/enviar_mensagem.png")} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

mapStateToProps = state => {
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
