import React, { Component } from "react";
import { View, Text, ListView, TouchableHighlight } from "react-native";
import { connect } from "react-redux";
import { conversasFetch } from "../actions/AppActions";
import _ from "lodash";
import { Actions } from "react-native-router-flux";

class Conversas extends Component {
  componentWillMount() {
    this.criaFonteDeDados(this.props.conversas);
  }

  componentWillReceiveProps(nextProps) {
    this.criaFonteDeDados(nextProps.conversas);
  }

  componentDidMount() {
    this.props.conversasFetch();
  }

  criaFonteDeDados(conversas) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });

    this.fonteDeDados = ds.cloneWithRows(conversas);
  }
  
  renderRow(data) {
    return (
      <TouchableHighlight
        onPress={() => {
          Actions.conversa({
            contatoNome: data.nome,
            contatoEmail: data.email,
            title: data.nome
          });
        }}
        underlayColor="white"
      >
        <View
          style={{
            flex: 1,
            padding: 20,
            borderBottomWidth: 1,
            borderColor: "#CCC"
          }}
        >
          <Text style={{ fontSize: 25 }}>{data.nome}</Text>
          {data.tipo == "e" ? (
            <Text style={{ fontSize: 18 }}>Você: {data.ultimaMensagem}</Text>
          ) : (
            <Text style={{ fontSize: 18 }}>
              {data.nome}: {data.ultimaMensagem}
            </Text>
          )}
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.fonteDeDados}
        renderRow={data => {
          return this.renderRow(data);
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  const conversas = _.map(state.ListaConversasReducer, (val, uid) => {
    return { ...val, uid };
  });
  return {
    conversas
  };
};

export default connect(
  mapStateToProps,
  { conversasFetch }
)(Conversas);
